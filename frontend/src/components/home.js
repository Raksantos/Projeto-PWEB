import React, { Component } from 'react';
import TelaHome from "./tela_home";

export default class Home extends Component {

  render(){
    console.log("Chegando na HOME:   "+ JSON.stringify(this.props.location.state.usuario));
    return(
      <div>

        <div className="bg-dark">
          <TelaHome usuario = {this.props.location.state.usuario}/>
        </div>
      </div>
    );
  }
}
