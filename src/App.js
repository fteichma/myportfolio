import React from 'react';
import './App.scss';
import * as Icon from "react-feather";
import { SocialIcon } from "react-social-icons";
import Chart from "react-apexcharts";
import { CalendarTodayRounded } from '@material-ui/icons';
import "./Portfolio.scss";
import * as jribbble from 'jribbble';
import dribbble from './dribbble.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: 0,
      width: 0,
      height: 0,
      mainColor: localStorage.getItem("mainColor") ? localStorage.getItem("mainColor") : "#1B6758",
      shots: [],
      dribbbleShotKey: null,
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
  getDribbbleShots = () => {
    const dribbbleshots = [];
    jribbble.shots({ token: "1d4677141b29098b931d5390f027a4cc8ea1d2679817092400d9a17ce6fa2294" },
      (shots) => {
        shots.map((item, i) => {
          dribbbleshots.push(item)
          return item;
        })
      });
    this.setState({ shots: dribbbleshots });
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
          <h2 className="animated fadeInDown delay-200ms">Hello, I'm</h2>
          <h1 className="animated fadeInDown delay-400ms">Fabian Teichmann</h1>
          <div className="Description animated fadeIn delay-500ms">
            <p>Front-end Web & Mobile Developer</p>
            <p>UI/UX Designer</p>
          </div>
          <div className="Social-icons animated fadeInUp delay-1s">
            <SocialIcon id="facebook" network="facebook" url="https://www.facebook.com/fabifabfabi" />
            <SocialIcon id="dribbble" network="dribbble" url="https://dribbble.com/fteichma" />
            <SocialIcon id="linkedin" network="linkedin" url="https://www.linkedin.com/in/fabian-teichmann-aa2340131/" />
          </div>
          {this.state.scrollY <= 60 && (
            <div className="ScrollDown" onClick={() => window.scrollTo(0, this.state.height)}>
              <Icon.ArrowDown />
            </div>
          )}
        </header>
        <article className="App-content" id="skills">
          <div>
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
            <div ref={this.dribbbleShots} className="row animated bounceInUp fast">
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
                    <div
                      key={key}
                      onMouseOver={() => this.setState({ dribbbleShotKey: key })}
                      onMouseOut={() => this.setState({ dribbbleShotKey: null })}
                      className={"col-lg-4 col-md-6 shot"}
                      style={{ backgroundImage: "url(" + shot.images.two_x + ")" }}>
                      <div className="description">
                        <p>{shot.title}</p>
                        <p> <CalendarTodayRounded /> {_date}</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </article>
      </div >
    );
  }
}

export default App;