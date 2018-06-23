import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Duo from	'./components/duo_page';
import Cadastro from './components/cadastro';


export default class Rotas extends Component {
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Duo} />
                    <Route path="/cadastro" component={Cadastro} />
                </div>
            </Router>            
            );
    }
    

}