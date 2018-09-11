import React, { Component } from 'react';
import TelaPerfil from "./tela_perfil";

export default class Perfil extends Component {

  render(){
    console.log("Chegando no PERFIL:   "+ JSON.stringify(this.props.location.state.usuario));
    return(
      <div>

        <div className="bg-dark">
          <TelaPerfil usuario = {this.props.location.state.usuario}/>
        </div>
      </div>
    );
  }
}
