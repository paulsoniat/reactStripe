import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameForm from './NameForm';

class App extends Component {
  state = {
    response: ''
  };

  //add a remember me here that sets the status of isloggedin through cookies

//check islogged in on component will mount?

//if so send them to homepage

//if yes, send them to qr scan


  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PeepADD</h1>
        </header>
        <NameForm className="NameForm"></NameForm>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
