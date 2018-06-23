import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cadastro.css';

export default class Cadastro extends Component {
    render() {
        return (
            <div>
                <h1>Tela de cadastro</h1>
                <div>
                    <Link to="/">Pagina inicial</Link>
                </div>
                
            </div>
            );
    }


}