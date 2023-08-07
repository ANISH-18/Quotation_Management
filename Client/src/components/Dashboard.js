import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
// import { Link } from 'react-router-dom'

export default function Dashboard() {
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
    const [count, setCount] = useState({
        company: 0,
        product: 0,
        city: 0,
        products: 0,
        user: 0,
        dealer: 0,
        quotations: 0,
        productCatagory: 0
    });

    function counts() {
        axios.get(getBaseUrl() + 'counts/getCounts', { headers: getHeader() }).then((response) => {
            console.log(response.data.count);

            if (response.data.count.product <= 500) {
                Swal.fire(
                    'The Product Stock quantity is less than 500',
                    'please fill stock quantity...!'
                )
            }
            setCount({
                ...count,
                company: response.data.count.company,
                product: response.data.count.product,
                city: response.data.count.city,
                products: response.data.count.products,
                user: response.data.count.user,
                dealer: response.data.count.dealer,
                quotations: response.data.count.quotations,
                productCatagory: response.data.count.productCatagory
            });

            console.log(count);
        });
    }

    useEffect(() => {
        document.title = 'Dashboard';
        counts();
    }, []);

    return (
        <div>

            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="page-title-icon">
                                    <i className="pe-7s-science icon-gradient bg-happy-itmeo"></i>
                                </div>
                                <div> Dashboard
                                    <div className="page-title-subheading">
                                        Products Quantity And Their Users
                                    </div>
                                </div>
                            </div>
                            <div className="page-title-actions">
                                {/* <button type="button" data-toggle="tooltip" title="Example Tooltip"
                                    data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
                                    <i className="fa fa-star"></i>
                                </button> */}
                                <div className="d-inline-block dropdown">
                                    {/* <button type="button" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false" className="btn-shadow dropdown-toggle btn btn-info">
                                        <span className="btn-icon-wrapper pr-2 opacity-7">
                                            <i className="fa fa-business-time fa-w-20"></i>
                                        </span>
                                        Buttons
                                    </button> */}
                                    {/* <div tabIndex="-1" role="menu" aria-hidden="true"
                                        className="dropdown-menu dropdown-menu-right">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href='/'>
                                                    <i className="nav-link-icon lnr-inbox"></i>
                                                    <span> Inbox</span>
                                                    <div className="ml-auto badge badge-pill badge-secondary">86</div>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='/'>
                                                    <i className="nav-link-icon lnr-book"></i>
                                                    <span> Book</span>
                                                    <div className="ml-auto badge badge-pill badge-danger">5</div>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href='/'>
                                                    <i className="nav-link-icon lnr-picture"></i>
                                                    <span> Picture</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a disabled="" className="nav-link disabled" href='/'>
                                                    <i className="nav-link-icon lnr-file-empty"></i>
                                                    <span> File Disabled</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs-animation">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div className="card mb-3 widget-chart">
                            <div className="widget-chart-content">
                                <div className="icon-wrapper rounded">
                                    <div className="icon-wrapper-bg bg-warning"></div>
                                    <i className="pe-7s-add-user text-warning"></i>
                                </div>
                                <div className="widget-numbers">
                                    <span>{count.user}</span>
                                </div>
                                <div
                                    className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">

                                    Users</div>
                                {/* <div className="widget-description opacity-8">
                                    <span className="text-danger pr-1">
                                        <i className="fa fa-angle-down"></i>
                                        <span className="pl-1">54.1%</span>
                                    </span>
                                    down last 30 days
                                </div> */}
                            </div>
                            <div className="widget-chart-wrapper">
                                <div id="dashboard-sparklines-simple-1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-4">
                        <div className="card mb-3 widget-chart">
                            <div className="widget-chart-content">
                                <div className="icon-wrapper rounded">
                                    <div className="icon-wrapper-bg bg-danger"></div>
                                    <i className="pe-7s-cart text-danger"></i>
                                </div>
                                <div className="widget-numbers"><span>{count.product}</span></div>
                                <div
                                    className="widget-subheading fsize-1 pt-2 opacity-10 text-danger font-weight-bold">
                                    Stock Quantity
                                </div>
                                {/* <div className="widget-description opacity-8">
                                    Compared to YoY:
                                    <span className="text-info pl-1">
                                        <i className="fa fa-angle-down"></i>
                                        <span className="pl-1">14.1%</span>
                                    </span>
                                </div> */}
                            </div>
                            <div className="widget-chart-wrapper">
                                <div id="dashboard-sparklines-simple-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-4">
                        <div className="card mb-3 widget-chart">
                            <div className="widget-chart-content">
                                <div className="icon-wrapper rounded">
                                    <div className="icon-wrapper-bg bg-info"></div>
                                    <i className="pe-7s-news-paper text-info"></i>
                                </div>
                                <div className="widget-numbers text-danger"><span>{count.quotations}</span></div>
                                <div
                                    className="widget-subheading fsize-1 pt-2 opacity-10 text-info font-weight-bold">
                                    Quotations
                                </div>
                                {/* <div className="widget-description opacity-8">
                                    Down by
                                    <span className="text-success pl-1">
                                        <i className="fa fa-angle-down"></i>
                                        <span className="pl-1">21.8%</span>
                                    </span>
                                </div> */}
                            </div>
                            <div className="widget-chart-wrapper">
                                <div id="dashboard-sparklines-simple-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tabs-animation">
                <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i className="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                            Company Delers Cities
                        </div>
                        {/* <div className="btn-actions-pane-right text-capitalize">
                            <button className="btn-wide btn-outline-2x mr-md-2 btn btn-outline-focus btn-sm">View
                                All</button>
                        </div> */}
                    </div>
                    <div className="no-gutters row">
                        <div className="col-sm-6 col-md-4 col-xl-4">
                            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg opacity-10 bg-warning"></div>
                                    <i className="pe-7s-users text-dark opacity-8"></i>
                                </div>
                                <div className="widget-chart-content">
                                    <div className="widget-subheading fsize-1 pt-2 opacity-10 text-info font-weight-bold">Dealers</div>
                                    <div className="widget-numbers">{count.dealer}</div>
                                    {/* <div className="widget-description opacity-8 text-danger">
                                        <div className="d-inline text-danger pr-1">
                                            <i className="fa fa-angle-down"></i>
                                            <span className="pl-1">54.1%</span>
                                        </div>
                                        less earnings
                                    </div> */}
                                </div>
                            </div>
                            <div className="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-xl-4">
                            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg opacity-9 bg-danger"></div>
                                    <i className="pe-7s-culture text-white"></i>
                                </div>
                                <div className="widget-chart-content">
                                    <div className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold">Company</div>
                                    <div className="widget-numbers"><span>{count.company}</span></div>
                                    {/* <div className="widget-description opacity-8 text-focus">
                                        Grow Rate:
                                        <span className="text-info pl-1">
                                            <i className="fa fa-angle-down"></i>
                                            <span className="pl-1">14.1%</span>
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                            <div className="divider m-0 d-md-none d-sm-block"></div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-xl-4">
                            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg opacity-9 bg-success"></div>
                                    <i className="lnr-apartment text-white"></i>
                                </div>
                                <div className="widget-chart-content">
                                    <div className="widget-subheading fsize-1 pt-2 opacity-10 text-danger font-weight-bold">Cities</div>
                                    <div className="widget-numbers text-danger"><span>{count.city}</span></div>
                                    {/* <div className="widget-description text-focus">
                                        Increased by
                                        <span className="text-warning pl-1">
                                            <i className="fa fa-angle-up"></i>
                                            <span className="pl-1">7.35%</span>
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center d-block p-3 card-footer">
                        <Link to="/report/productreport">
                            <button className="btn-pill btn-shadow btn-wide fsize-1 btn btn-primary btn-lg">
                                <span className="mr-2 opacity-7">
                                    <i className="icon icon-anim-pulse ion-ios-analytics-outline"></i>
                                </span>
                                <span className="mr-1">View Complete Report</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
