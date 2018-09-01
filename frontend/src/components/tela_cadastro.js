import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = { nome: '', email: '', senha: '', descricao: '', redirect: false };

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
        axios.post('http://localhost:8000/cadastrar', this.state).then(res => {
            if(res.data == 'sucesso')
                this.setState({ redirect: true });
            else
                alert("ocorreu um erro inesperado");
            console.log(res.data);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkString(str) {
        if (str.replace(/\s/g, "") == "")
            return false;
        else if (str.length > 40)
            return false;
        else
            return true;
    }

    checkSenha(str) {
        if (str.replace(/\s/g, "") == "")
            return false;
        else if (str.length > 12 || str.length < 6)
            return false;
        else
            return true;
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/login" />
        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card w-50 m-5">
                            <div class="card-header">Cadastro de Usuário</div>
                            <div className="card-body">
                                <Form method="POST" onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <FormGroup>
                                            <Label for="exampleNome" className="">Nome</Label>
                                            <Input type="text" name="nome" id="nome" placeholder="Seu nome" onChange={this.handleChange} />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group">
                                        <FormGroup>
                                            <Label for="exampleEmail" className="">Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="email@exemplo.com" onChange={this.handleChange} />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label for="examplePassword" className="">Senha</Label>
                                                    <Input type="password" name="senha" id="senha" placeholder="Senha" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label for="confirmPassword" className="">Confirmação de Senha</Label>
                                                    <Input type="password" name="confirm" id="confirm" placeholder="Confirmação" onChange="" />
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <FormGroup>
                                            <Label for="exampleText" className="">Descrição</Label>
                                            <Input type="textarea" name="text" name="descricao" id="descricao" placeholder="Escreva um pouco sobre você" onChange={this.handleChange} />
                                        </FormGroup>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-row justify-content-center mb-2">
                                            <Button outline color="primary">Cadastrar</Button>
                                        </div>
                                        <div className="form-row justify-content-center">
                                            <Button outline color="danger" size="sm" tag={Link} to="/">Pagina inicial</Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    }


}