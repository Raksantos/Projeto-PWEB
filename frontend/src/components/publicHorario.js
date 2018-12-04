import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class PublicHorario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            horario: null
        }
    }
    componentDidMount() {
        const id = this.props.userID;
        if (id != undefined) {
            axios.get('http://localhost:8000/users/publicHorario/' + id)
                .then(res => {
                    if (res.data.erro != 1) {
                        var resp = res.data.dados;
                        var retorno = JSON.parse(JSON.stringify(resp).split('[').join('').split(']').join(''));
                        if (retorno.dia === 1)
                            retorno.dia = "Domingo"
                        if (retorno.dia === 2)
                            retorno.dia = "Segunda"
                        if (retorno.dia === 3)
                            retorno.dia = "Terça"
                        if (retorno.dia === 4)
                            retorno.dia = "Quarta"
                        if (retorno.dia === 5)
                            retorno.dia = "Quinta"
                        if (retorno.dia === 6)
                            retorno.dia = "Sexta"
                        if (retorno.dia === 7)
                            retorno.dia = "Sábado"
                        this.setState({ horario: retorno });
                    } else
                        this.setState({ horario: null });

                }).catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        console.log(this.state.usuario)
        console.log(this.state.horario)
        return (

            <div>
                {this.state.horario ?
                    <div>
                        <h5 className="text-info">Horário de Atividade</h5>
                        <div className="row">
                            <div className="col-md-auto">
                                <h6>Dia: {this.state.horario.dia}</h6>
                                <h6>Hora de Início: {this.state.horario.hora_inicio}</h6>
                                <h6>Hora Final: {this.state.horario.hora_fim}</h6>
                            </div>
                        </div>
                    </div>
                    :
                    <span></span>
                }
            </div>
        )
    };

}