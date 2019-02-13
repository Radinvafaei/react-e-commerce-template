import React from 'react';
import { NavLink , HashRouter } from 'react-router-dom';
function Footer() {
    return(
        <HashRouter>
            <footer>
                <ul className="container">
                    <li>
                        <NavLink to={'/contact'}>contact us</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/about'}>about</NavLink>
                    </li>
                </ul>
            </footer>
        </HashRouter>
    )

}
export default Footer