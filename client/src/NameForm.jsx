import React from 'react';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '',
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleNewUser(event) {
        event.preventDefault();
        axios.post('/createUser', {email: this.state.email, password: this.state.password})
        .then((res) => {
            console.log(res, "this is user res");
        })   
    }

    handleExistingUser(event) {
        event.preventDefault();
        axios.post('/loginUser', {email: this.state.email, password: this.state.password})
        .then((res) => {
            console.log(res, "this is user res");
        })  
    } 

        handleTweets(event) {
            event.preventDefault();
            axios.post('/tweetme')
            .then((res) => {
                console.log(res, "this is user res");
            })   
    }

    /*
    saveUser = async () => {
        const response = await fetch('/users');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

<form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                    <input type="submit" value="Submit" />
            </form>

    */

    render() {
        return (
            <div>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
                </label>
                <button onClick={this.handleExistingUser}> Login </button>
                <button onClick={this.handleNewUser}> Create Account </button>

                <button onClick={this.handleTweets}> Create tweets </button>
            </div>
        );
    }
}

export default NameForm;