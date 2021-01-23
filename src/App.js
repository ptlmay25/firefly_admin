import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import Auth from './containers/Auth/Auth';
import Dashboard from './containers/Dashboard/Dashboard'
import UserDetails from './containers/UserDetails/UserDetails';
import UserList from './containers/UserList/UserList';

function App() {
  const routes = (
    <Switch>
      <Route path="/auth" exact component={ Auth } />
      <Route path="/users" exact component={ UserList } />
      <Route path="/users/:uid" component={ UserDetails } />
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
