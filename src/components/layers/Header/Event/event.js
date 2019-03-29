import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Event extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            backgroundImg: null,
            desc: null,
            href: "",
            timer: false,
            timeStamp:null,
            time: null
        }
    }
    component(x,v) {
        return Math.floor(x / v);
    }
    timer() {
        this.setState({
            timeStamp: this.state.timeStamp - 1
        });
        let days    = this.component(this.state.timeStamp, 24 * 60 * 60),
            hours   = this.component(this.state.timeStamp,      60 * 60) % 24,
            minutes = this.component(this.state.timeStamp,           60) % 60,
            seconds = this.component(this.state.timeStamp,            1) % 60,
            time = days + " days, " + hours + ":" + minutes + ":" + seconds;
        this.setState({time : time})
    }
    componentDidMount(){
        axios.get("http://localhost:8888/exampleAPI/layers/event.json")
            .then(res => res.data)
            .then(
                (result) => {
                    this.setState({
                        show: result.event[0].show,
                        backgroundImg: result.event[0].backgroundImg,
                        desc: result.event[0].desc,
                        href: result.event[0].href,
                        timer: result.event[0].timer,
                        timeStamp: result.event[0].time
                    })
                }
            );
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        const { show , backgroundImg , desc , timer , time} = this.state;
        if (!show){
            return null
        }
        const style = {
            backgroundImage : `url(${backgroundImg})`
        };
        return (
            <Link className="text-center" to="/landing">
                <div className="event" style={style}>
                    <p>{desc}</p>
                    {(timer) ? <p style={{direction : 'ltr'}}>{time}</p> : null}
                </div>
            </Link>
        )
    }
}
export default Event