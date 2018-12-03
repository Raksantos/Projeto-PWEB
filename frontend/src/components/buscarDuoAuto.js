import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import ResultadoBusca from './resultadoBusca';
import resultadoBuscaDuoJogos from './resultadoBuscaDuoJogos';
import resultadoBuscaDuoHorario from './resultadoBuscaDuoHorario';
import ResultadoBuscaDuoJogos from './resultadoBuscaDuoJogos';
import ResultadoBuscaDuoHorario from './resultadoBuscaDuoHorario';
const cookies = new Cookies();

export default class BuscarDuoAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            perfis: [],
            duos_horario: [],
            duos_jogos: [],
            encontrado_horario: false,
            encontrado_jogos: false,
            apertou: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if(this.state.apertou){
            this.setState({duos_horario: [], duos_jogos: []})
        }
        const user = cookies.get('usuario');
        if (user != undefined) {
            //buscando por horários
            axios.get('http://localhost:8000/busca/buscaAutomaticaHorario/' + user.id, { headers: { 'token': user.token } })
                .then(res => {
                    if (res.data.erro != 1) {
                        var dados = res.data.dados;
                        dados.forEach(e => {
                            axios.get('http://localhost:8000/users/perfil/' + e.id_usuario)
                                .then(resp => {
                                    var vetorh = this.state.duos_horario;
                                    vetorh.push(resp.data.dados);
                                    this.setState({ duos_horario: vetorh, encontrado_horario: true });
                                })
                        })
                    } else {
                        this.setState({encontrado_horario: true });
                    }
                }).catch(function (error) {
                    console.log(error);
                });

            //buscando pelos jogos
            axios.get('http://localhost:8000/users/perfisJogo/' + user.id, { headers: { 'token': user.token } })
                .then(resu => {
                    var perfis = resu.data.dados;
                    perfis.forEach(e => {
                        var jogoID = e.id_jogo;
                        axios.get('http://localhost:8000/users/perfilJogo/' + user.id + '/' + jogoID, { headers: { 'token': user.token } })
                            .then(resp => {
                                var resposta = resp.data.dados;
                                var perfil = JSON.parse(JSON.stringify(resposta).split('[').join('').split(']').join(''));
                                perfil.id_jogo = jogoID;
                                perfil.id_usuario = user.id;
                                axios.put('http://localhost:8000/busca/buscaAutomaticaJogos', perfil, { headers: { 'token': user.token } })
                                    .then(result => {
                                        if (result.data.erro != 1) {
                                            var vetor = this.state.duos_jogos;
                                            for (var i = 0; i < result.data.dados.length; i++) {
                                                var duo = JSON.stringify(result.data.dados[i]).split('[').join('').split(']').join('');
                                                var aux = JSON.parse(duo);
                                                console.log(aux);
                                                vetor.push(aux);
                                                console.log(vetor);
                                            }
                                            this.setState({ duos_jogos: vetor, encontrado_jogos: true });
                                        } else {
                                            this.setState({ encontrado_jogos: true });
                                        }
                                    }).catch(function (error) {
                                        console.log(error);
                                    });
                            }).catch(err => {
                                console.log(err);
                            });
                    });
                }).catch(error => {
                    console.log(error);
                });
            this.setState({apertou: true});
        }
    }

    render() {
        return (
            <div>
                <h6>Busca Automática</h6>
                
                <button className="btn btn-outline-primary" onClick={this.handleClick}>Confie no seu taco</button>
                
                {this.state.encontrado_horario ?
                    <ResultadoBuscaDuoHorario duos={this.state.duos_horario} />
                    :
                    <span></span>
                }
                {this.state.encontrado_jogos ?
                    <ResultadoBuscaDuoJogos duos={this.state.duos_jogos} />
                    :
                    <span></span>
                }
            </div>

        )
    }
}