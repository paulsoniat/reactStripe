import React from 'react';
import axios from 'axios';
import NameForm from './NameForm';
import './App.css'

class CreateUser extends React.component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div>
            
                <NameForm className="NameForm"></NameForm>

            </div>
        );
    }
}

export default CreateUser