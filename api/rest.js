const express = require('express');
const bodyParser = require('body-parser');
const TimeslotModel = require('./timeslot-schema');
const mongoose = require('mongoose');
const UserModel = require('./user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const CONNECT_STRING = 'mongodb+srv://aprilrjwilliams:mongodb1234@cluster0.mbx9jrs.mongodb.net/pinhighdb?retryWrites=true&w=majority'

const app = express();
app.use(cors());

mongoose.connect(CONNECT_STRING)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB ', error);
})

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})


app.delete('/remove-timeslot/:id', (req, res) => {
    TimeslotModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Timeslot Deleted'
        })
    })
})

app.put('/update-timeslot/:id', (req, res) => {
    const updatedTimeslot = new TimeslotModel({_id: req.body.id, date: req.body.date, startTime: req.body.startTime, 
       user_id: req.body.user_id, bay: req.body.bay})
    TimeslotModel.updateOne({_id: req.body.id}, updatedTimeslot)
        .then(() => {
            res.status(200).json({
                message: 'Update completed'
            })    
        })
})

app.post('/add-timeslot', (req,res) => {
    const timeslot = new TimeslotModel({date: req.body.date, startTime: req.body.startTime, bay: req.body.bay, user_id: req.body.user_id});
    console.log('in post ', timeslot)
    timeslot.save()
        .then(() => {
            res.status(200).json({
                message: 'Post submitted'
            })
        })
})

// app.post('/add-timeslot', (req, res, next) => {
   
//     try{
//         const token = req.headers.authorization;
//         jwt.verify(token, "secret_string")
//         next();
//     }
//     catch(err){
//         res.status(401).json({
//             message:"Error with Authentication token"
//         })
//     }
    
// }, (req,res) => {
//     const timeslot = new TimeslotModel({date: req.body.date, startTime: req.body.startTime});
//     timeslot.save()
//         .then(() => {
//             res.status(200).json({
//                 message: 'Post submitted'
//             })
//         })
// })

app.get('/timeslots',(req, res, next) => {
    TimeslotModel.find({date: req.query.date, bay: req.query.bay})
    .then((data) => {
        res.json({'timeslots': data});
    })
    .catch(() => {
        console.log('Error fetching timeslots')
    })
})



app.post('/sign-up', (req,res) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const userModel = new UserModel({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
            })

            userModel.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
})

app.post('/login', (req,res) => {

    let userFound;

    UserModel.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                })
            }
            userFound = user
            console.log('userFound ', userFound)
            return bcrypt.compare(req.body.password, user.password)
        })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }

        const token = jwt.sign({email: userFound.email, userId: userFound._id}, "secret_string", {expiresIn:"1h"})
        return res.status(200).json({
            token: token,
            expiresIn: 3600,
            user_id: userFound._id

        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
})

module.exports = app;

