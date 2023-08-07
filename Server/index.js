// Imports
const express = require("express");
const bodyparser = require('body-parser');
let jwt = require("jsonwebtoken");

const jsonparser = bodyparser.json();
const env = require('./config/environment/environment');
require('dotenv').config({ path: "./config/environment/.env" });
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./config/database/db");

// Middleware
const app = express();
app.use(express.json());

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

// Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
        return res.status(200).json({});
    }

    //Token validation
    // if(!req.headers.authorization){
    //     let data = {
    //         status: "exit",
    //         message:"autherization error"
    //     };
    //     res.end(JSON.stringify(data));
    // }
    // else if(req.path.includes("/gettoken"))
    // {
    //     next();
    // }
    // else{
    //     try{
    //         const authHeader = req.headers.authorization;
    //         const token =  authHeader.split(' ')[1];
    //         const decoded = jwt.verify(token, 'SECRETKEY');

    //         next();
    //         //Check if decoded value is right or wrong
    //     }
    //     catch(ex){
    //         let data = {
    //             status: "exit",
    //             message:"autherization error-decode"
    //         };
    //         res.end(JSON.stringify(data));
    //     }
    // }
    next();
});

// root api
app.get("/", (req, res) => {             
    res.send("Hello you are there");
});

app.post("/gettoken", (req, res)=>{
    let body = req.body;
    let token = jwt.sign({
        token:body.token
    }, 'SECRETKEY', { expiresIn: "365d" });
    let data = {
        status: "success",
        token: token
    };
    res.end(JSON.stringify(data));
});

// Database connection
connectToDatabase;

//  Routes
app.use("/users",require("./routes/users"));
app.use("/dealers",require("./routes/dealers"));
app.use("/products",require("./routes/products"));
app.use("/quotations",require("./routes/quotations"));
app.use("/productcatagories",require("./routes/productcatagories"));
app.use("/companies",require("./routes/companies"));
app.use("/cities",require("./routes/cities"));
app.use("/authentication",require("./routes/authentication"));
app.use("/filter",require("./routes/filter"));
app.use("/counts",require("./routes/counts"));



// Server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT + "/");
});