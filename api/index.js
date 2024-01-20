const express = require("express");
const Mongoclient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://aprilrjwilliams:mongodb1234@cluster0.mbx9jrs.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME="pinhighdb";
var database;


app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client)=>{
        if(error){
            throw error;
        }
        database=client.db(DATABASENAME);
        console.log("Mongo DB Connection Successful");
    })
});


app.get('/api/pinhighdb/getBookings',(request,response)=>{
    database.collection("pinhighcollection").find({}).toArray((error, result)=>{
        response.send(result);
    })
})

app.post('/api/pinhighdb/addBooking',multer().none(),(request,response)=>{
    database.collection("pinhighcollection").count({},function(error,numOfDocs){
        database.collection("pinhighcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newBooking
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/pinhighdb/deleteBooking',(request,response)=>{
    database.collection("pinhighcollection").deleteOne({
        id: request.query.id
    });
    response.json("Deleted Successfully");
})

app.get('/api/pinhighdb/getUsers',(request,response)=>{
    database.collection("users").find({}).toArray((error, result)=>{
        response.send(result);
    })
})

app.post('/api/pinhighdb/addUserg',multer().none(),(request,response)=>{
    database.collection("users").count({},function(error,numOfUsers){
        database.collection("users").insertOne({
            id:(numOfUsers+1).toString(),
            firstName:request.body.newUser.firstName,
            lastName:request.body.newUser.lastName,
            username:request.body.newUser.username,
            phone:request.body.newUser.phone
            
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/pinhighdb/deleteUser',(request,response)=>{
    database.collection("users").deleteOne({
        id: request.query.id
    });
    response.json("Deleted Successfully");
})
