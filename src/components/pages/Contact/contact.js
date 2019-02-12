import React, { Component } from "react";
import axios from 'axios';
class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            message : ""
        }
    }
    componentDidMount(){
        document.title = "contact"
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    };
    onSubmit = (e) => {
        const { name , email , message } = this.state;
        e.preventDefault();
        axios.post('/' , { name , email , message })
            .then((result) => {
                console.log(result)
            })
    };
    render() {
        return (
            <form className="row" onSubmit={this.onSubmit}>
                <div className="form-group col-6">
                    <label htmlFor="name">name</label>
                    <input className="form-control" name="name" id="name" onChange={this.onChange} placeholder="name" type="text"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="email">email</label>
                    <input className="form-control" name="email" id="email" onChange={this.onChange} placeholder="email" type="email"/>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="message">message</label>
                    <textarea className="form-control" name="message" id="message" onChange={this.onChange} placeholder="message" type="text"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Contact;