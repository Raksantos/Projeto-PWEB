import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Duo from	'./components/duo_page';
import Cadastro from './components/cadastro';
import Login from './components/login';
import Perfil from './components/perfil';
import Home from './components/home';
import Logout from './components/logout';

export default class Rotas extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Duo} />
                    <Route path="/cadastro" component={Cadastro} />
                    <Route path="/login" component={Login} />
                    <Route path="/perfil" component={Perfil} />
                    <Route path="/home" component={Home} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </Router>
            );
    }


}
