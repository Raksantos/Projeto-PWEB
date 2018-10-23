import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Horario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dia: '',
            horarioInicial: '',
            horarioFinal: '',
            usuario: '',
            token: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        const user = cookies.get('usuario');
        this.setState({usuario: user.id})
        this.setState({token: user.token})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        console.log(this.state)
        this.enviar();
        event.preventDefault();
    }

    enviar() {
        alert("entrou no enviar")
        axios.put('http://localhost:8000/users/atualizarHorario', this.state, { headers: { 'token': this.props.token } })
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err));

    }
    render() {
        return (

            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="row justify-content-center">
                        <select className="form-control" name="dia" onChange={this.handleChange}>
                            <option defaultValue>Selecione...</option>
                            <option value='1'>Domingo</option>
                            <option value='2'>Segunda</option>
                            <option value='3'>Terça</option>
                            <option value='4'>Quarta</option>
                            <option value='5'>Quinta</option>
                            <option value='6'>Sexta</option>
                            <option value='7'>Sábado</option>
                        </select>
                    </div>
                    <div className="row justify-content-center">
                        <label className="">Horario de Inicio</label>
                        <input className="form-control" type="time" name="horarioInicial" placeholder="Horario de Inicio" onChange={this.handleChange} />
                    </div>
                    <div className="row justify-content-center">
                        <label className="">Horario Final</label>
                        <input className="form-control" type="time" name="horarioFinal" placeholder="Horario Final" onChange={this.handleChange} />
                    </div>
                    <div className="row justify-content-center">
                        <button type="submit" className="btn mt-3 col-2 btn-block btn-outline-primary">Salvar</button>
                    </div>
                </div>
            </form>
        );

    }
}

