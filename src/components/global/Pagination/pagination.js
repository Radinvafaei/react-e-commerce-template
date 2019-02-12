import React , { Component } from 'react';
import { HashRouter , Link } from 'react-router-dom';
import Prod from '../Prod/prod';
import next from '../../../assets/images/next.svg';
import prev from '../../../assets/images/prev.svg'
class Pagination extends Component {
    render(){
        const { prod , urls , nextUrl , prevUrl } = this.props;
        return(
            <div className={"results row"}>
                {prod.map(prd => (
                    <Prod key={prd.id} prd={prd}/>
                ))}
                <HashRouter>
                    <div className={"col-12 text-center"}>
                        <ul className={"pagination"}>
                            <li className={"page-item"}>
                                <Link className={"page-link"} to={{pathname : "/list", hash : prevUrl}}>
                                    <img src={prev} alt={"previos"}/>
                                </Link>
                            </li>
                            {urls.map(url => (
                                <li key={url.id} className={"page-item"}>
                                    <Link className={"page-link"} to={{pathname : "/list", hash : url.href}}>{url.id}</Link>
                                </li>
                            ))}
                            <li className={"page-item"}>
                                <Link className={"page-link"} to={{pathname : "/list", hash : nextUrl}}>
                                    <img src={next} alt={"next"}/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </HashRouter>
            </div>
        )
    }
}
export default Pagination