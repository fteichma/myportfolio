import React from 'react';
import './App.scss';
import * as Icon from "react-feather";
import { SocialIcon } from "react-social-icons";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Hello, I'm</h2>
          <h1>Fabian Teichmann</h1>
          <div className="Description">
            <p>Frontend Web & Mobile Developer</p>
            <p>UI/UX Designer</p>
          </div>
          <div className="Social-icons">
            <SocialIcon network="facebook" url="https://www.facebook.com/fabifabfabi" bgColor="white" />
            <SocialIcon network="dribbble" url="https://dribbble.com/fteichma" bgColor="white" />
            <SocialIcon network="linkedin" url="https://www.linkedin.com/in/fabian-teichmann-aa2340131/" bgColor="white" />
          </div>
          <div className="ScrollDown">
            <p>Scroll down</p>
            <Icon.ArrowDown />
          </div>
        </header>
        <article className="App-content">

        </article>
      </div>
    );
  }
}

export default App;
