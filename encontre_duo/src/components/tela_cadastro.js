import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
            <div>
                <div className="container">
                    <div className="container-fluid">

                <div className="row">
                    <div className="card mx-auto mt-5">
                    <Form action="http://localhost:8000/" method="POST" onSubmit={this.handleSubmit} >

                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col align-self-center">
                            <Label for="exampleEmail" className="text-danger">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Insira email" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col align-self-center">
                            <Label for="examplePassword" className="text-danger">Senha</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="Insira senha" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col align-self-center">
                            <Label for="exampleSelect" className="text-danger">Jogo</Label>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>-</option>
                                <option>CS</option>
                                <option>DOTA 2</option>
                                <option>LOL</option>
                                <option>COMPANY OF HEROES</option>

                            </Input>
                        </FormGroup>


                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 col align-self-center">
                            <Label for="exampleText" className="text-danger">Descricao</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.handleChange}/>

                        </FormGroup>


                        <div className="col align-self-center">
                            <Button outline color="success">Enviar</Button>
                        </div>
                        <div className="col align-self-center">
                            <Button outline color="primary" size="sm" tag={Link} to="/">Pagina inicial</Button>
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