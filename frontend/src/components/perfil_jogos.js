import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class PerfilJogos extends Component {
    constructor(props){
        super(props);

        this.state = {
            perfis: [],
            usuario: this.props.usuario,
            token: this.props.token
        };
    }

    componentDidMount(){
        var user = this.state.usuario;
        var token = this.state.token;
        axios.get('http://localhost:8000/users/perfisJogo/'+user, {headers:{'token':token}})
            .then(res => {
                var perfis = res.data.dados;
                perfis.forEach(e => {
                    var jogoID = e.id_jogo;
                    var userID = e.id_usuario;
                    axios.get('http://localhost:8000/users/perfilJogo/'+userID+'/'+jogoID, {headers:{'token':token}})
                        .then(res => {
                            var resp = res.data.dados;
                            var perfil = JSON.parse(JSON.stringify(resp).split('[').join('').split(']').join(''));
                            perfil.id_jogo = jogoID;
                            var aux = this.state.perfis;
                            aux.push(perfil);
                            this.setState({perfis: aux});
                        }).catch(err => {
                            console.log(err);
                        });
                });
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.perfis);
        return(
            <div>
                {this.state.perfis.map(perfil =>
                    <div key={perfil.id_jogo}>
                        <h6>Jogo: {perfil.jogo}</h6>
                        <h6>Nick: {perfil.nickname}</h6>
                        <h6>Rank: {perfil.rank}</h6>
                        <h6>Funcao: {perfil.funcao}</h6>
                        <h6>Mapa favorito: {perfil.mapa}</h6>
                        <hr class="mtb-2"></hr>
                    </div>
                )}
            </div>
        )
    }
}