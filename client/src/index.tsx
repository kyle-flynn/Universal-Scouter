import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import SchemaProvider from "./providers/SchemaProvider";

SchemaProvider.initialize('http://localhost', 8080);

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline/>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);