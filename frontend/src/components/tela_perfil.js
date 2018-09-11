
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TelaPerfil extends Component {
    
  render() {
    console.log('Chegando na TELA DE PERFIL:  ' + JSON.stringify(this.props));
    var nome = this.props.usuario.nome;
    var email = this.props.usuario.email;
    var jogos = this.props.usuario.jogos;
    var rotas = this.props.usuario.rotas;
    var descricao = this.props.usuario.descricao;
    console.log('Imprimindo na tela de perfil JOGADOR:'+ nome +' EMAIL: '+ email + ' JOGOS: ' + jogos + ' ROTAS: '+ rotas + ' DESCRIÇÃO: ' + descricao);
      //Essa função fica desativada até a função de logout estiver feita.
      /*if (this.state.redirect === true) {
          return <Redirect to="/login" />
      }*/
      return (
          <div className="content-wrapper">
              <div className="container-fluid">
                  <div className="row justify-content-center">
                      <div className="card m-5 border-light" style={{width: '50rem'}}>
                          <div className="card-header bg-dark text-light text-center">Perfil</div>
                          <div className="card-body">
                                  <div className="row">
                                      <label htmlFor="userNome">Nome: + {nome} </label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userEmail">Email: + {email} </label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userGames">Jogos: + {jogos} </label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userRoles">Rotas: + {rotas} </label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userDescription">Descrição: + {descricao}</label>
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>



      );
  }

}
