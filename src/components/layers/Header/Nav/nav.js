import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../../../global/Modal/modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import DropDown from "./DropDown/dropdown";
import Login from "./Login/login";
import Signup from "./Signup/signup";
import axios from 'axios';
//import { InstantSearch } from "react-instantsearch-dom";
class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            nav: [],
            prodsOnBasket: 0,
            loginM :[],
            login : false,
            name : null
        };
        this.shwModal = this.shwModal.bind(this)
    }
    componentDidMount(){
        axios.get("http://localhost:8888/exampleAPI/layers/nav.json")
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        nav: result.nav,
                        prodsOnBasket: result.userInfo.map(numOfProd => (
                            numOfProd.prodOnBasket
                        )),
                        loginM: result.userInfo.map(usrInf => (
                            (usrInf.session === true) ? <NavLink className="nav-link" key="" to="/user">{usrInf.name + " " + usrInf.lastName}</NavLink> : <button className="btn btn-primary" type="button" key="" onClick={this.shwModal}>Login</button>
                        ))
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    shwModal = () => {
        this.setState({
            showModal : !this.state.showModal
        })
    };
    toggleSelected(id, key){
        let temp = this.state[key];
        temp[id].selected = !temp[id].selected;
        this.setState({
            [key]: temp
        })
    }
    render(){
        const {error, isLoaded, nav,prodsOnBasket,loginM} = this.state;
        if (error) {
            return console.error(error.message);
        } else if (!isLoaded) {
            return <div className="spinner-border text-primary"/>
        } else {
            return (
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <label className="navbar-toggler" htmlFor="toggle">&#9776;</label>
                    <input type="checkbox" id="toggle"/>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav float-left">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact us</NavLink>
                            </li>
                            {nav.map(navi => (
                                <DropDown key={navi.id} title={navi} list={navi} toggleItem={this.toggleSelected}/>
                            ))}
                            <li className="nav-item">
                                <form className="form-inline">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                                    <button className="btn btn-success" type="submit">Search</button>
                                </form>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {loginM}
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/basket">Basket<span className="badge badge-pill badge-primary">{prodsOnBasket}</span></NavLink>
                            </li>
                        </ul>
                    </div>
                    <Modal showModal={this.state.showModal} closeModal={this.shwModal}>
                        <Tabs>
                            <TabList className="nav nav-tabs nav-justified">
                                <Tab className="nav-item">
                                    <p className="nav-link">Login</p>
                                </Tab>
                                <Tab className="nav-item">
                                    <p className="nav-link">Signup</p>
                                </Tab>
                            </TabList>
                            <div className="tab-content">
                                <TabPanel className="container tab-pane active">
                                    <Login/>
                                </TabPanel>
                                <TabPanel className="container tab-pane active">
                                    <Signup/>
                                </TabPanel>
                            </div>
                        </Tabs>
                    </Modal>
                </nav>
            )
        }
    }
}
export default Nav;