import React, { Component } from 'react';
import TelaPerfil from "./tela_perfil";
import Cookies from 'universal-cookie';
import Navbar from "./navbar";
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
        <Navbar />
        <div className="bg-dark">
          <TelaPerfil />
        </div>
      </div>
    );
  }
}
