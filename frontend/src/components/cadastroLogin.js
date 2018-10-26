import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from './img/duo_simbolo.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Duo extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: false };
    }

    componentDidMount(){
        const user = cookies.get('usuario');
        if(user != undefined){
            this.setState({redirect: true});
        }
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{ pathname: '/' }} />
        }
        return (
            <div className="content-wrapper">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <h1 className="display-4 text-info">Encontre seu Duo</h1>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="mb-3">
                            <img src={logo} className="duo_logo" alt="Simbolo_duo" />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center mb-1">
                        <a href="/cadastro" className="btn btn-danger btn-sm col-3" >Cadastro</a>
                    </div>
                    <div className="row align-items-center justify-content-center mb-3">
                        <a href="/login" className="btn btn-primary btn-sm col-3">Login</a>
                    </div>
                </div>
            </div>


        );
    }


}
