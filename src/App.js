import React, { Fragment } from 'react';
import './App.scss';
import * as Icon from "react-feather";
import { SocialIcon } from "react-social-icons";
import Chart from "react-apexcharts";
import "./Portfolio.scss";
import * as jribbble from 'jribbble';
import dribbble from './assets/dribbble.svg';
import automatly_logo from './assets/automatly.png';
import emergence_logo from './assets/emergence.png';
import drunkable_logo from './assets/drunkable.png';
import intraplus_logo from './assets/intraplus.png';
import cv_pdf from './assets/CV_.pdf'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import screen1 from './assets/screenshots/automatly/1.png';
import screen2 from './assets/screenshots/automatly/2.png';
import screen3 from './assets/screenshots/automatly/3.png';
import screen4 from './assets/screenshots/automatly/4.png';

import screen1_1 from './assets/screenshots/emergence/1.jpg';
import screen2_1 from './assets/screenshots/emergence/2.jpg';
import screen3_1 from './assets/screenshots/emergence/3.jpg';
import screen4_1 from './assets/screenshots/emergence/4.jpg';
import screen5_1 from './assets/screenshots/emergence/5.jpg';
import screen6_1 from './assets/screenshots/emergence/6.jpg';

import screen1_2 from './assets/screenshots/drunkable/1.jpg';
import screen2_2 from './assets/screenshots/drunkable/2.jpg';
import screen3_2 from './assets/screenshots/drunkable/3.jpg';

import screen1_3 from './assets/screenshots/intraplus/1.png';
import screen2_3 from './assets/screenshots/intraplus/2.png';

import { Animated } from "react-animated-css";
import Typewriter from 'typewriter-effect';

const SCREENSHOTS_AUTOMATLY = [
  screen1,
  screen2,
  screen3,
  screen4
];

const SCREENSHOTS_EMERGENCE = [
  screen1_1,
  screen2_1,
  screen3_1,
  screen4_1,
  screen5_1,
  screen6_1
];

const SCREENSHOTS_DRUNKABLE = [
  screen1_2,
  screen2_2,
  screen3_2,
];

