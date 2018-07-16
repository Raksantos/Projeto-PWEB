import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Buttom, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Tela_login from "./tela_login";

export default class Login extends Component {
    render() {
        return (
            <div>

                <div className="bg-dark">
                    <Tela_login />
                </div>
            </div>
        );
    }
} 
