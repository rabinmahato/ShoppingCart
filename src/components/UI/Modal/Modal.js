import React, { Component } from 'react';
import Aux from '../../../hoc/AuxBox';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import item2Image from '../../../assets/item1.jpeg';

class Modal extends Component {
    constructor(props){
        super(props); 
        this.state={
            selectedSize: this.props.cartItem.itemSize,
            selectedQuantity: this.props.cartItem.itemQuantity,
            iDialogOpened: false
        } 
        this.onProductSizeChange = this.onProductSizeChange.bind(this);
        this.onProductQuanityChange = this.onProductQuanityChange.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(!nextProps.show){
            return {
                ...prevState,
                iDialogOpened : false
            }
        }
        if(!prevState.iDialogOpened && (nextProps.cartItem.itemSize !== prevState.selectedSize || nextProps.cartItem.itemQuantity !== prevState.selectedQuantity)){
            return {
                ...prevState,
                selectedSize : nextProps.cartItem.itemSize,
                selectedQuantity : nextProps.cartItem.itemQuantity,
                iDialogOpened : true
            }
        }
        if(!prevState.iDialogOpened && (nextProps.cartItem.itemSize == prevState.selectedSize || nextProps.cartItem.itemQuantity == prevState.selectedQuantity)){
            return {
                ...prevState,
                iDialogOpened : true
            }
        }
        return null;

    }
    // change handler for product select
    onProductSizeChange(event){
        this.setState({
            selectedSize: event.target.value
        })
    }
    // change handler for product quantity select
    onProductQuanityChange(event){
        this.setState({
            selectedQuantity: event.target.value ? Number(event.target.value) : event.target.value
        })
    }
    /* Update the edited data */
    updateEditedData=(cartItem, selectedSize, selectedQuantity)=>{
        this.props.onUpdateEditedData({cartItem, selectedSize, selectedQuantity});
        this.props.dialogClose();
    }
    render () {
        const aQuantitySelectOptionsArray = [];
        for(let index = 1; index <= this.props.cartItem.itemMaxQuantity; index++ ) {
            aQuantitySelectOptionsArray.push(index);
            
        }
        let {selectedSize, selectedQuantity} = this.state;
        selectedSize = !selectedSize ? this.props.cartItem.itemSize : selectedSize;
        selectedQuantity = !selectedQuantity ? this.props.cartItem.itemQuantity : selectedQuantity;

        return (
            this.props.show ? 
            <Aux>
                {/* The Modal */}
                <div className="modal" role="dialog">
                   {/*  Modal content */}
                    <div className="modal-content">
                        <div><span className="close" onClick={()=>this.props.dialogClose()}>&times;</span></div>                        
                        <section className="flex-modal-content">
                            <article className="product-details">
                                <h3>{ this.props.cartItem.itemName }</h3>
                                <div className="">
                                    <span className="modal-prce-text-font"><small>$</small>{ this.props.cartItem.itemUnitPrice * selectedQuantity }</span>
                                </div>
                                <div>
                                    <h4>{ this.props.cartItem.itemBrand }</h4>
                                    <div className="colors-available">
                                        <div className="color-box color-blue color-selected"></div>
                                        <div className="color-box color-grey"></div>
                                    </div>
                                </div>
                                
                                <div className="select-box">
                                    <select name="produt-size" onChange={this.onProductSizeChange} value={selectedSize}>                                    
                                        <option value="QTY">QTY</option>
                                        { this.props.cartItem.itemAvailableSizes.map((ele, index)=>{
                                            return <option key={ this.props.cartItem.itemStyle + ele } value={ele}>{ele}</option>;
                                            })
                                        }
                                    </select>
                                    <select id="qty-select" name="produt-qty" onChange={this.onProductQuanityChange} value={selectedQuantity}>
                                        { 
                                            aQuantitySelectOptionsArray.map((ele, index)=>
                                            {
                                                return  <option key={ this.props.cartItem.itemStyle + ele } value={ele}>{ele}</option>; 
                                            })
                                        }
                                    </select>
                                </div>                
                                <input type="button" className="button btn-blue modal-edit-button" value="EDIT" onClick={()=>this.updateEditedData(this.props.cartItem, selectedSize, selectedQuantity)}/>                
                                <div><a href="/ProductDetails">See product details</a></div>
                            </article>
                            <div className="product-image">
                                <img src={item2Image} alt="Item 1" className="image-responsive"/>
                            </div>
                        </section>
                    </div>    
                </div>
            </Aux>
            : null
        )
    }
}

const mapStateToProps = state => {
    return {
        cartItem : state.editDialogDetails
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateEditedData: (oItemsDetails) => {
            dispatch({
                type: actionTypes.UPDATE_CART_ITEM,
                updatedData: oItemsDetails
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
