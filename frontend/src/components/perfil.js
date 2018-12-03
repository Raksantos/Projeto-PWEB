import React, { Component } from 'react';
import './cadastroLogin.css';
import './perfil.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormCadastrarJogo from "./formCadastrarJogo";
import PerfilJogos from "./perfil_jogos";
import Navbar from "./navbar";
import Footer from "./footer";
import Horario from './horario';
import Cookies from 'universal-cookie';
import img from './img/arararagi.jpg';
import img2 from './img/PerfilBusto.ico';
import LoadingIcon from './loadingIcon';
import ListarHorario from './listarHorario';
const cookies = new Cookies();

export default class TelaPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, usuario: '', image: img };
    }

    componentDidMount() {
        const user = cookies.get('usuario');
        if (user == undefined)
            this.props.history.push('/');
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
                <div className="content-wrapper bg-light">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="card m-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center">
                                    <h5>Perfil Pessoal</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row"><label htmlFor="userNome">Nome: {nome}</label></div>
                                            <div className="row"><label htmlFor="userEmail">Email: {email}</label></div>
                                            <div className="row"><label htmlFor="userDescription">Descrição: {descricao}</label></div>
                                        </div>
                                        <div className="col">
                                        <ListarHorario />
                                        </div>
                                        <div className="col-md-auto">
                                            {this.state.image == img ?
                                                <div style={{width: '100px', height: '100px'}}>
                                                    <div className="row justify-content-md-center"><img width="50%" height="50%" className="rounded-circle" src={img} /></div>
                                                    <div className="row justify-content-md-center"><a className="btn btn-dark btn-sm text-danger" type="button">Upload Image</a></div>
                                                </div>

                                                :
                                                <div>
                                                    <LoadingIcon />
                                                    <a className="btn btn-dark btn-sm text-danger" type="button">Upload Image</a>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center"><h5>Jogos</h5></div>
                                <div className="card-body">
                                    <PerfilJogos />
                                </div>
                            </div>
                            <div className="card mb-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center"><h5>Configurar Perfil em um Jogo</h5></div>
                                <div className="card-body">
                                    <FormCadastrarJogo />
                                </div>
                            </div>
                            <div className="card mb-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center">
                                    <h5>Horário Favorito</h5>
                                </div>
                                <div className="card-body">
                                    <Horario />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}
