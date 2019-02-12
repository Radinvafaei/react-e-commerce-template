import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside'
class DropDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            listOpen: false,
            headerTitle: this.props.title.name
        };
    }
    handleClickOutside(){
        this.setState({
            listOpen: false
        })
    }
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    render(){
        const {list} = this.props,
              {listOpen, headerTitle} = this.state;
        return(
            <li className={'nav-item dropdown'} onClick={() => this.toggleList()}>
                <p className={'nav-link'}>{headerTitle}</p>
                {listOpen &&
                <div className={'dropdown-menu'}>
                    {list.children.map(
                        (item) => (
                            <Link key={item.id} className={'dropdown-item'} to={{
                                pathname : '/showProduct' ,
                                hash : item.href
                            }}>{item.name}</Link>
                        )
                    )}
                    <Link className={'dropdown-item'} to={{
                        pathname : '/list',
                        hash : list.href
                    }}>more ...</Link>
                </div>
                }
            </li>
        )
    }
}
export default onClickOutside(DropDown)