import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Portfolio from './Portfolio';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';
import { FavoriteBorder } from '@material-ui/icons';


export default class Root extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink exact activeClassName="active" to="/portfolio">Portfolio</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/portfolio" component={Portfolio} />
                        <Route component={NotFound} />
                    </Switch>
                    <footer>
                        <p>Developed by Fabian Teichmann with <FavoriteBorder /></p>
                        <p>React v.{React.version}</p>
                        <p>Copyright © 2020</p>
                    </footer>
                </div>
            </Router>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
