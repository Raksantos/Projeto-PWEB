import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

export default class TelaLogin extends Component {
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
      axios.post('http://localhost:8000/users/logar', this.state).then(res => {
        var resp = res.data;
        if(resp.erro === 0)
          this.setState({redirect: true});
        else
          alert("ocorreu um erro inesperado");
        console.log(resp);
      })
        .catch(function (error){
          console.log(error);
        });
  }

  checkString(str){
    if (str.replace(/\s/g, "") === "")
            return false;
  }

  checkSenha(str){
    if (str.replace(/\s/g, "") === "")
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
                                    <input className="form-control" type="password" id="inputSenha" placeholder="Senha" onChange={this.handleChange}/>
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
