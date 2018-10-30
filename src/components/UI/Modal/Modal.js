import React, { Component } from 'react';

class Modal extends Component {
    constructor(props){
        super(props); 
    }
    componentDidUpdate(){
        if(this.refs.modalRef) this.refs.modalRef.focus();
    }
    render () {
        return (
            this.props.show ? 
            <React.Fragment>
                {/* The Modal */}
                <div className="modal" role="dialog">
                   {/*  Modal content */}
                    <div className="modal-content"  ref="modalRef">
                        {/*  Modal close button */}
                        <div><span className="close" onClick={()=>this.props.dialogClose()}>&times;</span></div>                        
                        {this.props.children}
                    </div>    
                </div>
            </React.Fragment>
            : null
        )
    }
}

export default Modal;
