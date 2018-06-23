import React, { Component } from 'react';
import './duo_page.css';
import img_rodrigo from './img/rodrigo_dev.png'
import img_henrique from './img/henrique_dev.png'
import img_jao from './img/jao_dev.png'
import img_pedro from './img/pedro_dev.png'
import logo from './img/duo_simbolo.png'
import Cadastro from './cadastro';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Duo extends Component {
    render() {
        return (

            <div className="duo_page">
                <div className="duo_header">
                    <p className="fonte_index">Bem vindos</p>
                   
                </div>
                <br />               
                
                <div className="duo_body">
                    <img src={logo} className="duo_logo" alt="Simbolo_duo" />
                    <br />
                    <Link to="/cadastro" className="botao_cadastro">Cadastro</Link>
                    <br />
                    <br />
                    <br />
                    <br />
                    <img src={img_rodrigo} className="icon_dev" alt="Desenvolvedor Rodrigo" />
                    <img src={img_pedro} className="icon_dev" alt="Desenvolvedor Pedro" />
                    <img src={img_jao} className="icon_dev" alt="Desenvolvedor João" />
                    <img src={img_henrique} className="icon_dev" alt="Desenvolvedor Henrique" />
                </div>

            </div>


        );
    }


}
