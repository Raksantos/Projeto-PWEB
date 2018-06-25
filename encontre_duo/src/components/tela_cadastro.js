import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './cadastro.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Cadastro extends Component {
    render() {
        return (
            <div>
       
                <div>
                    <Form action="http://localhost:8000/" method="POST">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Insira email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Insira senha" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Select</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleText">Text Area</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup>



                        <Button color="danger">Submit</Button>
                    </Form>
                    <Button color="primary" tag={Link} to="/">Pagina inicial</Button>
                </div>

            </div>
        );
    }


}