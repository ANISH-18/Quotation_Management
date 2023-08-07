const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const City = require("../models/City");
const Companies = require("../models/Company");
const Productcatagories = require("../models/Productcatagory");
const Dealer = require("../models/Dealer");
const Quotation = require("../models/Quotation");



router.get("/getCounts", async (req, res) => {
    // try {
        let companyCount = await Companies.find().count();
        let productQuantity = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    productStock: { $sum: "$stockquantity" }
                }
            }
        ]);
        let cityCount = await City.distinct("name").count();
        let productsCount = await Product.find().count();
        let userCount = await User.find().count();
        let dealerCount = await Dealer.find().count();
        let quotationCount = await Quotation.find().count();
        let productCategoryCount = await Productcatagories.find().count();
        let data = {
            company: companyCount,
            product: productQuantity.length == 0 ? 0 : productQuantity[0].productStock,
            city: cityCount,
            products: productsCount,
            user: userCount,
            dealer: dealerCount,
            quotations: quotationCount,
            productCategory: productCategoryCount
        }
        res.send({ status: "success", count: data });
    // }
    // catch {
    //     let data = {
    //         company: 0,
    //         product: 0,
    //         city: 0,
    //         products: 0,
    //         user: 0,
    //         dealer: 0,
    //         quotations: 0,
    //         productCategory: 0
    //     }
       
    //     res.send({ status: "success", count: data });
    // }

});




module.exports = router;
