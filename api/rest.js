const express = require('express');
const bodyParser = require('body-parser');
// const DiaryEntryModel = require('./entry-schema');
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
            expiresIn: 3600
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
})

module.exports = app;

