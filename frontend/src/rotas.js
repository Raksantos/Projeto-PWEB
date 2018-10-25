import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cadastro from './components/cadastro';
import Duo from './components/cadastroLogin';
import Home from './components/home';
import Jogar from './components/jogar';
import Login from './components/login';
import Logout from './components/logout';
import Perfil from './components/perfil';

export default class Rotas extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/perfil" component={Perfil} />
                    <Route exact path="/duo" component={Duo} />
                    <Route exact path="/jogar" component={Jogar} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </Router>
            );
    }


}
