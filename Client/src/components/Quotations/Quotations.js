import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDealers } from '../../state/products/dealerslice';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
function Quotations() {

    const dispatch = useDispatch();

    function getHeader() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        return headers;
    }

    function getBaseUrl() {
        return "http://localhost:8081/";
    }
    const { id } = useParams();
    const navigate = useNavigate();

    let products = useSelector((state) => state.products);
    let companies = useSelector((state) => state.companies);
    let productcategories = useSelector((state) => state.productcategories);
    let dealers = useSelector((state) => state.dealers);

    let product = {
        pcid: "",
        companyid: "",
        productid: "",
        quantity: 0,
        rate: 0,
        subtotal: 0,
        gstpercent: 0,
        gstamount: 0,
        total: 0
    };

    let [quotation, setQuotation] = useState({
        dealerid: "",
        dealername: "",
        saletype: "Cash",
        qdate: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().split("T")[0],
        subtotal: 0,
        gstamount: 0,
        total: 0
    });

    let [quotationproducts, setQuotationProducts] = useState([product]);

    function addRow(e) {
        e.preventDefault();
        setQuotationProducts(oldArray => [...oldArray, product]);
    }

    if (dealers.length === 0) {
        axios.get(getBaseUrl() + 'dealers', { headers: getHeader() }).then((response) => {
            dispatch((setDealers(response.data.data)));
        });
    }

    function valueChanged(e) {
        e.preventDefault();
        setQuotation({ ...quotation, [e.target.id]: e.target.value });
    }


    function updateValue(e, i) {
        e.preventDefault();
        let subotalTemp = 0;
        let gstamountTemp = 0;
        let totalTemp = 0;
        setQuotationProducts(quotationproducts => quotationproducts.map((p, index) => {
            if (i === index) {
                p[e.target.id] = e.target.value;
                if (p["productid"] === "") {
                    p["rate"] = 0;
                    p["quantity"] = 0;
                    p["gstpercent"] = 0;
                }
                if (e.target.id === "productid") {
                    products.map((prd, j) => {
                        if (prd._id === e.target.value) {
                            p["rate"] = prd[quotation.saletype === "Cash" ? "cashsalerate" : "creditsalerate"];
                            p["gstpercent"] = prd["gstpercentage"];
                        }
                    });
                }
            }
            p["subtotal"] = p["quantity"] * p["rate"];
            p["gstamount"] = p["subtotal"] * (p["gstpercent"] / 100);
            p["total"] = p["subtotal"] + p["gstamount"];
            subotalTemp += p["subtotal"];
            gstamountTemp += p["gstamount"];
            totalTemp += p["total"];
            setQuotation({ ...quotation, "subtotal": subotalTemp, "gstamount": gstamountTemp, "total": totalTemp });
            return p;
        }));

    };

    function submitValues(e, i) {
        e.preventDefault();


        let sendData = {
            userid: localStorage.getItem('userid'),
            qdate: quotation.qdate,
            dealerid: quotation.dealerid,
            saletype: quotation.saletype,
            subtotal: quotation.subtotal,
            gstamount: quotation.gstamount,
            totalamount: quotation.total,
            products: quotationproducts
        }

        console.log(sendData);

        if (id === undefined) {
            axios.post(getBaseUrl() + 'quotations', sendData, { headers: getHeader() }).then((response) => {
                if (response) {

                    console.log("Done Updated");
                    navigate('/quotation/quotation');

                }
            });
        }
        else {
            axios.put(getBaseUrl() + 'quotations/' + id, sendData, { headers: getHeader() }).then((response) => {
                if (response) {

                    navigate('/quotation/quotation');

                }
            });
        }
    }
    function handleDelete(i, e) {
        e.preventDefault();
        if (quotationproducts.length > 1) {

            let afterDelete = quotationproducts.filter((item, index) => { return i !== index ? true : false });
            setQuotationProducts(afterDelete);
        }
    }
    function getQuoteDataToUpdate() {
        console.log(id);
        if (id !== undefined) {
            axios.get(getBaseUrl() + 'quotations/' + id, { headers: getHeader() }).then((response) => {
                setQuotation({
                    ...quotation,
                    dealerid: response.data.data.dealerid,
                    saletype: response.data.data.saledate,
                    qdate: response.data.data.qdate,
                    subtotal: response.data.data.subtotal,
                    gstamount: response.data.data.gstamount,
                    total: response.data.data.totalamount
                });

                setQuotationProducts(response.data.data.products);
            });
        }
    }
    useEffect(() => {
        document.title = 'Quotations';
        getQuoteDataToUpdate();
    }, [])

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="app-page-title  ">
                            <div className="page-title-wrapper ">

                                <div className="page-title-heading">
                                    <div> Quotation </div>
                                </div>
                                <div className="row ml-5">
                                    {/* 
                                    <div className="page-title-actions">

                                        <div className="d-inline-block ">
                                           
                                        </div>

                                    </div> */}
                                    <div className="col-lg-4">
                                        <label className=''> <b> Date</b> </label><br />
                                        <input type="date" id="qdate" className="form-control" value={quotation.qdate} onChange={(e) => { valueChanged(e) }} />
                                    </div>

                                    <div className="col-lg-4">
                                        <label className=""><b>Dealer</b></label>
                                        <select name="dealerid" id="dealerid" className='form-control' value={quotation.dealerid} onChange={(e) => { valueChanged(e) }} >
                                            <option value="">Select Dealer</option>
                                            {
                                                dealers.map((dealer, i) => {
                                                    return <option key={i} value={dealer._id}>{dealer.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-lg-3">
                                        <label className=""><b>Quatation Type</b></label>
                                        <select name="saletype" id="saletype" className='form-control' value={quotation.saletype} onChange={(e) => { valueChanged(e) }} >
                                            <option value="Cash">Cash</option>
                                            <option value="Credit">Credit</option>
                                        </select>
                                    </div>


                                    <div className="col-lg-1 p-1 ">
                                        <label className=''></label><br />
                                        <button className=" bg-secondary text-light border form-control" data-toggle="tooltip" data-placement="bottom" title="Add Row" onClick={(e) => { addRow(e) }}  >
                                            +
                                        </button>

                                    </div>

                                </div>



                            </div>
                            <div className='text-right'>
                                <Link to='/quotation/quotation'><button className=" bg-secondary text-light p-2 border" style={{ cursor: 'pointer' }}>
                                    Show Quotations
                                </button></Link>
                            </div>
                        </div>

                    </div>

                </div>


            </div>

            <div className="main-card mb-2 card ">
                <div className="card-body">
                    <div className=''>
                        <div className="row">
                            <div className="col-lg-12">
                                <table style={{ width: "100%" }} id="table"
                                    className="table table-hover text-center table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Catagory</th>
                                            <th>Company</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>SubTotal</th>
                                            <th>GST (%)</th>
                                            <th>GST (Amt.)</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            quotationproducts.length && quotationproducts.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>

                                                        <td>
                                                            <select id="pcid" value={item.pcid} className='form-control' onChange={(e) => { updateValue(e, i) }} >
                                                                <option value="">Product Catagory</option>
                                                                {
                                                                    productcategories.map((productCatagories, i) => {
                                                                        return <option key={"pc" + i} value={productCatagories._id}>{productCatagories.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select id="companyid" value={item.companyid} className='form-control' onChange={(e) => { updateValue(e, i) }} >
                                                                <option value=""> Company</option>
                                                                {
                                                                    companies.map((company, i) => {
                                                                        return <option key={"company" + i} value={company._id}>{company.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select id="productid" value={item.productid} className='form-control' onChange={(e) => { updateValue(e, i) }} >
                                                                <option value="">Product</option>
                                                                {
                                                                    products.map((p, i) => {
                                                                        if (p.pcid._id === item.pcid && p.companyid._id === item.companyid)
                                                                            return <option key={i} value={p._id}>{p.name}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input type="text" id="quantity" value={item.quantity} min="0" className="form-control" onInput={(e) => { updateValue(e, i) }} />
                                                        </td>
                                                        <td>
                                                            <input type="text" id="rate" value={item.rate} min="0" className="form-control" onInput={(e) => { updateValue(e, i) }} />
                                                        </td>
                                                        <td>
                                                            <input type="text" id="subtotal" value={item.subtotal.toFixed(2)} min="0" className="form-control" readOnly />
                                                        </td>
                                                        <td>
                                                            <input type="text" id="gstpercent" value={item.gstpercent.toFixed(2)} min="0" className="form-control" readOnly />
                                                        </td>
                                                        <td>
                                                            <input type="text" id="gstamount" value={item.gstamount.toFixed(2)} min="0" className="form-control" readOnly />
                                                        </td>
                                                        <td>
                                                            <input type="text" id="total" value={item.total.toFixed(2)} min="0" className="form-control" readOnly />
                                                        </td>
                                                        <td> <button className="mb-2 mr-2 btn-icon btn-icon-only btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="delete" onClick={(e) => { handleDelete(i, e) }} >
                                                            <i className="pe-7s-trash btn-icon-wrapper"> </i></button></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="col-lg-12 p-1 bg-light">
                                    <div className='m-3'>
                                        <label><b> Subtotal:</b> {quotation.subtotal.toFixed(2)}</label>
                                        <label></label>
                                        <br />
                                        <label><b> GST Amount:</b> {quotation.gstamount.toFixed(2)}</label>
                                        <label></label>
                                        <br />
                                        <label><b> Total:</b> {quotation.total.toFixed(2)}</label>
                                        <label></label>
                                        <br />
                                        <button className='btn btn-primary ' onClick={(e) => { submitValues(e) }}> Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Quotations;