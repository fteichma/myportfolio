import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import { ColorizeOutlined } from '@material-ui/icons';
import { ChromePicker } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';

import './index.scss';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Contact from './Contact';
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';

export default class Root extends React.Component {
    static initialState = {
        colorPicker: false,
        mainColor: "#1B6758",
        colorText: "white"
    };

    constructor(props) {
        super(props);
        this.state = Root.initialState;
    }

    colorPicker = () => {
        this.setState({
            colorPicker: true,
        })
    }

    handleChangeComplete = (color) => {
        this.setState({ mainColor: color.hex });
        document.documentElement.style.setProperty('--main-color', color.hex);
        localStorage.setItem("mainColor", color.hex);
        let colorPerso = this.state.mainColor;
        let colorPersoR = colorPerso[1] + "" + colorPerso[2];
        let colorPersoG = colorPerso[3] + "" + colorPerso[4];
        let colorPersoB = colorPerso[5] + "" + colorPerso[6];
        colorPersoR = parseInt(colorPersoR, 16);
        colorPersoG = parseInt(colorPersoG, 16);
        colorPersoB = parseInt(colorPersoB, 16);
        let o = Math.round(((parseInt(colorPersoR) * 299) + (parseInt(colorPersoG) * 587) + (parseInt(colorPersoB) * 114)) / 1000);
        if (o < 125) {
            localStorage.setItem("colorText", "#fff");
            document.documentElement.style.setProperty('--color-text', "rgba(255, 255, 255, 0.95)");
            this.setState({ colorText: "#fff" });
        } else {
            localStorage.setItem("colorText", "#000");
            document.documentElement.style.setProperty('--color-text', "rgba(0, 0, 0, 0.90)");
            this.setState({ colorText: "#000" });
        }
    };

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
                                <NavLink exact activeClassName="active" to="/contact">Contact</NavLink>
                            </li>
                            <button disabled={this.state.colorPicker} className="ColorPicker" onClick={this.colorPicker}>
                                <ColorizeOutlined />
                            </button>
                        </ul>
                    </nav>
                    {this.state.colorPicker && (
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                this.setState({ colorPicker: false })
                            }}>
                            <ChromePicker
                                className={"color-picker"}
                                disableAlpha={true}
                                color={this.state.mainColor}
                                onChangeComplete={this.handleChangeComplete} />
                        </OutsideClickHandler>
                    )}
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/contact" component={Contact} />
                        <Route component={NotFound} />
                    </Switch>
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
