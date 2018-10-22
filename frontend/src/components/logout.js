import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Redirect from 'react-router-dom/Redirect';
const cookies = new Cookies();

class Logout extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        cookies.remove("usuario");
        this.props.history.push('/');
    }

    render(){
        return(
            <input>
                {this.logout()}
            </input>
        );
    }
}

export default Logout