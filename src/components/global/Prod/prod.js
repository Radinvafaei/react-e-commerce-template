import React , { Component } from 'react';
import { Link } from 'react-router-dom';
class Prod extends Component {
    render(){
        const { prd } = this.props;
        return (
            <div className={"col-12 col-md-4 col-lg-3"}>
                <div className={"card bg-dark text-white"}>
                    <img
                        className={"card-img-top"}
                        src={prd.img}
                        alt={prd.name}
                    />
                    <div className={"card-body text-center"}>
                        <h4 className={"card-title text-truncate"}>
                            {prd.name}
                        </h4>
                        <p className={"card-text text-truncate"}>
                            old price : {prd.oldPrice}
                        </p>
                        <p className={"card-text text-truncate"}>
                            new price : {prd.newPrice}
                        </p>
                        <p className={"card-text text-truncate"}>
                            {prd.desc}
                        </p>
                        <p className={"card-text text-truncate"}>
                            {(prd.available ? "Available" : "Not Available")}
                        </p>
                        <Link className={"btn btn-primary"} to={{ pathname : "/showProduct", hash : prd.href}}>Show Product</Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Prod