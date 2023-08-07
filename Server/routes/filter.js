const express = require("express");
const Product = require("../models/Product");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        let category = req.query.category || "";
        let company = req.query.company || "";
        let search = req.query.search || "";
        let query = {};
        if (category !== '') {
            query.pcid = category
        }
        if (company !== "") {
            query.companyid = company;
        }
        if (search !== "") {
            query.name = search;
        }
        console.log("=======>>>>>>", query);

        let filtered = await Product.find(query);

        if (filtered && filtered.length) {
            res.send({ status: "Success", data: filtered });
        } else {
            res.status(404).send({ status: "No Data Found" });
        }
    } catch (err) {
        res.send({ status: "Failed", message: err.message })
    }
});


module.exports = router;
