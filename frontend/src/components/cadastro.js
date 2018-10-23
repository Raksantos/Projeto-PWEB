import React, { Component } from 'react';
import TelaCadastro from "./tela_cadastro";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Cadastro extends Component {
    componentDidMount(){
        const user = cookies.get('usuario');
        if(user != undefined){
            this.props.history.push('/home');
        }
    }
    
    render() {
        return (
            <div>
                <div className="bg-dark">
                    <TelaCadastro />
                </div>
            </div>
        );
    }


}