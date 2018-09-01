import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', senha: '', redirect: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    if (!this.checkSenha(this.state.senha))
      alert('Senha incorreta!');
    else if(!this.checkString(this.state.email))
      alert('e-mail informado não cadastrado');
  }

  login(){
      axios.post('http://localhost:8000/logar', this.state).then(res => {
        if(res.data == 'sucesso')
          this.setState({redirect: true});
        else
          alert("ocorreu um erro inesperado");
        console.log(res.data);
      })
        .catch(function (error){
          console.log(error);
        });
  }

  checkString(str){
    if (str.replace(/\s/g, "") == "")
            return false;
  }

  checkSenha(str){
    if (str.replace(/\s/g, "") == "")
            return false;
    else if (str.length > 12 || str.length < 6)
            return false;
        else
            return true;
  }

  render() {
    if (this.state.redirect === true){
      return <Redirect to="/perfil" />
    }
    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="card w-25 mt-5">
                        <div class="card-header">Efetuar Login</div>
                        <div className="card-body">
                            <Form method="POST" onSubmit={this.handleSubmit}>
                                <FormGroup className="form-group">
                                    <Label for="exampleEmail" className="">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="E-mail" onChange={this.handlChange}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Label for="examplePassword" className="">Senha</Label>
                                    <Input type="password" id="examplePassword" placeholder="Senha" onChange={this.handleChange}/>
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
