import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class BuscarDuo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jogos: [],
            ranks: [],
            funcoes: [],
            duos: [],
            selecionado: false,
            jogo: '',
            usuario: '',
            rank: '',
            funcao: '',
            encontrado: false
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
        this.setState({duos: []});
        axios.put('http://localhost:8000/busca/buscarDuos', this.state, { headers: { 'token': this.state.usuario.token } })
            .then(res =>{
              var vetor = this.state.duos;
              for(var i=0; i<res.data.dados.length; i++){
                var duo = JSON.stringify(res.data.dados[i]).split('[').join('').split(']').join('');
                var aux = JSON.parse(duo);
                vetor.push(aux);
              }
                this.setState({duos: vetor, encontrado: true});
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
        else if (this.state.selecionado === true && this.state.encontrado === false) {
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
        else if (this.state.selecionado === true && this.state.encontrado === true){
          console.log(this.state.duos);
          return(<div>
            <label htmlFor="selectJogo" className="">Informe o jogo:</label>
            <select className="form-control" id="selectJogo" onChange={this.handleSelect}>
                <option defaultValue>Selecione...</option>
                {this.state.jogos.map(jogo =>
                    <option key={jogo.id} value={jogo.id}>{jogo.nome}</option>
                )}
            </select>
            <form onSubmit={this.handleSubmit}>
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
            <div className="card m-3 border-dark">
              <div className="card-header border-dark text-dark text-center">Duos Encontrados</div>
              <div className="card-body">
                  {this.state.duos.map(duo =>
                    <div key={duo.id_usuario}>
                      <p className="text-dark">{duo.nickname}</p>
                      <hr className="mtb-2"></hr>
                    </div>
                  )}
              </div>
            </div>
          </div>)
        }
    }
}
