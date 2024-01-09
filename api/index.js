var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://aprilrjwilliams:mongodb123@cluster0.mbx9jrs.mongodb.net/?retryWrites=true&w=majority";
var DATABASENAME="pinhighdb";
var database;


app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client)=>{
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
