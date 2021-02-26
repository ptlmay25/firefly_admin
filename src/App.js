import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import LoadingSpinner from './components/Shared/LoadingSpinner/LoadingSpinner';
import { Suspense } from 'react';   // Fallback screen

// Lazy Loading ( Preformance Booster )
const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Dashboard = React.lazy(() => import('./containers/Dashboard/Dashboard'))
const UserList = React.lazy(() => import('./containers/UserList/UserList'))
const UserDetails = React.lazy(() => import('./containers/UserDetails/UserDetails'))
const TokenPrice = React.lazy(() => import('./containers/TokenPrice/TokenPrice'))
const HotelList = React.lazy(() => import('./containers/HotelList/HotelList'))
const HotelEntryForm = React.lazy(() => import('./containers/HotelList/HotelEntryForm/HotelEntryForm'))
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
          <Route path="/" exact component={ Auth } />
          <Route path="/users" exact component={ UserList } />
          <Route path="/users/:uid" component={ UserDetails } />
          <Route path="/purchase-history" component={ PurchaseHistory } />
          <Route path="/selling-history" component={ SellingHistory } />
          <Route path="/withdraw-history" component={ WithdrawHistory } />
          <Route path="/token-price" component={ TokenPrice } />
          <Route path="/withdraw-request" component={ WithdrawRequest } />
          <Route path="/contact-request" component={ ContactRequest } />
          <Route path="/contact-history" component={ ContactHistory } />
          <Route path="/hotels" exact component={ HotelList } />
          <Route path="/hotels/add" component={ HotelEntryForm } />
          <Route path="/dash" component={ Dashboard } />
          <Redirect to="/dash" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={ Auth } />
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
