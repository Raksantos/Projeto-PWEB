import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default class Cadastro extends Component {
    render() {
        return (
            <div className="container">
       
                <div className="col-sm-6">
                    <Form action="http://localhost:8000/" method="POST">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="text-danger">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Insira email" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="text-danger">Senha</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Insira senha" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleSelect" className="text-danger">Jogo</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>-</option>
                                <option>CS</option>
                                <option>DOTA 2</option>
                                <option>LOL</option>
                                <option>COMPANY OF HEROES</option>
                                
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleText" className="text-danger">Descricao</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup>



                        <Button outline color="success">Enviar</Button>
                    </Form>
                    <Button outline color="primary" size="sm" tag={Link} to="/">Pagina inicial</Button>
                </div>

            </div>
        );
    }


}