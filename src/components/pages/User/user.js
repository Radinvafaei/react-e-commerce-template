import React, { Component } from "react";
import axios from 'axios';
class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            user : [],
            name : '',
            lastName : '',
            address : '',
            email : '',
            phone : '',
            idCode : ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        fetch("http://localhost:8888/exampleAPI/user.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        user : result.userInfo,
                        name : result.userInfo.map(fName => (
                            fName.name
                        )),
                        lastName : result.userInfo.map(lName => (
                            lName.lastName
                        )),
                        balance : result.userInfo.map(blnc => (
                            blnc.balance
                        )),
                        address : result.userInfo.map(addrs => (
                            addrs.address
                        )),
                        email : result.userInfo.map(mail => (
                            mail.email
                        )),
                        phone : result.userInfo.map(phne => (
                            phne.phone
                        )),
                        idCode : result.userInfo.map(code => (
                            code.idCode
                        ))
                    })
                }
            )
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { name , lastName , address , email , phone , idCode } = this.state;
        axios.post('/', { name , lastName , address , email , phone , idCode })
            .then((result) => {
                console.log(result)
            });
    };
    render() {
        const {name, lastName , address, email, phone, idCode} = this.state;
        return (
            <form onSubmit={this.onSubmit} className={"row"}>
                <div className={"form-group col-12 col-sm-6"}>
                    <label htmlFor={"name"}>Name</label>
                    <input className={"form-control"} onChange={this.onChange} value={name} type="text" name={'name'} id={"name"} />
                </div>
                <div className={"form-group col-12 col-sm-6"}>
                    <label htmlFor={"lastName"}>lastName</label>
                    <input className={"form-control"} onChange={this.onChange} value={lastName} type="text" name={'lastName'} id={"lastName"} />
                </div>
                <div className={"form-group col-12 col-sm-6"}>
                    <label htmlFor={"email"}>email</label>
                    <input className={"form-control"} onChange={this.onChange} value={email} type="email" name={'email'} id={"email"} />
                </div>
                <div className={"form-group col-6 col-sm-3"}>
                    <label htmlFor={"phone"}>phone</label>
                    <input className={"form-control"} onChange={this.onChange} value={phone} type="text" name={'phone'} id={"phone"} />
                </div>
                <div className={"form-group col-6 col-sm-3"}>
                    <label htmlFor={"idCode"}>idCode</label>
                    <input className={"form-control"} onChange={this.onChange} value={idCode} type="number" name={'idCode'} id={"idCode"} />
                </div>
                <div className={"form-group col-12"}>
                    <label htmlFor={"address"}>address</label>
                    <textarea className={"form-control"} onChange={this.onChange} value={address} type="text" name={'address'} id={"address"} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}
export default User