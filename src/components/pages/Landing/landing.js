import React , { Component } from 'react';
class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        document.title = ""
    }
    render(){
        return (
            <div>landing</div>
        )
    }
}
export default Landing