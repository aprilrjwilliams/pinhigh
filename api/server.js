const http = require('http');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const express = require('./rest.js');



const CONNECT_STRING =
  "mongodb+srv://aprilrjwilliams:mongodb1234@cluster0.mbx9jrs.mongodb.net/pinhighdb?retryWrites=true&w=majority";

const app = express();
app.use(cors());

// mongoose
//   .connect(CONNECT_STRING)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("Error connecting to MongoDB ", error);
//   });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});


const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(CONNECT_STRING);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB ", error);
        throw error;
    }
}

// routes
app.use("", require("./routes/timeslot.js"))
app.use("", require("./routes/user.js"))
app.use("", require("./routes/auth.js"))
app.use("/api", require("./routes/stripe.js"));

let port = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.listen(port, ()=>{
    connectMongoDB();
    console.log('connected to backend')
})


// const server = http.createServer(express)

// server.listen(3000);