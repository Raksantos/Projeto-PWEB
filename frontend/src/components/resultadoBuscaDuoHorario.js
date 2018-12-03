import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class ResultadoBuscaDuoHorario extends Component{

    render(){
        return(
            <div className="card m-3 border-dark">
                <div className="card-header border-dark text-dark text-center">Duos com horário compatível</div>
                <div className="card-body">
                    {this.props.duos[0] ?
                        <div>
                            {this.props.duos.map(duo =>
                                <div key={duo.id_usuario}>
                                    {duo.id_usuario ?
                                        <div>
                                            <p className="text-dark">{duo.nickname}</p>
                                            <hr className="mtb-2"></hr>
                                        </div>
                                    :
                                        <span></span>
                                    }
                                    
                                </div>
                            )}
                        </div>
                    :
                        <span>Nenhum duo encontrado :(</span>
                    }
                    
                </div>
            </div>
        )
    }
}