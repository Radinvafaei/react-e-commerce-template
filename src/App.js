import React, { Component , StrictMode } from 'react';
import Routes from './components/routse';
import Footer from './components/layers/Footer/footer';
import Header from './components/layers/Header/header';
class App extends Component {
    render() {
        return (
            <StrictMode>
                <div>
                    <Header/>
                    <Routes/>
                    <Footer/>
                </div>
            </StrictMode>
        );
    }
}

export default App;