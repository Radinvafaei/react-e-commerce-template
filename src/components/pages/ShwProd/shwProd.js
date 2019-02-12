import React, { Component } from 'react';
import Prod from '../../global/Prod/prod';
import Magnifier from "react-magnifier";
import axios from 'axios';
class showProduct extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiUrl : "",
            prodName:"",
            isAvailable : false,
            price :"",
            description : "",
            photos : "",
            colors : [],
            sizes : [],
            rates : 0,
            comments : [],
            suggestion : [],
            color:null,
            size: null,
            prodId : null,
            count : 1
        };
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }
    componentDidMount() {
        this.connection(this.state.apiUrl)
    }
    static getDerivedStateFromProps(props){
        return{
            apiUrl : `${props.location.hash}.json`.replace(/#/g,'')
        };
    }
    shouldComponentUpdate(newProps, newState) {
        const apiUrl = newState.apiUrl;
        if (this.state.apiUrl !== newState.apiUrl){
            this.connection(apiUrl)
        }
        return true;
    }
    handleSizeChange = (selectedSize) => {
        let availableColors = this.state.colors;
        this.setState({
            colors: availableColors,
            size: selectedSize
        });

        if (availableColors.indexOf(this.state.color) === -1) {
            this.setState({ color: availableColors[0] });
        }
    };
    handleColorChange = (selectedColor) => {
        let size = this.state.sizes;
        this.setState({
            sizes : size,
            color : selectedColor
        });
    };
    connection = (api) => {
        fetch("http://localhost:8888/exampleAPI"+ api)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        prodName:result.prod[0].prodName,
                        isAvailable : result.prod[0].isAvailable,
                        price :result.prod[0].price,
                        photos : result.prod[0].photos,
                        description : result.prod[0].description,
                        colors : result.prod[0].colors,
                        color : result.prod[0].colors[0],
                        suggestion : result.prod[0].suggestion,
                        prodId : result.prod[0].prodId
                    })
                }
            );
    };
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    };
    handlePost = (e) => {
        e.preventDefault();
        const { prodId , count , color , size} = this.state;
        axios.post('/', { prodId , count , color , size})
            .then((result)=>{
                console.log(result)
            })
    };
    render() {
        const { prodName , isAvailable , price , description , suggestion , photos , color , size , sizes , colors , count} = this.state;
        return (
            <div className="customizer">

                <div className="row">
                    <div className="col-12 col-md-3">
                        <ProductImage url={photos} alt={prodName} color={color} />
                    </div>
                    <div className="col-12 col-md-4">
                        <div>
                            <p>Product name</p>
                            <p>{document.title = prodName}</p>
                        </div>
                        <hr/>
                        <div>
                            <p>Status</p>
                            <p>{(isAvailable ? "Available" : "Not Available" )}</p>
                        </div>
                        <hr/>
                        <div>
                            <p>price</p>
                            <p>{price}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-5">
                        <form onSubmit={this.handlePost}>
                            <SizeSelector
                                size={size}
                                sizes={sizes}
                                handleSizeChange={this.handleSizeChange}
                            />
                            <ColorSelector
                                color={color}
                                colors={colors}
                                handleColorChange={this.handleColorChange}
                            />
                            <div className={"form-group"}>
                                <label htmlFor={"count"}>count</label>
                                <input onChange={this.onChange} className={"form-control"} id={"count"} name={"count"} type={"number"} value={count}/>
                            </div>
                            <button type="submit" className={"btn btn-success"}>buy</button>
                        </form>
                    </div>
                </div>
                <div className={"row"}>
                    <p>Description</p>
                    <p>{description}</p>
                </div>
                <div className={"row"}>
                    {suggestion.map(sug => (
                        <Prod prd={sug} key={sug.id}/>
                    ))}
                </div>
            </div>
        );
    }
}
function SizeSelector(props) {
    if (props.sizes.length === 0){
        return null;
    }
    function sizeOptions() {
        return props.sizes.map(function(num) {
            return (
                <option value={num} key={num}>
                    {num}
                </option>
            );
        });
    }

    function onSizeChange(evt) {
        props.handleSizeChange(evt.target.value);
    }

    return (
        <div className="form-group">
            <label htmlFor="size-options">Size:</label>
            <select
                defaultValue={props.size}
                name="sizeOptions"
                id="size-options"
                className="form-control"
                onChange={onSizeChange}>
                {sizeOptions()}
            </select>
        </div>
    );
}

function ColorSelector(props) {
    if(props.colors.length === 0){
        return null
    }
    function colorOptions() {
        return props.colors.map(function(name) {
            return (
                <option value={name} key={name}>
                    {name}
                </option>
            );
        });
    }

    function onColorChange(evt) {
        props.handleColorChange(evt.target.value);
    }

    return (
        <div className="form-group">
            <label htmlFor="color-options">Color:</label>
            <select
                defaultValue={props.color}
                name="colorOptions"
                id="color-options"
                className="form-control"
                onChange={onColorChange}>
                {colorOptions()}
            </select>
        </div>
    );
}

function ProductImage(props) {
    return (
        <Magnifier width={150} src={`${props.url}${props.color}.png`} mgWidth={200} mgHeight={200} alt={props.alt}/>
    );
}
export default showProduct;