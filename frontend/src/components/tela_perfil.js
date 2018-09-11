
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaJogos from "./tela_jogos";
import PerfilJogos from "./perfil_jogos";

export default class TelaPerfil extends Component {

    render() {
        var nome = this.props.usuario.nome;
        var email = this.props.usuario.email;
        var jogos = this.props.usuario.jogos;
        var rotas = this.props.usuario.rotas;
        var descricao = this.props.usuario.descricao;
        var usuario = this.props.usuario.id;
        var token = this.props.usuario.token;
        //Essa função fica desativada até a função de logout estiver feita.
        /*if (this.state.redirect === true) {
            return <Redirect to="/login" />
        }*/
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card m-5 border-light" style={{ width: '50rem' }}>
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
                        <div className="card mb-5 border-light" style={{ width: '50rem' }}>
                            <div className="card-header bg-dark text-light text-center">Perfil Jogos</div>
                            <div className="card-body">
                                <PerfilJogos token={token} usuario={usuario} />
                                <TelaJogos token={token} usuario={usuario} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
