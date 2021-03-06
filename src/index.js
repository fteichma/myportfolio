import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
/* import Portfolio from './Portfolio';
 */
import NotFound from './NotFound';
import * as serviceWorker from './serviceWorker';
import { ChromePicker } from 'react-color';
import { ColorizeOutlined } from '@material-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
/* import { FavoriteBorder } from '@material-ui/icons';
 */

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainColor: localStorage.getItem("mainColor") ? localStorage.getItem("mainColor") : "#1B6758",
            colorText: localStorage.getItem("colorText") ? localStorage.getItem("colorText") : "#FFF",
            colorPicker: false,
        }
    }
    componentDidMount() {
        document.documentElement.style.setProperty('--main-color', this.state.mainColor);
        document.documentElement.style.setProperty('--color-text', this.state.colorText);
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
            localStorage.setItem("colorText", "rgba(255, 255, 255, 0.95)");
            document.documentElement.style.setProperty('--color-text', "rgba(255, 255, 255, 0.95)");
            this.setState({ colorText: "rgba(255, 255, 255, 0.95)" });
        } else {
            localStorage.setItem("colorText", "rgba(0, 0, 0, 0.90)");
            document.documentElement.style.setProperty('--color-text', "rgba(0, 0, 0, 0.90)");
            this.setState({ colorText: "rgba(0, 0, 0, 0.90)" });
        }
    };
    render() {
        return (
            <div>
                <button disabled={this.state.colorPicker} className="ColorPicker"
                    onClick={() =>
                        this.setState({
                            colorPicker: true,
                        })}>
                    <ColorizeOutlined />
                </button>
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
                <Router>
                    {/* <nav> */}
                    {/* <ul>
                        <li>
                            <NavLink exact activeClassName="active" to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active" to="/portfolio">Portfolio</NavLink>
                        </li>
                    </ul>
                </nav> */}
                    <Switch>
                        <Route exact path="/" component={App} />
                        {/* <Route path="/portfolio" component={Portfolio} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Router>
                {/*                 <footer>
                    <p>React v.{React.version}</p>
                    <p>Copyright © 2020</p>
                    <p>Developed with <FavoriteBorder /> by Fabian Teichmann </p>
                </footer> */}
            </div>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
