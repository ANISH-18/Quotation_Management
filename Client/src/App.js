import './App.css';
import './main.css';
import React, { useState } from 'react';
// import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Company from './components/Masters/Company';
import Productcatagories from './components/Masters/Productcatagories';
// import Cities from './components/Masters/Cities';
import Dealer from './components/Masters/Dealer';
import Dealers from './components/Masters/Dealers';
import Users from './components/Masters/Users';
import Product from './components/Masters/Product';
import Products from './components/Masters/Products';
// import Bulkprices from './components/Settings/Bulkprices';
import Quotations from './components/Quotations/Quotations';
// import Quotation from './components/Quotations/Quotation';
import PrintQuotation from './components/Quotations/PrintQuotation';
import Dashboard from './components/Dashboard';
import PriceReport from './components/Reports/PriceReport';
import ProductReport from './components/Reports/ProductReport';
import QuotationReport from './components/Reports/QuotationReport';
import ShowBulkPrices from './components/Settings/ShowBulkPrices';
import Protect from './components/Protect';
import axios from 'axios';
import Loader from './components/Loader';
const LazyCities = React.lazy(() => import('./components/Masters/Cities'));
const LazyHeader = React.lazy(() => import('./components/Header'));
const LazyBulkPrices = React.lazy(() => import('./components/Settings/Bulkprices'));
const LazyQuotation = React.lazy(() => import('./components/Quotations/Quotation'));
function App() {

  
let [loading, setLoading] = useState(false);

axios.interceptors.request.use(
  (req) => {
    console.log("Calling");
    setLoading(true);
     return req;
  },
  (err) => {
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    console.log("Called");
    setTimeout(()=>{
      setLoading(false);
    }, 1000);    
    return res;
  },
  (err) => {
     return Promise.reject(err);
  }
);

  return (
    <div>
      <BrowserRouter>
        {loading && <Loader />}
        {/* login */}
        
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        {/* masters */}
        <Routes>
          {/* <Route path='/master' element={<Header />}> */}
          <Route path='/master' element={<React.Suspense fallback='Loading...'><Protect Component={LazyHeader} /></React.Suspense>}>
            <Route path='/master/cities' element={<React.Suspense fallback='Loading...'><Protect Component={LazyCities} /> </React.Suspense>} />
            <Route path='/master/companies' element={<Protect Component={Company} />} />
            <Route path='/master/productcatagories' element={<Protect Component={Productcatagories} />} />
            <Route path='/master/dealer/:id' element={<Protect Component={Dealer} />} />
            <Route path='/master/dealer' element={<Protect Component={Dealer} />} />
            <Route path='/master/dealers' element={<Protect Component={Dealers} />} />
            <Route path='/master/users' element={<Protect Component={Users} />} />
            <Route path='/master/product/:id' element={<Protect Component={Product} />} />
            <Route path='/master/product' element={<Protect Component={Product} />} />
            <Route path='/master/products' element={<Protect Component={Products} />} />
          </Route>

        </Routes>


        <Routes>
          <Route path='/dashboard' element={<Protect Component={LazyHeader} />}>
            <Route path='/dashboard/home' element={<Protect Component={Dashboard} />} />
          </Route>
        </Routes>

        {/* settings */}
        <Routes>
          <Route path='/settings' element={<Protect Component={LazyHeader} />}>
            <Route path='/settings/bulkprices' element={<React.Suspense fallback='Loading...'><Protect Component={LazyBulkPrices} /></React.Suspense>} />
            <Route path='/settings/showbulkprices' element={<Protect Component={ShowBulkPrices} />} />

          </Route>
        </Routes>

        {/* quotations */}
        <Routes>
          <Route path='/quotation' element={<Protect Component={LazyHeader} />}>
            <Route path='/quotation/quotations' element={<Protect Component={Quotations} />} />
            <Route path='/quotation/quotations/:id' element={<Protect Component={Quotations} />} />
            <Route path='/quotation/quotation' element={<React.Suspense fallback='Loading...'><Protect Component={LazyQuotation} /></React.Suspense>} />
            <Route path='/quotation/quotation/printquotation' element={<Protect Component={PrintQuotation} />} />
            <Route path='/quotation/quotation/printquotation/:id' element={<Protect Component={PrintQuotation} />} />

          </Route>
        </Routes>

        {/* reports */}
        <Routes>
          <Route path='/report' element={<Protect Component={LazyHeader} />}>
            <Route path='/report/pricereport' element={<Protect Component={PriceReport} />} />
            <Route path='/report/productreport' element={<Protect Component={ProductReport} />} />
            <Route path='/report/quotationreport' element={<Protect Component={QuotationReport} />} />


          </Route>

        </Routes>

        <Footer />

      </BrowserRouter>




      {/* <LazyHeader />
      <Analyticaldashboard/>
      <Chartcard/>
      <Dynamictables/>
      <Taskandchatbox/>
      <Technicalsupport/>
      <Totalorders/>
      <Footer/> */}
    </div >
  );
}

export default App;
