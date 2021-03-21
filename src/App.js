import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import LoadingSpinner from './components/Shared/LoadingSpinner/LoadingSpinner';
import { Suspense } from 'react';   // Fallback screen

// Lazy Loading ( Preformance Booster )
const Home = React.lazy(() => import('./containers/Home/Home'))
const Privacy = React.lazy(() => import('./containers/Privacy/Privacy'))
const Refund = React.lazy(() => import('./containers/Refund/Refund'))
const Terms = React.lazy(() => import('./containers/Terms/Terms'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Dashboard = React.lazy(() => import('./containers/Dashboard/Dashboard'))
const UserList = React.lazy(() => import('./containers/UserList/UserList'))
const PartnerList = React.lazy(() => import('./containers/PartnerList/List/PartnerList'))
const UserDetails = React.lazy(() => import('./containers/UserDetails/UserDetails'))
const TokenPrice = React.lazy(() => import('./containers/TokenPrice/TokenPrice'))
const BusinessList = React.lazy(() => import('./containers/HotelList/BusinessList/BusinessList'))
const NewBusiness = React.lazy(() => import('./containers/HotelList/NewBusiness/NewBusiness'))
const UpdateBusiness = React.lazy(() => import('./containers/HotelList/UpdateBusiness/UpdateBusiness'))
const NewPartner = React.lazy(() => import('./containers/PartnerList/NewPartner/NewPartner'))
const UpdatePartner = React.lazy(() => import('./containers/PartnerList/UpdatePartner/UpdatePartner'))
const PurchaseHistory = React.lazy(() => import('./containers/PurchaseHistory/PurchaseHistory'))
const SellingHistory = React.lazy(() => import('./containers/SellingHistory/SellingHistory'))
const WithdrawHistory = React.lazy(() => import('./containers/WithdrawHistory/WithdrawHistory'))
const ContactHistory = React.lazy(() => import('./containers/ContactHistory/ContactHistory'))
const WithdrawRequest = React.lazy(() => import('./containers/WithdrawRequest/WithdrawRequest'))
const ContactRequest = React.lazy(() => import('./containers/ContactRequest/ContactRequest'))
// Lazy Loading ( Preformance Booster )

class App extends Component {

  render() {
    const fallback = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoadingSpinner />
      </div>
    )
    let routes = null
    if(this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/terms" exact component={ Terms } />
          <Route path="/privacy" exact component={ Privacy } />
          <Route path="/refund" exact component={ Refund } />
          <Route path="/admin2050" exact component={ Auth } />
          <Route path="/admin2050/users" exact component={ UserList } />
          <Route path="/admin2050/partners" exact component={ PartnerList } />
          <Route path="/admin2050/users/:uid" component={ UserDetails } />
          <Route path="/admin2050/purchase-history" component={ PurchaseHistory } />
          <Route path="/admin2050/selling-history" component={ SellingHistory } />
          <Route path="/admin2050/withdraw-history" component={ WithdrawHistory } />
          <Route path="/admin2050/token-price" component={ TokenPrice } />
          <Route path="/admin2050/withdraw-request" component={ WithdrawRequest } />
          <Route path="/admin2050/contact-request" component={ ContactRequest } />
          <Route path="/admin2050/contact-history" component={ ContactHistory } />
          <Route path="/admin2050/business" exact component={ BusinessList } />
          <Route path="/admin2050/business/add" component={ NewBusiness } />
          <Route path="/admin2050/partners/add" component={ NewPartner } />
          <Route path="/admin2050/business/:id" component={ UpdateBusiness } />
          <Route path="/admin2050/partners/:id" component={ UpdatePartner } />
          <Route path="/admin2050/dash" component={ Dashboard } />
          <Redirect to="/admin2050/dash" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/admin2050" exact component={ Auth } />
          <Route path="/terms" exact component={ Terms } />
          <Route path="/privacy" exact component={ Privacy } />
          <Route path="/refund" exact component={ Refund } />
          <Route path="/" exact component={ Home } />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <Suspense fallback={fallback}>
        {routes}
      </Suspense>
    )
  }
}

const mapStatetoProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStatetoProps, null)(App);
