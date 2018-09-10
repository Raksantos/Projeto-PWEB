import React, { Component } from 'react';
import TelaPerfil from "./tela_perfil";

export default class Perfil extends Component {

  render(){
    return(
      <div>
        <div className="bg-dark">
          <TelaPerfil usuario = {this.props.usuario}/>
        </div>
      </div>
    );
  }
}
