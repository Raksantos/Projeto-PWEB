import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Buttom, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Tela_login from "./tela_login";

export default class Login extends Component {
    render() {
        return (
            <div>

                <div className="login_body">
                    <p className="text-center text-danger">Tela Login</p>
                    <Tela_login />
                </div>
            </div>
        );
    }
} 
