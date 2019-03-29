import React, { Component } from "react";
import Swiper from 'react-id-swiper';
import { HashRouter } from "react-router-dom";
import Prod from '../../global/Prod/prod';
import axios from 'axios';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            carousel : [],
            blogs : [],
            items:[],
            tops:[],
            carouselSettings : {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                spaceBetween: 30,
                loop : true,
                autoplay : true
            }
        };
    }
    componentDidMount(){
        document.title = "Main";
        const { carouselSettings } = this.state;
        axios.get("http://localhost:8888/exampleAPI/pages/home.json")
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        carousel :
                            <Swiper {...carouselSettings}>
                                {result.home[0].carousel.map(car => (
                                    <div key={car.id}>
                                        <img src={car.imgSrc} alt={car.description}/>
                                        <p>{car.description}</p>
                                    </div>
                                ))}
                            </Swiper>,
                        tops : result.home[0].tops,
                        items : result.home[0].items
                    })
                }
            )
    }
    render() {
        const { carousel , items } = this.state;
        return (
            <div>
                <div className={'carousels row'}>
                    {carousel}
                </div>
                <HashRouter>
                    <div>
                        {items.map(slide => (
                            <div key={slide.id}>
                                <div className="row">
                                    <div className="col-12">
                                        <hr/>
                                        <h2 className="text-center">{slide.catDesc}</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    {slide.items.map(item => (
                                        <Prod key={item.id} prd={item}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default Home;