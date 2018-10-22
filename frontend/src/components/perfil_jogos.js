import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export default class PerfilJogos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            perfis: [],
            usuario: this.props.usuario,
            token: this.props.token
        };
    }

    componentDidMount() {
        const user = cookies.get('usuario');
        if (user != undefined) {
            this.setState({ usuario: user });
            axios.get('http://localhost:8000/users/perfisJogo/' + user.id, { headers: { 'token': user.token } })
                .then(res => {
                    var perfis = res.data.dados;
                    perfis.forEach(e => {
                        var jogoID = e.id_jogo;
                        axios.get('http://localhost:8000/users/perfilJogo/' + user.id + '/' + jogoID, { headers: { 'token': user.token } })
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
    }

    render() {
        //console.log(this.state.perfis);
        return (
            <div>
                {this.state.perfis.map(perfil =>
                    <div key={perfil.id_jogo}>
                        <h6>Jogo: {perfil.jogo}</h6>
                        <h6>Nick: {perfil.nickname}</h6>
                        <h6>Rank: {perfil.rank}</h6>
                        <h6>Funcao: {perfil.funcao}</h6>
                        <h6>Mapa favorito: {perfil.mapa}</h6>
                        <hr className="mtb-2"></hr>
                    </div>
                )}
            </div>
        )
    }
}