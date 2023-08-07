import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router';

export default function ShowBulkPrices() {
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

    // const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [companyid, setCompanyId] = useState("");
    const [pcid, setPCId] = useState("");
    const [filter, setfilter] = useState([]);

    let companyApiData = useSelector((state) => state.companies);
    let pcApidata = useSelector((state) => state.productcategories);




    // function updateValues(e, i, field) {
    //     e.preventDefault();
    //     setProducts(products => products.map((product, index) => {
    //         if (i === index) {
    //             product[field] = parseFloat(e.target.value)
    //         }
    //         return product;
    //     }));
    // };

    // function submitValues(e, i) {
    //     e.preventDefault();
    //     axios.put(getBaseUrl() + 'products/' + products[i]["_id"], products[i], { headers: getHeader() }).then((response) => {
    //         if (response) {
    //             console.log("Done");
    //             navigate('/master/products');

    //         }
    //     });
    // }

    function filterData(e) {
        e.preventDefault();
        let search = e.target.value;
        let filtered;

        if (search !== "") {
            filtered = products.filter(function (str) { return str.name.includes(search); });
        } else {
            filtered = products;
        }
        setfilter(filtered);
    }



    useEffect(() => {
        document.title = 'Show Bulk Prices';
        axios.get(getBaseUrl() + 'products?pcid=' + pcid + "&companyid=" + companyid, { headers: getHeader() }).then((response) => {
            setProducts(response.data.data);
        });
    }, [companyid, pcid]);

    return (
        <div className='m-0'>
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="app-page-title ">
                            <div className="page-title-wrapper ">
                                <div className="page-title-heading">

                                    <div> Bulk Product Prices  </div>
                                    

                                </div>
                                <div className="page-title-actions ">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <label className=""><b>Product Catagory</b></label>
                                            <select name="productcatagory" id="productcatagory" value={pcid} onChange={(e) => { setPCId(e.target.value) }} className='form-control'>
                                                <option value="">Select  Catagory</option>
                                                {
                                                    pcApidata.map((productcatagories, i) => {
                                                        return <option key={"pc" + i} value={productcatagories._id}>{productcatagories.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-lg-3">
                                            <label><b>Company </b></label>
                                            <select name="companycatagory" id="companycatagory" className='form-control' value={companyid} onChange={(e) => { setCompanyId(e.target.value) }} >
                                                <option value="">Select  Catagory</option>
                                                {
                                                    companyApiData.map((company, i) => {
                                                        return <option key={"company" + i} value={company._id}>{company.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-lg-3">
                                            <label className=''> <b> Search</b> </label><br />
                                            <input type="textbox" placeholder='Search Here...' onInput={(e) => { filterData(e) }} className="form-control" />
                                        </div>
                                        <div className="col-lg-3"><br /><br />
                                            <Link to='/settings/bulkprices'><button className=" bg-secondary text-light form-control border" style={{ cursor: 'pointer' }}>
                                                Insert Bulk Prices
                                            </button></Link>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="main-card mb-2 card ">
                <div className="card-body">
                    <div className='m-0'>
                        <div className="row">
                            <div className="col-lg-12">
                                <table style={{ width: "100%" }} id="table"
                                    className="table table-hover  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Company</th>
                                            <th>Product  Catagory</th>
                                            <th>Product Name</th>
                                            <th>Stock Quantity</th>
                                            <th>MRP</th>
                                            <th>Credit  Sale Rate</th>
                                            <th>Cash  Sale Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            filter.length === 0 && products.map((item, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.companyid.name}</td>
                                                        <td>{item.pcid.name}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            {item.stockquantity}
                                                        </td>
                                                        <td>
                                                            {item.mrp}
                                                        </td>
                                                        <td>
                                                            {item.creditsalerate}
                                                        </td>
                                                        <td>
                                                            {item.cashsalerate}
                                                        </td>


                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            filter.length > 0 && filter.map((item, i) => {
                                                return (

                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.companyid.name}</td>
                                                        <td>{item.pcid.name}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            {item.stockquantity}
                                                        </td>
                                                        <td>
                                                            {item.mrp}
                                                        </td>
                                                        <td>
                                                            {item.creditsalerate}
                                                        </td>
                                                        <td>
                                                            {item.cashsalerate}
                                                        </td>


                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
