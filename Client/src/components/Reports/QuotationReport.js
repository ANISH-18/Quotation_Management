import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

function QuotationReport() {
    
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
            console.log(response.data.data);
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
        document.title = 'Quotation Report';
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

export default QuotationReport