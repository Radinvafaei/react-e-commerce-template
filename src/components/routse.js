import React, { Component } from "react";
import { Route, Switch,HashRouter } from "react-router-dom";
import Home from "./pages/Home/home";
import Contact from "./pages/Contact/contact";
import User from "./pages/User/user";
import Basket from "./pages/Basket/basket";
import showProduct from './pages/ShwProd/shwProd';
import List from './pages/List/list'
import Landing from './pages/Landing/landing'
import NotFound from './pages/404/404';
class Routes extends Component {
    render(){
        return(
            <HashRouter>
                <section className={'container'}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/user" component={User}/>
                        <Route path="/basket" component={Basket}/>
                        <Route path="/showProduct" component={showProduct}/>
                        <Route path="/list" component={List}/>
                        <Route path="/landing" component={Landing}/>
                        <Route component={NotFound}/>
                    </Switch>
                </section>
            </HashRouter>
        )
    }
}
export default Routes;