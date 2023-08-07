import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

function Quotation() {
    
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

    const [quotation, setQuotation] = useState([]);

    function getData() {
        axios.get(getBaseUrl() + 'quotations', { headers: getHeader() }).then((response) => {
            if (response.data.data) {
                setQuotation(response.data.data);
            }
        });
    }

    function handleDelete(_id) {
        axios.delete(`http://localhost:8081/quotations/${_id}`, { headers: getHeader() }).then(() => {
            getData();
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        });
    }

    useEffect(() => {
        document.title = 'Quotation';
        getData();
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="app-page-title ">
                        <div className="page-title-wrapper ">
                            <div className="page-title-heading">

                                <div> Quotations  </div>
                            </div>
                            <div className="page-title-actions">

                                <div className="d-inline-block ">
                                    <Link to='/quotation/quotations'><button className=" bg-secondary text-light p-2 border" style={{ cursor: 'pointer' }}>
                                        Insert Quotation
                                    </button></Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="main-card mb-3 card">
                <div className="card-body">
                    <div className='container'>
                        <div className="row">
                            <div className="col-lg-12">
                                <table style={{ width: "100%" }} id="example"
                                    className="table table-hover  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>User</th>
                                            <th>Quotation Date</th>
                                            <th>Dealer</th>
                                            <th>Sale Type</th>
                                            <th>SubTotal</th>
                                            <th>Gst Amount</th>
                                            <th>Total Amount</th>
                                            <th style={{ width: "150px" }}>Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            quotation.map((item, i) => {
                                                return (

                                                    <tr key={i}>

                                                        <td>{i + 1}</td>
                                                        <td>{item.userid.name} </td>
                                                        <td>{item.qdate} </td>
                                                        <td>{item.dealerid.name} </td>
                                                        <td>{item.saletype}</td>
                                                        <td>{item.subtotal} </td>
                                                        <td>{item.gstamount} </td>
                                                        <td>{item.totalamount} </td>
                                                        <td>
                                                            <Link to={`/quotation/quotations/${item._id}`}>
                                                                <button className="mb-2 mr-2 btn-icon btn-icon-only  btn btn-primary" data-toggle="tooltip" data-placement="bottom" title="Edit"  >
                                                                    <i className="lnr-magic-wand btn-icon-wrapper"> </i></button>
                                                            </Link>
                                                            <button className="mb-2 mr-2 btn-icon btn-icon-only btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Delete" onClick={() => { handleDelete(item._id) }} >
                                                                <i
                                                                    className="pe-7s-trash btn-icon-wrapper" > </i></button>
                                                            <Link to={`/quotation/quotation/printquotation/${item._id}`}><button className="mb-2 mr-2 border btn-transition btn btn-shadow btn-outline-link" data-toggle="tooltip" data-placement="bottom" title="Print"  >
                                                                <i
                                                                    className="header-icon lnr-printer icon-gradient bg-ripe-malin" > </i></button>
                                                            </Link>
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

export default Quotation