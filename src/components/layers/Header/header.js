import React , { Component } from 'react';
import Event from './Event/event';
import Nav from './Nav/nav';
import { HashRouter } from 'react-router-dom'
class Header extends Component{
    render(){
        return(
            <HashRouter>
                <header>
                    <Event/>
                    <Nav/>
                </header>
            </HashRouter>
        )
    }
}
export default Header