import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './perfil.css';
import { Buttom, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Tela_login from "./tela_perfil";

export default class Perfil extends Component {
  render(){
    return(
      <div>
        <div className="bg-dark">
          <Tela_Perfil />
        </div>
      </div>;
    )
  }
}
