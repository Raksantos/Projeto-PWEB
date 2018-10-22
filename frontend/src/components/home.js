import React, { Component } from 'react';
import TelaHome from "./tela_home";

export default class Home extends Component {
  render(){
    return(
      <div>
        <div className="bg-dark">
          <TelaHome />
        </div>
      </div>
    );
  }
}
