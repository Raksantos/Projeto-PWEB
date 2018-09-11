import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default class TelaJogos extends Component {

  render (){
    var jogos = this.props.nome;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="card m-5 border-light" style={{width: '50rem'}}>
                    <div className="card-header bg-dark text-light text-center">Jogos</div>
                    <div className="card-body">
                        <div className="row">
                            <label htmlFor="inputJogo" className="">Informe o seu jogo:/label>
                            <input className="form-control" type="text" name="jogo" id="inputJogo" placeholder="Informe seu Jogo" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}
