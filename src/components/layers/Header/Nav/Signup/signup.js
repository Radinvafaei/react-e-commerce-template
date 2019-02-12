import React , { Component } from 'react';
class Signup extends Component{
    render() {
        return (
            <form action='' method='post'>
                <div className="form-group">
                    <label htmlFor="fm">Name</label>
                    <input type="text" className="form-control" id='fm'/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone number</label>
                    <input type="number" className="form-control" id='phone'/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id='email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd1">Password</label>
                    <input type="password" className="form-control" id='pwd1'/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd2">Repeat Password</label>
                    <input type="password" className="form-control" id='pwd2'/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}
export default Signup