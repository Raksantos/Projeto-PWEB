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
import PublicHorario from './publicHorario';
const cookies = new Cookies();

export default class PerfilPublico extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false, usuario: '', perfis: [], image: img };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/perfil/' + this.props.match.params.id)
            .then(res => {
                if (res.data.erro != 1) {
                    var user = res.data.dados;
                    this.setState({ usuario: user });
                } else
                    this.setState({ usuario: null });
            })
            .then(() => {
                const user = this.state.usuario;
                if (user != null) {
                    axios.get('http://localhost:8000/users/perfisJogo/' + user.id_usuario)
                        .then(res => {
                            var perfis = res.data.dados;
                            perfis.forEach(e => {
                                var jogoID = e.id_jogo;
                                axios.get('http://localhost:8000/users/perfilJogo/' + user.id_usuario + '/' + jogoID)
                                    .then(res => {
                                        var resp = res.data.dados;
                                        var perfil = JSON.parse(JSON.stringify(resp).split('[').join('').split(']').join(''));
                                        perfil.id_jogo = jogoID;
                                        var aux = this.state.perfis;
                                        aux.push(perfil);
                                        this.setState({ perfis: aux });
                                    }).catch(err => {
                                        console.log(err);
                                    });
                            });
                        }).catch(error => {
                            console.log(error);
                        });
                }
            })
    }

    render() {
        if (this.state.usuario != null) {
            var nome = this.state.usuario.nickname;
            var email = this.state.usuario.email;
            var descricao = this.state.usuario.descricao;
        }
        return (
            <div>
                <Navbar />
                <div className="content-wrapper bg-light">
                    <div className="container-fluid p-5">
                        <div className="row justify-content-center">
                            <div className="card m-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center">
                                    <h5>Perfil Pessoal</h5>
                                </div>
                                <div className="card-body">
                                    {this.state.usuario ?
                                        <div className="row">
                                            <div className="col-md-auto">
                                                {this.state.image == img ?
                                                    <div style={{ width: '100px', height: '100px' }}>
                                                        <div className="row justify-content-md-center"><img width="50%" height="50%" className="rounded-circle" src={img} /></div>
                                                    </div>
                                                    :
                                                    <div>
                                                        <LoadingIcon />
                                                    </div>
                                                }
                                            </div>
                                            <div className="col">
                                                <div className="row"><label htmlFor="userNome">Nome: {nome}</label></div>
                                                <div className="row"><label htmlFor="userEmail">Email: {email}</label></div>
                                                <div className="row"><label htmlFor="userDescription">Descrição: {descricao}</label></div>
                                            </div>
                                            <div className="col">
                                                <PublicHorario userID={this.props.match.params.id} />
                                            </div>
                                        </div>
                                        :
                                        <span>Usuário não encontrado</span>
                                    }
                                </div>
                            </div>
                            <div className="card m-3 border-dark" style={{ width: '50rem' }}>
                                <div className="card-header bg-dark text-light text-center">
                                    <h5>Jogos</h5>
                                </div>
                                <div class="card-body">
                                    {this.state.perfis.map(perfil =>
                                        <div key={perfil.id_jogo}>
                                            <h5 className="text-info">{perfil.jogo}</h5>
                                            <div className="row">
                                                <div className="col-md-auto">
                                                    <h6>Nick: {perfil.nickname}</h6>
                                                    <h6>Rank: {perfil.rank}</h6>
                                                </div>
                                                <div className="col-md-auto">
                                                    <h6>Funcao: {perfil.funcao}</h6>
                                                    <h6>Mapa favorito: {perfil.mapa}</h6>
                                                </div>
                                            </div>
                                            <hr className="mtb-2"></hr>
                                        </div>
                                    )}
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