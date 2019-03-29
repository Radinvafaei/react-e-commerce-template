import React, { Component } from "react";
import { HashRouter , Link} from "react-router-dom";
import axios from 'axios';
class Basket extends Component{
    constructor(props){
        super(props);
        this.state = {
            basket : [],
            order : []
        }
    }
    componentDidMount(){
        document.title = "basket";
        axios.get("http://localhost:8888/exampleAPI/pages/basket.json")
            .then(res => res.data)
            .then((result) => {
                this.setState({
                    basket : result.basket
                })
            })
    }
    changeCount = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    };
    render() {
        const { basket } = this.state;
        return (
            <div className="container-fluid">
                <HashRouter>
                    <div className="row res-table">
                        <table className="table table-dark table-hover">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Count</th>
                                <th>Show</th>
                                <th>Image of prd</th>
                            </tr>
                            </thead>
                            <tbody>
                            {basket.map(ord => (
                                <tr key={ord.id}>
                                    <td>{ord.name}</td>
                                    <td>{ord.price}</td>
                                    <td><input value={ord.count} name={ord.name} type="number" onChange={this.changeCount}/></td>
                                    <td><Link to={{pathname : "/showProduct", hash : ord.href}}>مشاهده</Link></td>
                                    <td><img src={ord.imgUrl} alt={ord.name} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
export default Basket