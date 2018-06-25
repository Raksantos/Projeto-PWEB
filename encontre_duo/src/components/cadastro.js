import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cadastro.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Tela from "./tela_cadastro";


export default class Cadastro extends Component {
    render() {
        return (
            <div>
                
                <div className="cadastro_body">
                    <h1>Tela de cadastro</h1>
                    <Tela />
                </div>
            </div>
        );
    }


}