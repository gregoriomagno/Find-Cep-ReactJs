import './index.css';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Store } from './store';

ReactDom.render(
    <Provider store={Store}>
    <App/>,
    
    </Provider>,

   
    document.getElementById('root')
)