import React, { Component } from 'react';
import TelaPerfil from "./tela_perfil";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Perfil extends Component {
  
  componentDidMount() {
    const user = cookies.get('usuario');
    if(user == undefined)
      this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <div className="bg-dark">
          <TelaPerfil />
        </div>
      </div>
    );
  }
}
