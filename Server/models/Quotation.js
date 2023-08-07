const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        userid: {
            type:Schema.Types.ObjectId,
            ref:"users"
        },
        qdate: {
            type: Date,
            required: true
        },
        dealerid: {
            type:Schema.Types.ObjectId,
            ref:"dealers"
        },
        saletype: {
            type: String,
            required: true
        },
        subtotal:{
            type:Number,
            required:true
        },
        gstamount:{
            type:Number,
            required:true
        },
        totalamount:{
            type:Number,
            required:true
        },
        products:[{
            companyid: {
                type:Schema.Types.ObjectId,
                ref:"companies"
            },
            pcid:{
                type:Schema.Types.ObjectId,
                ref:"productcatagories"
            },
            productid:{
                type:Schema.Types.ObjectId,
                ref:"products"
            }
        }]
    },
    { timestamps: true }
);

const Quotation = mongoose.model("quotations", schema);

module.exports = Quotation;