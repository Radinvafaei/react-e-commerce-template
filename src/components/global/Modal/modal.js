import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside'
class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal : false
        }
    }
    handleClickOutside = (e) => {
        this.closeModal(e)
    };
    closeModal = (e) =>{
        e.stopPropagation();
        this.props.closeModal && this.props.closeModal(e);
    };
    onKeyUp = (e) => {
        if(e.which === 27 && this.props.showModal){
            this.closeModal(e);
        }
    };
    componentDidMount(){
        document.addEventListener('keyup',this.onKeyUp);
    }
    componentWillUnmount(){
        document.removeEventListener('keyup',this.onKeyUp);
    }
    render(){
        if (!this.props.showModal){
            return null
        }
        return(
            <div className={"modal"}>
                <div className={"modal-dialog"}>
                    <div className={"modal-content"}>
                        <div className={"modal-header"}>
                            <button type="button" className={"btn btn-danger"} onClick={(e) => {this.closeModal(e)}}>&times;</button>
                        </div>
                        <div className={"modal-body"}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Modal.propTypes = {
    closeModal : PropTypes.func.isRequired
};

export default onClickOutside(Modal);