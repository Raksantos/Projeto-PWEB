import React, { Component } from 'react';
import './duo_page.css';
import img_rodrigo from './img/rodrigo_dev.png';
import img_henrique from './img/henrique_dev.png';
import img_jao from './img/jao_dev.png';
import img_pedro from './img/pedro_dev.png';
import logo from './img/duo_simbolo.png';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class Duo extends Component {
    render() {
        return (

            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <p className="fonte_index">Bem vindos</p>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="mb-3">
                            <img src={logo} className="duo_logo" alt="Simbolo_duo" />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center mb-1">
                        <Button color="danger" tag={Link} to="/cadastro" size="sm" className="col-3" >Cadastro</Button>
                    </div>
                    <div className="row align-items-center justify-content-center mb-3">

                        <Button color="primary" tag={Link} to="/login" size="sm" className="col-3">Login</Button>

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
