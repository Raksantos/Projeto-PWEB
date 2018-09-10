import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Perfil from './perfil';
export default class TelaLogin extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', senha: '', redirect: false, usuario:''};

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
    this.login();
    event.preventDefault();
  }

  login(){
      axios.post('http://localhost:8000/users/logar', this.state, { crossDomain: true }).then(res => {
        var resp = res.data;
        
        if(resp.erro === 0){
          this.setState({redirect: true})
          this.setState({usuario: resp.usuario});
        }
        else
          alert("ocorreu um erro inesperado");
        console.log(resp);
      })
        .catch(function (error){
          console.log(error);
        });
  }
  render() {
    if (this.state.redirect === true){
      return <Redirect to='/home'/>
      //return <Perfil user={this.state.usuario}/>
    }
    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="card m-5" style={{width: '25rem'}}>
                        <div className="card-header">Efetuar Login</div>
                        <div className="card-body">
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputEmail" className="">Email</label>
                                    <input className="form-control" type="email" name="email" id="inputEmail" placeholder="E-mail" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputSenha" className="">Senha</label>
                                    <input className="form-control" type="password" name="senha" id="inputSenha" placeholder="Senha" onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <div className="form-row justify-content-center">
                                        <button className="btn btn-sm btn-outline-primary mt-4 mb-2" type="submit">Efetuar Login</button>
                                    </div>
                                    <div className="form-row justify-content-center">
                                        <a className="btn btn-sm btn-outline-danger" href="/" >Cancelar</a>
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
