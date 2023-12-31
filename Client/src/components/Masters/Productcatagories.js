import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function Productcatagories() {
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

    const [name, setName] = useState('');

    const [show, setShow] = useState(false);

    const [edit, setEdit] = useState({ id: "", name: "" });

    const [productcatagoryApiData, setproductcatagoryApiData] = useState([]);

    const [nameValidated, setNameValidated] = useState(true);


    const handleSubmit = (e) => {

        e.preventDefault();

        setNameValidated(name === "" ? false : true);

        if (name !== '') {

            axios.post(getBaseUrl() + 'productcatagories', {
                name: name
            }, { headers: getHeader() }).then(() => {
                getData();
                document.getElementById('name').value = '';
            });

        }
    }

    function cleared() {
        document.getElementById('name').value = '';
    }

    function getData() {
        axios.get(getBaseUrl() + 'productcatagories', { headers: getHeader() }).then((response) => {
            setproductcatagoryApiData(response.data.data);
            console.log(response.data.data);
        })
    };

    function handleDelete(_id) {
        axios.delete(getBaseUrl() + `productcatagories/${_id}`, { headers: getHeader() }).then(() => {
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

    async function editProductcatagory(id, name) {
        // axios.put(`http://localhost:8081/cities/${id}`,{
        //     name:Name
        // }).then(()=>{
        //         getData();
        // });
        setName(name);
        document.getElementById('name').value = name;
        setShow(true);
        setEdit({ id: id, name: name })
    }

    function updateName() {

        if (edit.id !== '' && name !== '') {

            axios.put(`http://localhost:8081/productcatagories/${edit.id}`, {
                name: name
            }, { headers: getHeader() }).then(() => {
                getData();
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire('Saved!', '', 'success')
                    } 
                })
                document.getElementById('name').value = "";
                setShow(false)
            });
        }
    }

    useEffect(() => {
        document.title = 'Product Catagories';
        getData();

    }, []);

    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="app-page-title ">
                            <div className="page-title-wrapper ">
                                <div className="page-title-heading">

                                    <div> Product Catagories </div>
                                </div>
                                <div className="page-title-actions">

                                    {/* <div className="d-inline-block ">
                             <label className=" bg-secondary text-light p-2 border">
                                        Count :
                                    </label>
                                </div> */}

                                </div>

                            </div>
                        </div>

                        <div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main-card mb-2 card ">
                                        <form onSubmit={handleSubmit}>
                                            <div className="card-body form-group">

                                                <label className=""><b>Catagory Name</b></label>
                                                <input name="catagoryname" id="name"
                                                    placeholder="Enter Catagory Name" type="text"
                                                    className="form-control" onChange={(e) => { setName(e.target.value) }} />

                                                {!nameValidated && <span className='text-danger'>please enter your product catagory name</span>}
                                                <br />
                                                {show === false &&
                                                    <button type="submit" value='Submit'
                                                        className="btn btn-primary" >Save</button>
                                                }

                                                {show === true &&
                                                    <button type="button" value='edit'
                                                        className="btn btn-primary" onClick={() => { updateName() }}>Update</button>
                                                }

                                                <button type="button" className='m-2 btn btn-danger' onClick={() => { cleared() }}>Clear</button>
                                            </div>
                                        </form>
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
                                                className="table table-hover  table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "50px" }}>No.</th>
                                                        <th style={{ width: "50px" }}>Name</th>
                                                        <th style={{ width: "60px" }}>Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        productcatagoryApiData.map((item, i) => {
                                                            return (

                                                                <tr key={i}>

                                                                    <td>{i + 1}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>
                                                                        <button className="mb-2 mr-2 btn-icon btn-icon-only  btn btn-primary" onClick={() => editProductcatagory(item._id, item.name)} >
                                                                            <i className="lnr-magic-wand btn-icon-wrapper"> </i></button>

                                                                        <button className="mb-2 mr-2 btn-icon btn-icon-only btn btn-danger" onClick={() => {  handleDelete(item._id) }}  >
                                                                            <i
                                                                                className="pe-7s-trash btn-icon-wrapper" > </i></button>

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
                </div>
            </div>

        </div>
    )
}
