import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'
import Main from './containers/main'

ReactDOM.render(
    <Provider store={store} key="provider">
        <Router>
            <Route path="/" component={Main}/>
        </Router>
    </Provider>,document.getElementById('layout'))