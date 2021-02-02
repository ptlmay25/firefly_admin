import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import Auth from './containers/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard'
import HotelList from './containers/HotelList/HotelList';
import HotelEntryForm from './containers/HotelList/HotelEntryForm/HotelEntryForm';
import PurchaseHistory from './containers/PurchaseHistory/PurchaseHistory';
import SellingHistory from './containers/SellingHistory/SellingHistory';
import TokenPrice from './containers/TokenPrice/TokenPrice';
import UserDetails from './containers/UserDetails/UserDetails';
import UserList from './containers/UserList/UserList';
import WithdrawHistory from './containers/WithdrawHistory/WithdrawHistory';
import WithdrawRequest from './containers/WithdrawRequest/WithdrawRequest';

class App extends Component {
  render() {
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
      <div>
      { routes }
    </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStatetoProps, null)(App);
