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
        axios.get('http://localhost:8000/users/perfilJogo/'+user, {headers:{'token':token}})
            .then(res => {
                var perfis = res.data.dados;
                perfis.forEach(function(e) {
                    axios.get('http://localhost:8000/jogos/getJogo/'+e['id_jogo'], {headers:{'token':token}})
                        .then(res_jogo=>{
                            e['jogo']=res_jogo.data.dados.nome;
                        }).catch(err => console.log(err));
                    axios.get('http://localhost:8000/jogos/getRank/'+e['id_rank'], {headers:{'token':token}})
                        .then(res_rank=>{
                            e['rank']=res_rank.data.dados.nome;
                        }).catch(err => console.log(err));
                    axios.get('http://localhost:8000/jogos/getFuncao/'+e['id_funcao'], {headers:{'token':token}})
                        .then(res_func=>{
                            e['funcao']=res_func.data.dados.nome;
                        }).catch(err => console.log(err));
                    axios.get('http://localhost:8000/jogos/getMapa/'+e['id_mapa'], {headers:{'token':token}})
                        .then(res_map=>{
                            if(res_map.data.dados!=='Nenhum dado encontrado')
                                e['mapa']=res_map.data.dados.nome;
                            else
                                e['mapa']="-";
                        }).catch(err => console.log(err));
                });
                this.setState({perfis: perfis});
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this.state.perfis);
        return(
            <div>
                {this.state.perfis.map(perfil =>
                    <div key={perfil.id_jogo}>
                        Jogo: {perfil.jogo}
                        Nick: {perfil.nickname}
                        Rank: {perfil.rank}
                        Funcao: {perfil.funcao}
                    </div>
                )}
            </div>
        )
    }
}