const express = require("express");
const Quotation = require("../models/Quotation");
const app = express();

app.post("/", (req, res) => {
    let body = req.body;
    let quotation = new Quotation(
        {
            userid: body.userid,
            qdate: body.qdate,
            dealerid:body.dealerid,
            saletype:body.saletype,
            subtotal:body.subtotal,
            gstamount:body.gstamount,
            totalamount:body.totalamount,
            products:body.products
        }
    );
    quotation.save().then(result => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});


app.get("/", (req, res) => {
    Quotation.find().populate({ path:"userid", select: ["name"] }).populate({ path:"dealerid", select: ["name"] }).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});


app.get("/:id", (req, res) => {
    Quotation.findById(req.params.id).populate({ path:"dealerid", select: ["name"] }).populate({ path:"userid", select: ["name"] })
    .populate({ path:"products.companyid", select: ["name"] }).populate({ path:"products.pcid", select: ["name"] }).populate({ path:"products.productid", select: ["name"] }).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});


app.put("/:id", (req, res) => {
    let body = req.body;
    Quotation.findByIdAndUpdate(req.params.id,body).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
});


app.delete("/:id",(req,res)=>{
    Quotation.findByIdAndDelete(req.params.id).then((result) => {
        res.end(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.end(JSON.stringify({ status: "failed", data: err }));
    });
})

module.exports = app;