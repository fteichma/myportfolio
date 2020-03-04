import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Hello, I'm</h2>
          <h1>Fabian Teichmann</h1>
          <div className="Description">
            <p>I’m a <strong>frontend web & mobile developer.</strong></p>
            <p>I am also a <strong>true design lover.</strong></p>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
        </a>
        </header>
      </div>
    );
  }
}

export default App;
