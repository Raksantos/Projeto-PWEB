import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


export default class TelaCadastro extends Component {
    constructor(props) {
        super(props);
        this.state = { nome: '', email: '', senha: '', confirmacao: '', descricao: '', redirect: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        if (!this.checkSenha(this.state.senha))
            alert('insira uma senha válida (6 a 12 dígitos, sem espaços)');
        else if(!this.checkConfirmacao(this.state.confirmacao))
            alert('senha e confirmação devem ser iguais!');
        else if (!this.checkString(this.state.email))
            alert('insira um email válido (no máx. 40 caracteres)');
        else if (!this.checkString(this.state.nome))
            alert('insira um nome válido (no máx. 40 caracteres)');
        else if (this.state.descricao.length > 500)
            alert('descrição longa demais');
        else
            this.cadastrar();
        event.preventDefault();
    }

    cadastrar() {
        // trata os dados do state (remove atributos que não serão salvos)
        var json = this.state;
        delete json.confirmacao;
        delete json.redirect;
        // envia os dados para o backend
        axios.post('http://localhost:8000/users/cadastrar', json).then(res => {
            var resp = res.data;
            if(resp.erro === 0)
                this.setState({ redirect: true });
            else
                alert("ocorreu um erro inesperado");
            console.log(resp);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkString(str) {
        if (str.replace(/\s/g, "") === "")
            return false;
        else if (str.length > 40)
            return false;
        else
            return true;
    }

    checkSenha(str) {
        if (str.replace(/\s/g, "") === "")
            return false;
        else if (str.length > 12 || str.length < 6)
            return false;
        else
            return true;
    }

    checkConfirmacao(str) {
        if (str === this.state.senha)
            return true;
        else
            return false;
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/login" />
        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card m-5" style={{width: '50rem'}}>
                            <div className="card-header">Cadastro de Usuário</div>
                            <div className="card-body">
                                <form method="POST" onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <label htmlFor="inputNome" className="">Nome</label>
                                        <input className="form-control" type="text" name="nome" id="inputNome" placeholder="Seu nome" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail" className="">Email</label>
                                        <input className="form-control" type="email" name="email" id="inputEmail" placeholder="email@exemplo.com" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="examplePassword">Senha</label>
                                                <input className="form-control" type="password" name="senha" id="senha" placeholder="Senha" onChange={this.handleChange} />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="confirmacaoSenha">Confirmação de Senha</label>
                                                <input className="form-control" type="password" name="confirmacao" id="confirmacaoSenha" placeholder="Repita a senha" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputDescricao">Descrição</label>
                                        <textarea className="form-control" rows="2" name="descricao" id="inputDescricao" placeholder="Escreva um pouco sobre você" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row justify-content-center mt-4 mb-2">
                                            <button className="btn btn-outline-primary btn-sm" type="submit">Cadastrar</button>
                                        </div>
                                        <div className="form-row justify-content-center">
                                            <a className="btn btn-outline-danger btn-sm" href="/">Cancelar</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    }


}