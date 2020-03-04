import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Contact from './Contact';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

const router = (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="active" to="/contact">Contact</NavLink>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)
ReactDOM.render(router, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
