import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'


import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; 
import 'react-phone-input-2/lib/style.css'

import './index.css';
import App from './App';
import reducer from './store/reducers/auth'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, devTools())
const app =( 
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </Provider>
)
ReactDOM.render(
  app ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
