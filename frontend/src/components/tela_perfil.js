
import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TelaPerfil extends Component {

  render() {

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
                                      <label htmlFor="userNome">Nome:</label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userEmail">Email:</label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userGames">Jogos:</label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userRoles">Rotas:</label>
                                  </div>
                                  <div className="row">
                                      <label htmlFor="userDescription">Descrição:</label>
                                  </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>



      );
  }

}
