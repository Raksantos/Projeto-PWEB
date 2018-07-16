import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="card w-25 mt-5">
                            <div class="card-header">Efetuar Login</div>
                            <div className="card-body">
                                <Form action="http://localhost:8000/" method="POST">
                                    <FormGroup className="form-group">
                                        <Label for="exampleEmail" className="">Email</Label>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="E-mail" />
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Label for="examplePassword" className="">Senha</Label>
                                        <Input type="password" id="examplePassword" placeholder="Senha" />
                                    </FormGroup>

                                    <div className="form-group">
                                        <div className="form-row justify-content-center mb-2">
                                            <Button outline color="primary">Login</Button>
                                        </div>
                                        <div className="form-row justify-content-center">
                                            <Button outline color="danger" size="sm" tag={Link} to="/">Pagina Inicial</Button>
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
