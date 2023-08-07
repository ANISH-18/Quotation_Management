import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import PrintProvider, { Print, NoPrint } from "react-easy-print";

export default function PrintQuotation() {

    const { id } = useParams();

    let [printData, setprintData] = useState({
        id:"",
        dealerid: {
            name: "",
            id: ""
        },
        userid: {
            name: "",
            id: ""
        },
        qdate: "",
        products: [],
        totalamount: "",
        subtotal: "",
        gstamount: ""
    });

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
    function formatDate(date) {
        let d = new Date(date);
        return d.toLocaleDateString('en-US')

    }
    function setDate(date) {
        console.log();
        return new Date(new Date(date).getTime() - (new Date(date).getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    }
    async function getDataToprint() {
        await axios.get(getBaseUrl() + 'quotations/' + id, { headers: getHeader() }).then((response) => {
            setprintData({
                ...printData,
                id:response.data.data._id,
                dealerid: { name: response.data.data.dealerid.name },
                userid: { name: response.data.data.userid.name },
                qdate: response.data.data.qdate,
                products: response.data.data.products,
                totalamount: response.data.data.totalamount,
                subtotal: response.data.data.subtotal,
                gstamount: response.data.data.gstamount
            });
        });
    }
    function Print(e) {
        e.preventDefault();
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    useEffect(() => {
        document.title = 'Print Quotation';
        getDataToprint();
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="app-page-title ">
                        <div className="page-title-wrapper ">
                            <div className="page-title-heading">

                                <div> Print Quotation  </div>

                            </div>
                            <div className="page-title-actions">
                                <button className="mb-2 mr-2 btn-icon btn-pill btn btn-primary bg-warning text-white" onClick={(e) => { Print(e) }} style={{ cursor: 'pointer' }}>
                                    <i className="pe-7s-paint icon-gradient bg-arielle-smile"> </i> Print
                                </button>

                                <div className="d-inline-block ">
                                    <Link to='/quotation/quotations'><button className=" bg-secondary text-light p-2 border" style={{ cursor: 'pointer' }}>
                                        Insert Quotation
                                    </button></Link>
                                </div>


                                {/* <button onClick={() => window.print()}>
                                        Save with react-easy-print
                                    </button> */}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="main-card mb-3 card" id='printablediv'>
                <div className="card-body">
                    <div className='container'>
                        {/* <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <hr />
                                        <form >
                                            <label><b> Firm : Pragati Hardware </b></label><br />
                                            <label><b> Name: {printData.dealerid.name}</b></label><br />
                                            <label><b> Mobile :</b></label><br />
                                            <label><b> Address:</b></label><br />
                                        </form>
                                    </div>

                                    <div className='text-center text-danger col-lg-4'>
                                        <h1> Pragati Hardware</h1>
                                        <h3>Quotation</h3>
                                        <h6>A/p.Rajarampur,4th Lane</h6>
                                        <h6>Kolhapur,413232</h6>
                                    </div>

                                    <div className="col-lg-4"><hr />
                                        <label> <b> Quotation Date:{printData.qdate}</b><br />  </label><br />
                                        <label> <b> Quotation No.:  </b></label><br />
                                        <input type="text" />
                                    </div>
                                </div>
                                <hr />

                            </div> */}
                        {/* </div> */}
                        <div className="col-lg-12">
                            <div className="row">
                                <table style={{ width: "100%" }} id="example"
                                    className="table table-hover  table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan='4'>
                                                <label><b> Firm : Pragati Hardware </b></label><br />
                                                <label><b> Name: {printData.dealerid.name}</b></label><br />
                                                <label><b> Mobile :</b></label><br />
                                                <label><b> Address:</b></label><br />
                                            </th>
                                            <th colSpan='2'>
                                                <h1> Pragati Hardware</h1>
                                                <h3>Quotation</h3>
                                                <h6>A/p.Rajarampur,4th Lane</h6>
                                                <h6>Kolhapur,413232</h6>
                                            </th>
                                            <th colSpan='4'>
                                                <label> <b> Quotation Date:&nbsp;{formatDate(printData.qdate)}</b><br />  </label><br />
                                                <label> <b> Quotation No. :  </b></label> &nbsp;
                                               <label> <b>{printData.id}</b></label>
                                            </th>
                                        </tr>



                                        <tr>
                                            <th>No.</th>
                                            <th>Company</th>
                                            <th>Product</th>
                                            <th>Product Catagory</th>
                                            <th>Quantity</th>
                                            <th>Rate</th>
                                            <th>Gst (%)</th>
                                            <th>GST Amount</th>
                                            <th>Sub Total</th>
                                            <th>Total</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {printData.products && printData.products.map((data, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td key={data._id}>{i + 1}</td>
                                                    <td> {data.companyid.name}</td>
                                                    <td> {data.productid.name}</td>
                                                    <td> {data.pcid.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.rate}</td>
                                                    <td> {data.gstpercent}</td>
                                                    <td>{data.gstamount} </td>
                                                    <td>{data.subtotal}</td>
                                                    <td>{data.total}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                        <tr>
                                            <th colSpan='5'>
                                                {/* <label>Loading Charges(Yes):</label>
                                                <br />

                                                <label>Cutting Charges :</label>
                                                <br />

                                                <label>Freight Charges(To Pay):</label>
                                                <br />

                                                <label>Other Charges:</label> */}
                                                <br />

                                                <label>GST(18%):</label>
                                                <br />

                                                <label>Round Off:</label>
                                                <br />
                                                <hr />
                                                <label> <b> Total:</b></label>
                                                <br />
                                            </th>

                                            <th colSpan='5'>
                                                {/* <label> <b>0.00 ₹</b></label>
                                                <br />
                                                <label><b>0.00 ₹</b></label>
                                                <br />
                                                <label><b>0.00 ₹</b></label>
                                                <br />
                                                <label><b>0.00 ₹</b></label> */}
                                                <br />
                                                <label><b>{printData.gstamount} ₹</b></label>
                                                <br />
                                                <label><b>{printData.subtotal} ₹</b></label>
                                                <br />
                                                <hr />
                                                <label><b> {printData.totalamount} ₹</b> </label>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan='5'>
                                                <label>Account :</label>
                                                <label> <b> Pragati Hardware llc</b></label><br />
                                                <label>Acc No. :</label>
                                                <label> <b> 1234567890</b></label><br />
                                                <label>IFSC :</label>
                                                <label> <b> abh23445fvhh</b></label><br />
                                                <label>Bank :</label>
                                                <label > <b> Bank Of India</b></label><br />
                                                <label>Branch :</label>
                                                <label> <b> Kolhapur</b></label>
                                            </th>

                                            <th colSpan='5'>
                                                <label ><b>Tearms And Conditions:</b></label>
                                                <p>GST @ 18% applicable extra on all above rates. <br />
                                                    All Above Rates Are Ex.Our Shiroli Godown Delivery/For Full Load Quantity. <br />
                                                    Site Delivery Negotiable. <br />
                                                    Rates Are Valid For Same Day Only subject to marcket fluctuation.
                                                </p>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th colSpan='10' >
                                                <label ><b>For Pragati Hardware</b></label>

                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">

                                {/* <div className="col-lg-6">
                                    <form >
                                        <label>Account :</label>
                                        <label> <b> hvcsd jhdsjh</b></label><br />
                                        <label>Acc No. :</label>
                                        <label> <b> 1234567890</b></label><br />
                                        <label>IFSC :</label>
                                        <label> <b> abh23445fvhh</b></label><br />
                                        <label>Bank :</label>
                                        <label > <b> Bank Of India</b></label><br />
                                        <label>Branch :</label>
                                        <label> <b> Kolhapur</b></label>
                                    </form>

                                    <label ><b>Tearms And Conditions:</b></label>
                                    <p>GST @ 18% applicable extra on all above rates. <br />
                                        All Above Rates Are Ex.Our Shiroli Godown Delivery/For Full Load Quantity. <br />
                                        Site Delivery Negotiable. <br />
                                        Rates Are Valid For Same Day Only subject to marcket fluctuation.
                                    </p>
                                </div> */}

                                {/* <div className="col-lg-4 border border-right-0">

                                    <label>Loading Charges(Yes):</label>
                                    <br />

                                    <label>Cutting Charges :</label>
                                    <br />

                                    <label>Freight Charges(To Pay):</label>
                                    <br />

                                    <label>Other Charges:</label>
                                    <br />

                                    <label>GST(18%):</label>
                                    <br />

                                    <label>Round Off:</label>
                                    <br />
                                    <hr />
                                    <label> <b> Total:</b></label>
                                    <br />
                                </div> */}
                                {/* <div className="col-lg-2 border border-left-0">
                                    <label> <b>0.00 ₹</b></label>
                                    <br />
                                    <label><b>0.00 ₹</b></label>
                                    <br />
                                    <label><b>0.00 ₹</b></label>
                                    <br />
                                    <label><b>0.00 ₹</b></label>
                                    <br />
                                    <label><b>{printData.gstamount} ₹</b></label>
                                    <br />
                                    <label><b>{printData.subtotal} ₹</b></label>
                                    <br />
                                    <hr />
                                    <label><b> {printData.totalamount} ₹</b> </label>

                                </div> */}

                            </div><br />
                            <div className='text-right'>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}
