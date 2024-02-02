// const express = require("express");
// const bodyParser = require('body-parser');
// const cors = require("cors");

// const app2 = express();

// app2.use(cors());

// app2.use(bodyParser.json());
// app2.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });


// app2.use(express.json());

// app2.use("/api", require("./routes/stripe.js"));

// app2.listen(4000, () => {
//     console.log("Started server on 4000");   
// });