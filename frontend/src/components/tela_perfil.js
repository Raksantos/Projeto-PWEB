import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaJogos from "./tela_jogos";
import PerfilJogos from "./perfil_jogos";
import Navbar from "./navbar";
import Horario from './horario';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class TelaPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, usuario: '' };
    }

    componentDidMount() {
        const user = cookies.get('usuario');
        if (user != undefined)
            this.setState({ usuario: user });
    }

    render() {
        var nome = this.state.usuario.nome;
        var email = this.state.usuario.email;
        var descricao = this.state.usuario.descricao;
        var usuario = this.state.usuario.id;
        var token = this.state.usuario.token;

        return (
          <div>
            <Navbar />
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card m-3 border-light" style={{ width: '50rem' }}>
                            <div className="card-header bg-dark text-light text-center">Perfil Pessoal</div>
                            <div className="card-body">
                                <div className="row">
                                    <label htmlFor="userNome">Nome: {nome} </label>
                                </div>
                                <div className="row">
                                    <label htmlFor="userEmail">Email: {email} </label>
                                </div>
                                <div className="row">
                                    <label htmlFor="userDescription">Descrição: {descricao}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="card mb-3 border-light" style={{ width: '50rem' }}>
                            <div className="card-header bg-dark text-light text-center">Perfil Jogos</div>
                            <div className="card-body">
                                <PerfilJogos />
                                <TelaJogos />

                            </div>
                            </div>
                          <div className="card mb-3 border-light" style={{ width: '50rem' }}>
                            <div className="card-header bg-dark text-light text-center">Horario Disponível
                            </div>
                            <div className="card-body">
                                <Horario />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}
