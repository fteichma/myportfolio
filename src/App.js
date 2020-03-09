import React from 'react';
import './App.scss';
import * as Icon from "react-feather";
import { SocialIcon } from "react-social-icons";
import { Doughnut } from 'react-chartjs-2';
import { ChromePicker } from 'react-color';
import { ColorizeOutlined } from '@material-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      width: 0,
      height: 0,
      mainColor: localStorage.getItem("mainColor") ? localStorage.getItem("mainColor") : "#1B6758",
      colorText: localStorage.getItem("colorText") ? localStorage.getItem("colorText") : "rgba(255, 255, 255, 0.95)",
      colorPicker: false,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateWindowDimensions);
    document.documentElement.style.setProperty('--main-color', this.state.mainColor);
    document.documentElement.style.setProperty('--color-text', this.state.colorText);
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
      localStorage.setItem("colorText", "rgba(255, 255, 255, 0.95)");
      document.documentElement.style.setProperty('--color-text', "rgba(255, 255, 255, 0.95)");
      this.setState({ colorText: "rgba(255, 255, 255, 0.95)" });
    } else {
      localStorage.setItem("colorText", "rgba(0, 0, 0, 0.90)");
      document.documentElement.style.setProperty('--color-text', "rgba(0, 0, 0, 0.90)");
      this.setState({ colorText: "rgba(0, 0, 0, 0.90)" });
    }
  };
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  handleScroll = () => {
    this.setState({
      scrollY: window.scrollY,
    })
  };
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  doughnutGenerator = (data, items) => {
    for (let i in data) {
      items.push(
        <div className="col-lg-3">
          <Doughnut
            data={data[i]}
            options={{
              maintainAspectRatio: 1,
              aspectRatio: 1,
              animation: {
                animateRotate: true,
                animateScale: false
              },
              cutoutPercentage: 65,
              legend: {
                display: false
              },
              title: {
                display: false
              }
            }
            }
          />
          <h2>{data[i].labels}</h2>
        </div>
      )
    };
  }
  changeColor = (color) => {
    this.setState({
      mainColor: color,
    })
  }
  render() {
    const data = {
      0: {
        labels: ["Figma"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [75, 25],
            borderWidth: 1,
          }
        ]
      },
      1: {
        labels: ["UX Design"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [60, 40],
            borderWidth: 1,
          }
        ]
      },
      2: {
        labels: ["ReactJS"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [75, 25],
            borderWidth: 1,
          }
        ]
      },
      3: {
        labels: ["SCSS"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [60, 40],
            borderWidth: 1,
          }
        ]
      }
    };
    const data2 = {
      0: {
        labels: ["Photoshop"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [80, 20],
            borderWidth: 1,
          }
        ]
      },
      1: {
        labels: ["UI Design"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [85, 15],
            borderWidth: 1,
          }
        ]
      },
      2: {
        labels: ["React Native"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [65, 35],
            borderWidth: 1,
          }
        ]
      },
      3: {
        labels: ["PHP"],
        datasets: [
          {
            fill: false,
            backgroundColor: [this.state.mainColor, this.state.mainColor + "70"],
            data: [65, 35],
            borderWidth: 1,
          }
        ]
      }
    };
    const items = [];
    const items2 = [];
    this.doughnutGenerator(data, items);
    this.doughnutGenerator(data2, items2);
    return (
      <div className="App">
        <button disabled={this.state.colorPicker} className="ColorPicker" onClick={this.colorPicker}>
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
        <header className="App-header">
          <h2 className="animated fadeInDown delay-200ms">Hello, I'm</h2>
          <h1 className="animated fadeInDown delay-400ms">Fabian Teichmann</h1>
          <div className="Description animated fadeIn delay-500ms">
            <p>Front-end Web & Mobile Developer</p>
            <p>UI/UX Designer</p>
          </div>
          <div className="Social-icons animated fadeInUp delay-1s">
            <SocialIcon network="facebook" url="https://www.facebook.com/fabifabfabi" bgColor="white" />
            <SocialIcon network="dribbble" url="https://dribbble.com/fteichma" bgColor="white" />
            <SocialIcon network="linkedin" url="https://www.linkedin.com/in/fabian-teichmann-aa2340131/" bgColor="white" />
          </div>
          {this.state.scrollY <= 60 && (
            <div className="ScrollDown" onClick={() => window.scrollTo(0, this.state.height)}>
              <p>Scroll down</p>
              <Icon.ArrowDown />
            </div>
          )}
        </header>
        <article className="App-content container" id="skills">
          {this.state.scrollY >= 100 && (
            <div>
              <h1 className="animated fadeInLeft">Skills</h1>
              <div className="row animated fadeInLeft fast chart">
                {
                  items
                }
              </div>
              <div className="row animated fadeInRight fast chart">
                {
                  items2
                }
              </div>
            </div>
          )}
        </article>
      </div>
    );
  }
}

export default App;