import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class TelaJogar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jogos: [],
            ranks: [],
            funcoes: [],
            selecionado: false,
            jogo: '',
            usuario: '',
            nickname: '',
            rank: '',
            funcao: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = cookies.get('usuario');
        if (user != undefined) {
            this.setState({ usuario: user });
            axios.get('http://localhost:8000/jogos/listarJogos', { headers: { 'token': user.token } })
                .then(res => {
                    const jogos = res.data.dados;
                    this.setState({ jogos: jogos });
                    //console.log(jogos);
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        axios.put('http://localhost:8000/busca/buscarDuos', this.state, { headers: { 'token': this.state.usuario.token } })
            .then(res =>{
                console.log(res.data.dados);
            }).catch((err)=>console.log(err));
        event.preventDefault();
    }

    handleSelect(event) {
        if (event.target.value !== "Selecione...") {
            
            var id = event.target.value;
            this.setState({ jogo: id });

            axios.get('http://localhost:8000/jogos/listarRanks/' + id, { headers: { 'token': this.state.usuario.token } })
                .then(res => {
                    const ranks = res.data.dados;
                    this.setState({ ranks: ranks });
                    //console.log(ranks);
                }).catch(function (error) {
                    //console.log(error);
                });
            axios.get('http://localhost:8000/jogos/listarFuncoes/' + id, { headers: { 'token': this.state.usuario.token } })
                .then(res => {
                    const funcoes = res.data.dados;
                    this.setState({ funcoes: funcoes });
                    //console.log(funcoes);
                }).catch(function (error) {
                    //console.log(error);
                });
            
            this.setState({ selecionado: true });
        } else {
            window.location.reload();
        }
    }

    render() {
        if (this.state.selecionado === false) {
            return (
                <div>
                    <label htmlFor="selectJogo" className="">Informe o jogo:</label>
                    <select className="form-control" id="selectJogo" onChange={this.handleSelect}>
                        <option defaultValue hidden='true'>Selecione...</option>
                        {this.state.jogos.map(jogo =>
                            <option key={jogo.id} value={jogo.id}>{jogo.nome}</option>
                        )}
                    </select>
                </div>
            );
        }
        else if (this.state.selecionado === true) {
            return (
                <div>
                    <label htmlFor="selectJogo" className="">Informe o jogo:</label>
                    <select className="form-control" id="selectJogo" onChange={this.handleSelect}>
                        <option defaultValue>Selecione...</option>
                        {this.state.jogos.map(jogo =>
                            <option key={jogo.id} value={jogo.id}>{jogo.nome}</option>
                        )}
                    </select>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="inputNick" className="">Nickname</label>
                        <input className="form-control" id="inputNick" name="nickname" type="text" minLength="2" maxLength="30" onChange={this.handleChange} />

                        <label htmlFor="selectRank" className="">Rank</label>
                        <select className="form-control" id="selectRank" name="rank" onChange={this.handleChange}>
                            <option defaultValue>Selecione...</option>
                            {this.state.ranks.map(rank =>
                                <option key={rank.id} value={rank.id}>{rank.nome}</option>
                            )}
                        </select>

                        <label htmlFor="selectFuncao" className="">Função</label>
                        <select className="form-control" id="selectFuncao" name="funcao" onChange={this.handleChange}>
                            <option defaultValue>Selecione...</option>
                            {this.state.funcoes.map(funcao =>
                                <option key={funcao.id} value={funcao.id}>{funcao.nome}</option>
                            )}
                        </select>

                        <button type="submit" className="btn mt-3 btn-block btn-outline-primary">Buscar</button>
                    </form>
                </div>
            );
        }
    }
}
