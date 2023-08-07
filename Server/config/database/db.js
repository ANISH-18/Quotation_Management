var mongodb = require("mongodb");
var mongoose = require("mongoose");

connectDb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DATABASE);
    const db = mongoose.connection;
    db.on("error", error => console.log(error));
    db.on("open", () => console.log("Connection Established...."));
}

module.exports = connectDb();