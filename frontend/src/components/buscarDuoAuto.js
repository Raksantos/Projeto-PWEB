import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class BuscarDuoAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: null,
            encontrado: false
        }
    }
    componentDidMount() {
        const user = cookies.get('usuario');
        if (user != undefined) {
            axios.get('http://localhost:8000/busca/buscaAutomatica/', user.id, { headers: { 'token': user.token } })
                .then(res => {
                    var vetor = [];
                    for (var i = 0; i < res.data.dados.length; i++) {
                        var duo = JSON.stringify(res.data.dados[i]).split('[').join('').split(']').join('');
                        var aux = JSON.parse(duo);
                        vetor.push(aux);
                    }
                    this.setState({ profiles: vetor });
                    console.log(vetor);
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {
        var p = this.state.profiles;
        return (
            <div>
                <div className="card m-3 border-dark" />
                <div className="card-header border-dark text-dark text-center">Duos Encontrados</div>
                <div className="card-body" />
                {this.state.encontrado ?
                    (p => <div key={}></div>)

                :
                    <div></div>
                }
            </div>

        )
    }
}