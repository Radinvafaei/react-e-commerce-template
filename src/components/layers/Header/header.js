import React from 'react';
import Event from './Event/event';
import Nav from './Nav/nav';
import { HashRouter } from 'react-router-dom'
function Header() {
    return(
        <HashRouter>
            <header>
                <Event/>
                <Nav/>
            </header>
        </HashRouter>
    );
}
export default Header