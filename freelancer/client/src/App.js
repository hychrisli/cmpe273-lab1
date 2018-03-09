import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = (props) => (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Redux Homework</h1>
        </header>
        <section className="App-body">
          {props.children}
        </section>
      </div>
    );

export default App;
