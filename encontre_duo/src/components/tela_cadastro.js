import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (

            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card w-50 m-5">
                            <div class="card-header">Cadastro de Usuário</div>
                            <div className="card-body">
                                <Form action="http://localhost:8000/" method="POST" onSubmit={this.handleSubmit} >
                                    <div className="form-group">
                                        <FormGroup>
                                            <Label for="exampleEmail" className="">Email</Label>
                                            <Input type="email" name="email" id="exampleEmail" placeholder="email@exemplo.com" onChange={this.handleChange} />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label for="examplePassword" className="">Senha</Label>
                                                    <Input type="password" name="password" id="examplePassword" placeholder="Senha" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <FormGroup>
                                                    <Label for="confirmPassword" className="">Confirmação de Senha</Label>
                                                    <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="Confirmação" onChange={this.handleChange} />
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <FormGroup>
                                            <Label for="exampleText" className="">Descrição</Label>
                                            <Input type="textarea" name="text" id="exampleText" placeholder="Escreva um pouco sobre você" onChange={this.handleChange} />
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