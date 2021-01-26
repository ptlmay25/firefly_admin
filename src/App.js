import { Route, Redirect, Switch } from 'react-router-dom'

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

function App() {
  const routes = (
    <Switch>
      <Route path="/auth" exact component={ Auth } />
      <Route path="/users" exact component={ UserList } />
      <Route path="/users/:uid" component={ UserDetails } />
      <Route path="/purchase-history" component={ PurchaseHistory } />
      <Route path="/selling-history" component={ SellingHistory } />
      <Route path="/withdraw-history" component={ WithdrawHistory } />
      <Route path="/token-price" component={ TokenPrice } />
      <Route path="/withdraw-request" component={ WithdrawRequest } />
      <Route path="/hotels" exact component={ HotelList } />
      <Route path="/hotels/add" component={ HotelEntryForm } />
      <Route path="/" component={ Dashboard } />
      <Redirect to="/" />
    </Switch>
  )
  return (
    <div>
      { routes }
    </div>
  );
}

export default App;