const SCREENSHOTS_INTRAPLUS = [
  screen1_3,
  screen2_3,
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      width: 0,
      height: 0,
      mainColor: localStorage.getItem("mainColor") ? localStorage.getItem("mainColor") : "#1B6758",
      shots: [],
      dribbbleShotKey: 0,
      screenshotKey: 0,
      dribbbleShotIsOpen: false,
      screenshotIsOpen: -1,
      showMore: [false, false],
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    this.getDribbbleShots();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  handleScroll = () => {
    this.setState({
      scrollY: window.scrollY,
    })
  };
  async getDribbbleShots() {
    await jribbble.shots({ token: "1d4677141b29098b931d5390f027a4cc8ea1d2679817092400d9a17ce6fa2294" },
      (shots) => {
        shots.map((item, i) => {
          this.setState({ shots: [...this.state.shots, item] });
          return item;
        })
      });
  }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  render() {
    const series = [[75, 25], [60, 40], [80, 20], [85, 15]];
    const series2 = [[75, 25], [75, 25], [65, 40], [85, 15], [65, 35], [65, 35], [95, 5], [80, 20]];
    const labels = [['Figma'], ['UX Design'], ['Photoshop'], ['UI Design']];
    const labels2 = [['ReactJS'], ['NPM'], ['SCSS'], ['CSS3'], ['React Native'], ['PHP'], ['HTML5'], ['JS - ES6']];
    return (
      <div className="App" >
        <header className="App-header">
          <Animated animationIn="fadeInDown" animationInDelay={200} isVisible={true}>
            <h2>Hello, I'm</h2>
          </Animated>
          <Animated animationIn="fadeInDown" animationInDelay={700} isVisible={true}>
            <h1>Fabian Teichmann</h1>
          </Animated>
          <div className="Description">
            <Animated animationIn="fadeInUp" animationInDelay={800} isVisible={true}>
              <Typewriter
                options={{
                  strings: ['< Front-end Web & Mobile Developer />', 'UI/UX Designer'],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                }}
              />
            </Animated>
          </div>
          <Animated animationIn="fadeInUp" animationInDelay={1300} isVisible={true} className={"Social-icons"}>
            <SocialIcon target="_blank" rel="noopener noreferrer" id="facebook" network="facebook" url="https://www.facebook.com/fabifabfabi" label="Facebook" />
            <SocialIcon target="_blank" rel="noopener noreferrer" id="dribbble" network="dribbble" url="https://dribbble.com/fteichma" label="Dribbble" />
            <SocialIcon target="_blank" rel="noopener noreferrer" id="linkedin" network="linkedin" url="https://www.linkedin.com/in/fabian-teichmann-aa2340131/" label="LinkedIn" />
            <SocialIcon id="email" network="email" url="mailto:fabiteich01@gmail.com" label="Email" />
          </Animated>
          <div className="mt-4">
            <a className="btn btn-outline-primary" href={cv_pdf} download="CV-Fabian_Teichmann_Front-end//UI/UX-Designer">
              DOWNLOAD MY CV
            </a>
          </div>
          {this.state.scrollY <= 60 && (
            <div className="ScrollDown" onClick={() => window.scrollTo(0, this.state.height)}>
              <Icon.ArrowDown />
            </div>
          )}
        </header>
        <article className="App-content">
          <div className="container" id="skills">
            <h1 className="animated fadeInLeft">My skills</h1>
            <div className="row animated fadeInLeft fast chart">
              <div className="col-md-6">
                <h2>Development</h2>
                <div className="row">
                  {series2.map((object, i) => {
                    return (
                      <div className="col-lg-6 chart-donut" key={"donut" + i}>
                        <Chart
                          options={{
                            chart: {
                              type: "donut",
                              width: "100%",
                            },
                            responsive: [{
                              breakpoint: 576,
                              options: {
                                chart: {
                                  width: 280
                                },
                              }
                            },
                            {
                              breakpoint: 768,
                              options: {
                                chart: {
                                  width: 340
                                },
                              }
                            },
                            {
                              breakpoint: 992,
                              options: {
                                chart: {
                                  width: 300
                                },
                              }
                            },
                            {
                              breakpoint: 1200,
                              options: {
                                chart: {
                                  width: 220
                                },
                              }
                            },
                            {
                              breakpoint: 25500,
                              options: {
                                chart: {
                                  width: 230,
                                },
                              }
                            },
                            ],
                            dataLabels: {
                              enabled: false
                            },
                            plotOptions: {
                              pie: {
                                donut: {
                                  labels: {
                                    show: true,
                                    name: {
                                      show: true,
                                      fontSize: '20px',
                                      color: '#000',
                                      offsetY: 0,
                                      formatter: function () {
                                        return labels2[i];
                                      }
                                    },
                                    value: {
                                      show: false,
                                    },
                                    total: {
                                      show: true,
                                      label: labels2[i],
                                      color: '#373d3f',
                                    }
                                  }
                                }
                              }
                            },
                            tooltip: {
                              enabled: true,
                              y: {
                                formatter: function (val) {
                                  return val + "%"
                                },
                                title: {
                                  formatter: function () {
                                    return labels2[i]
                                  }
                                }
                              }
                            },
                            legend: {
                              show: false
                            }
                          }
                          }
                          series={object}
                          type={"donut"} />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="col-md-6">
                <h2>Design</h2>
                <div className="row">
                  {series.map((object, i) => {
                    return (
                      <div className="col-lg-6 chart-donut" key={"donut" + i}>
                        <Chart
                          style={{
                            width: "100%",
                            maxWidth: "100%",
                            position: "relative",
                          }}
                          options={{
                            chart: {
                              width: "100%",
                              type: "donut"
                            },
                            responsive: [{
                              breakpoint: 576,
                              options: {
                                chart: {
                                  width: 280
                                },
                              }
                            },
                            {
                              breakpoint: 768,
                              options: {
                                chart: {
                                  width: 340
                                },
                              }
                            },
                            {
                              breakpoint: 992,
                              options: {
                                chart: {
                                  width: 300
                                },
                              }
                            },
                            {
                              breakpoint: 1200,
                              options: {
                                chart: {
                                  width: 220
                                },
                              }
                            },
                            {
                              breakpoint: 25500,
                              options: {
                                chart: {
                                  width: 230,
                                },
                              }
                            },
                            ],
                            dataLabels: {
                              enabled: false
                            },
                            plotOptions: {
                              pie: {
                                donut: {
                                  labels: {
                                    show: true,
                                    name: {
                                      show: true,
                                      fontSize: '20px',
                                      color: '#000',
                                      offsetY: 0,
                                      formatter: function () {
                                        return labels[i];
                                      }
                                    },
                                    value: {
                                      show: false,
                                    },
                                    total: {
                                      show: true,
                                      label: labels[i],
                                      color: '#373d3f',
                                    }
                                  }
                                }
                              }
                            },
                            tooltip: {
                              enabled: true,
                              y: {
                                formatter: function (val) {
                                  return val + "%"
                                },
                                title: {
                                  formatter: function () {
                                    return labels[i]
                                  }
                                }
                              }
                            },
                            legend: {
                              show: false
                            }
                          }
                          }
                          series={object}
                          type={"donut"} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="container" id="dribbble-shots">
            <h1 className="animated fadeInDown">Last shots on <a href="https://dribbble.com/fteichma" target="_blank" rel="noopener noreferrer"><img src={dribbble} alt="Dribbble" /></a> </h1>
            <div ref={this.dribbbleShots} className="row">
              {
                this.state.shots.map((shot, key) => {
                  let date = new Date(shot.published_at);
                  let year = date.getFullYear();
                  let month = date.toLocaleString('en', { month: 'long' })
                  let dt = date.getDate();
                  if (dt < 10) {
                    dt = '0' + dt;
                  }
                  const _date = month + " " + dt + ", " + year;
                  return (
                    <Fragment key={key}>
                      {/*                       {this.state.dribbbleShotKey === key &&
                        <Lightbox
                          large={shot.images.hidpi}
                          onClose={() => this.setState({ dribbbleShotKey: undefined })}
                          hideDownload
                          alt={shot.title}
                        />
                      } */}
                      <div
                        onClick={() => {
                          this.setState({ dribbbleShotIsOpen: true, dribbbleShotKey: key })
                        }}
                        className={"col-lg-4 col-md-6 shot"}
                        style={{ backgroundImage: "url(" + shot.images.two_x + ")" }}>
                        <div className="description">
                          <p>{shot.title}</p>
                          <p>{_date}</p>
                        </div>
                      </div>
                    </Fragment>
                  );
                })
              }
              {
                this.state.dribbbleShotIsOpen &&
                <div>
                  <Lightbox
                    mainSrc={this.state.shots[this.state.dribbbleShotKey].images.hidpi}
                    nextSrc={this.state.shots[(this.state.dribbbleShotKey + 1) % this.state.shots.length].images.hidpi}
                    prevSrc={this.state.shots[(this.state.dribbbleShotKey + this.state.shots.length - 1) % this.state.shots.length].images.hidpi}
                    onCloseRequest={() => this.setState({ dribbbleShotIsOpen: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        dribbbleShotKey: (this.state.dribbbleShotKey + this.state.shots.length - 1) % this.state.shots.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        dribbbleShotKey: (this.state.dribbbleShotKey + 1) % this.state.shots.length,
                      })
                    }
                  />
                </div>
              }
            </div>
          </div>
          <div className="container" id="experience">
            <h1 className="animated fadeInDown">Experience</h1>
            <div className="row box">
              <div className="col-4 pt-4 logo-infos">
                <a href="https://app.automatly.co/" target="_blank" rel="noopener noreferrer"><img className="company-logo" src={automatly_logo} width="70px" alt="Automatly - Logo" /></a>
                <h3 className="mt-3"><b>Automatly</b></h3>
                <h4>Internship</h4>
                <h4>Nov 2019 - Feb 2020</h4>
              </div>
              <div className="col-8 text-left description">
                <h2>Front-end Web Developer / UI/UX Designer - ReactJS</h2>
                <p>
                  Internship as Front-end & UI / UX Designer for the start-up "Automatly" (<a href="https://www.automatly.co/" target="_blank" rel="noopener noreferrer">automatly.co</a>), formerly "Chatbot Plus". Integration of a new version of the application with a lot of new features.
                </p>
                <ul>
                  <li>Framework : React </li>
                  <li>Mockup : Figma</li>
                </ul>
                <div className="row">
                  {SCREENSHOTS_AUTOMATLY.map((screenshot, key) => {
                    let id = key + 1;
                    return (
                      (id <= 2) ? (<div key={key} className="col-md-6 py-2" >
                        <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 0, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                      </div>) : this.state.showMore[0] && (<div key={key} className="col-md-6 py-2" >
                        <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 0, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                      </div>)
                    )
                  })}
                  {!(this.state.showMore[0]) ?
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[0] = true;
                      this.setState({ showMore: _showMore });
                    }}>Show more</button>)
                    :
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[0] = false;
                      this.setState({ showMore: _showMore });
                    }}>Show less</button>)}
                  {
                    this.state.screenshotIsOpen === 0 &&
                    <Lightbox
                      mainSrc={SCREENSHOTS_AUTOMATLY[this.state.screenshotKey]}
                      nextSrc={SCREENSHOTS_AUTOMATLY[(this.state.screenshotKey + 1) % SCREENSHOTS_AUTOMATLY.length]}
                      prevSrc={SCREENSHOTS_AUTOMATLY[(this.state.screenshotKey + SCREENSHOTS_AUTOMATLY.length - 1) % SCREENSHOTS_AUTOMATLY.length]}
                      onCloseRequest={() => this.setState({ screenshotIsOpen: -1 })}
                      onMovePrevRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + SCREENSHOTS_AUTOMATLY.length - 1) % SCREENSHOTS_AUTOMATLY.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + 1) % SCREENSHOTS_AUTOMATLY.length,
                        })
                      }
                    />
                  }
                </div>
              </div>
            </div>
            <div className="row box">
              <div className="col-4 pt-4 logo-infos">
                <img className="company-logo" src={emergence_logo} width="70px" alt="Automatly - Logo" />
                <h3 className="mt-3"><b>Emergence</b></h3>
                <h4>Volunteering</h4>
                <h4>Nov 2018 - Feb 2019</h4>
              </div>
              <div className="col-8 text-left description">
                <h2>Web Developer - PHP</h2>
                <p>
                  Internship as a volunteer full-stack PHP developer for the start-up "Emergence" incubated at VentureLab in Liège.
                </p>
                <p>
                  The startup still exists under the name "Open'up". It's no longer a web application but an iOS & Android application...
                </p>
                <ul>
                  <li>Languages & libraries: HTML5, CSS3 (Bootstrap, Animated.css), PHP (MySQL), JS (Chart.JS, jQuery...)</li>
                </ul>
                <div className="row">
                  {SCREENSHOTS_EMERGENCE.map((screenshot, key) => {
                    let id = key + 1;
                    return (
                      (id <= 2) ? (<div key={key} className="col-md-6 py-2" >
                        <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 1, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                      </div>) : this.state.showMore[1] && (
                        <div key={key} className="col-md-6 py-2" >
                          <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 1, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                        </div>
                      )
                    )
                  })}
                  {!(this.state.showMore[1]) ?
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[1] = true;
                      this.setState({ showMore: _showMore });
                    }}>Show more</button>)
                    :
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[1] = false;
                      this.setState({ showMore: _showMore });
                    }}>Show less</button>)}
                  {
                    this.state.screenshotIsOpen === 1 &&
                    <Lightbox
                      mainSrc={SCREENSHOTS_EMERGENCE[this.state.screenshotKey]}
                      nextSrc={SCREENSHOTS_EMERGENCE[(this.state.screenshotKey + 1) % SCREENSHOTS_EMERGENCE.length]}
                      prevSrc={SCREENSHOTS_EMERGENCE[(this.state.screenshotKey + SCREENSHOTS_EMERGENCE.length - 1) % SCREENSHOTS_EMERGENCE.length]}
                      onCloseRequest={() => this.setState({ screenshotIsOpen: -1 })}
                      onMovePrevRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + SCREENSHOTS_EMERGENCE.length - 1) % SCREENSHOTS_EMERGENCE.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + 1) % SCREENSHOTS_EMERGENCE.length,
                        })
                      }
                    />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="container" id="projects">
            <h1 className="animated fadeInDown">My personal projects</h1>
            <div className="row box">
              <div className="col-4 pt-4 logo-infos">
                <img className="company-logo round" src={drunkable_logo} width="70px" alt="Automatly - Logo" />
                <h3 className="mt-3"><b>Drunkable</b></h3>
                <h4>Mobile App</h4>
                <h4>Jun 2019</h4>
              </div>
              <div className="col-8 text-left description">
                <h2>Drunkable</h2>
                <p>
                  Drunkable is a drinking game that allows you to make your evenings memorable with several modes available! Let the party begin!
                </p>
                <p>
                  Available on iOS & Android (in french)
                </p>
                <p>
                  Developed with React Native
                </p>
                <div className="row">
                  {SCREENSHOTS_DRUNKABLE.map((screenshot, key) => {
                    let id = key + 1;
                    return (
                      (id <= 2) ? (<div key={key} className="col-md-6 py-2" >
                        <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 2, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                      </div>) : this.state.showMore[2] && (
                        <div key={key} className="col-md-6 py-2" >
                          <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 2, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                        </div>
                      )
                    )
                  })}
                  {!(this.state.showMore[2]) ?
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[2] = true;
                      this.setState({ showMore: _showMore });
                    }}>Show more</button>)
                    :
                    (<button className={"btn btn-link"} onClick={() => {
                      let _showMore = [...this.state.showMore];
                      _showMore[2] = false;
                      this.setState({ showMore: _showMore });
                    }}>Show less</button>)}
                  {
                    this.state.screenshotIsOpen === 2 &&
                    <Lightbox
                      mainSrc={SCREENSHOTS_DRUNKABLE[this.state.screenshotKey]}
                      nextSrc={SCREENSHOTS_DRUNKABLE[(this.state.screenshotKey + 1) % SCREENSHOTS_DRUNKABLE.length]}
                      prevSrc={SCREENSHOTS_DRUNKABLE[(this.state.screenshotKey + SCREENSHOTS_DRUNKABLE.length - 1) % SCREENSHOTS_DRUNKABLE.length]}
                      onCloseRequest={() => this.setState({ screenshotIsOpen: -1 })}
                      onMovePrevRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + SCREENSHOTS_DRUNKABLE.length - 1) % SCREENSHOTS_DRUNKABLE.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + 1) % SCREENSHOTS_DRUNKABLE.length,
                        })
                      }
                    />
                  }
                </div>
              </div>
            </div>
            <div className="row box">
              <div className="col-4 pt-4 logo-infos">
                <img className="company-logo round" src={intraplus_logo} width="70px" alt="Automatly - Logo" />
                <h3 className="mt-3"><b>19 Intra Plus</b></h3>
                <h4>Chrome extension</h4>
                <h4>Dec. 2018</h4>
              </div>
              <div className="col-8 text-left description">
                <h2>19 Intra Plus</h2>
                <p>
                  A chrome extension that adds useful information on Intranet 42 to the students of School 19. For example, the number of hours worked during the week, month or year, the 19 logo, a quote that changes when the page is refreshed, and the addition of a quick link to the clusters page.
                </p>
                <div className="row">
                  {SCREENSHOTS_INTRAPLUS.map((screenshot, key) => {
                    let id = key + 1;
                    return (
                      <div key={key} className="col-md-6 py-2" >
                        <img src={screenshot} onClick={() => this.setState({ screenshotIsOpen: 3, screenshotKey: key })} width="100%" alt={"Screenshot #" + id + " - Automatly"} />
                      </div>
                    )
                  })}
                  {
                    this.state.screenshotIsOpen === 3 &&
                    <Lightbox
                      mainSrc={SCREENSHOTS_INTRAPLUS[this.state.screenshotKey]}
                      nextSrc={SCREENSHOTS_INTRAPLUS[(this.state.screenshotKey + 1) % SCREENSHOTS_INTRAPLUS.length]}
                      prevSrc={SCREENSHOTS_INTRAPLUS[(this.state.screenshotKey + SCREENSHOTS_INTRAPLUS.length - 1) % SCREENSHOTS_INTRAPLUS.length]}
                      onCloseRequest={() => this.setState({ screenshotIsOpen: -1 })}
                      onMovePrevRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + SCREENSHOTS_INTRAPLUS.length - 1) % SCREENSHOTS_INTRAPLUS.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          screenshotKey: (this.state.screenshotKey + 1) % SCREENSHOTS_INTRAPLUS.length,
                        })
                      }
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
      </div >
    );
  }
}

export default App;