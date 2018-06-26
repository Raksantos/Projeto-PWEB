import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component {
    render() {
        return (
            
            <div className="container">
                <div className="col-sm-6">
                    <Form action="http://localhost:8000/" method="POST">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="text-danger">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="E-mail" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="text-danger">Senha</Label>
                            <Input type="password" id="examplePassword" placeholder="Senha" />
                        </FormGroup>


                        <Button outline color="success">Login</Button>
                    </Form>
                    <Button outline color="primary" size="sm" tag={Link} to="/">Pagina Inicial</Button>
                </div>

            </div>
            
        );
    }
}
