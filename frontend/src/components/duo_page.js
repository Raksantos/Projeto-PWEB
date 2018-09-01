import React, { Component } from 'react';
import './duo_page.css';
import img_rodrigo from './img/rodrigo_dev.png';
import img_henrique from './img/henrique_dev.png';
import img_jao from './img/jao_dev.png';
import img_pedro from './img/pedro_dev.png';
import logo from './img/duo_simbolo.png';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class Duo extends Component {
    render() {
        return (

            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <h1 className="display-4 text-info">Encontre seu Duo</h1>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="mb-3">
                            <img src={logo} className="duo_logo" alt="Simbolo_duo" />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center mb-1">
                        <a href="/cadastro" className="btn btn-danger btn-sm col-3" >Cadastro</a>
                    </div>
                    <div className="row align-items-center justify-content-center mb-3">
                        <a href="/login" className="btn btn-primary btn-sm col-3">Login</a>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <img src={img_rodrigo} className="icon_dev rounded-circle" alt="Desenvolvedor Rodrigo" />
                        <img src={img_pedro} className="icon_dev rounded-circle" alt="Desenvolvedor Pedro" />
                        <img src={img_jao} className="icon_dev rounded-circle" alt="Desenvolvedor Joao" />
                        <img src={img_henrique} className="icon_dev rounded-circle" alt="Desenvolvedor Henrique" />
                    </div>
                </div>
            </div>


        );
    }


}
