import React , { Component } from 'react';
class Login extends Component{
    render() {
        return (
            <form action='' method='post'>
                <div className="form-group">
                    <label htmlFor="usr">User name</label>
                    <input type="text" className="form-control" id="usr" name="username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" className="form-control" id="pwd" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        )
    }
}
export default Login