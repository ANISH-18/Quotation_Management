import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductReport() {
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

  const [getProductapiData, setProductapiData] = useState([]);

 async function getData() {
        axios.get(getBaseUrl() + 'products', { headers: getHeader() }).then((response) => {
            if (response.data.data) {
              setProductapiData(response.data.data);
            }
            console.log(response.data.data);
        });
    }

    function handleDelete(_id) {
        axios.delete(`http://localhost:8081/products/${_id}`, { headers: getHeader() }).then(() => {
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
      document.title = 'Product Report';
        getData();
    }, []);



  return (
    <div>
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="app-page-title ">
              <div className="page-title-wrapper ">
                <div className="page-title-heading">

                  <div> Products  </div>
                </div>
                <div className="page-title-actions">

                  <div className="d-inline-block ">
                    <Link to='/master/product'><button className=" bg-secondary text-light p-2 border" style={{cursor:'pointer'}} data-toggle="tooltip" data-placement="bottom" title="Insert Product">
                      Insert Product
                    </button></Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="main-card mb-3 card">
                <div className="card-body">
                    <div>
                        <div className="row">
                            <div className="col-lg-12">
                                <table style={{ width: "100%" }} id="example"
                                    className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Company</th>
                                            <th>Product Catagory</th>
                                            <th>Name</th>
                                            <th>Packet Quantity</th>
                                            <th>Box Quantity</th>
                                            <th>MRP</th>
                                            <th>GST (%)</th>
                                            <th>Credit Sale Rate</th>
                                            <th>Cash Sale Rate</th>
                                            <th>Stock Quantity</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    

                                        {
                                            getProductapiData.map((item, i) => {
                                                return (
                                                    <React.Fragment key={item._id}>
                                                        <tr>
                                                            
                                                            <td>{i + 1}</td>
                                                            <td>{item.companyid.name}</td>
                                                            <td>{item.pcid.name}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.packetquantity}</td>
                                                            <td>{item.boxquantity}</td>
                                                            <td>{item.mrp}</td>
                                                            <td>{item.gstpercentage}</td>
                                                            <td>{item.creditsalerate}</td>
                                                            <td>{item.cashsalerate}</td>
                                                            <td>{item.stockquantity}</td>
                                                           
                                                        </tr>
                                                    </React.Fragment>
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

    </div>
  )
}
