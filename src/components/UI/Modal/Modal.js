import React, { Component } from 'react';
import Aux from '../../../hoc/AuxBox';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class Modal extends Component {
    constructor(props){
        super(props); 
        this.state={
            selectedSize: this.props.cartItem.itemSize,
            selectedQuantity: this.props.cartItem.itemQuantity,
            selectedColor: "",
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
        if(!prevState.iDialogOpened && (nextProps.cartItem.itemSize !== prevState.selectedSize || nextProps.cartItem.itemQuantity !== prevState.selectedQuantity |
            nextProps.cartItem.itemColor != prevState.selectedColor)){
            return {
                ...prevState,
                selectedSize : nextProps.cartItem.itemSize,
                selectedQuantity : nextProps.cartItem.itemQuantity,
                selectedColor: nextProps.cartItem.itemColor.toLowerCase(),
                iDialogOpened : true
            }
        }
        if(!prevState.iDialogOpened && (nextProps.cartItem.itemSize == prevState.selectedSize || nextProps.cartItem.itemQuantity == prevState.selectedQuantity ||
            nextProps.cartItem.itemColor == prevState.selectedColor)){
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
    updateEditedData=(cartItem, selectedSize, selectedQuantity, selectedColor)=>{
        this.props.onUpdateEditedData({cartItem, selectedSize, selectedQuantity, selectedColor});
        this.props.dialogClose();
    }
    /* Change color handler */
    changeColor = (color) => {
        this.setState({
            selectedColor: color
        })
    }
    render () {
        const aQuantitySelectOptionsArray = [];
        for(let index = 1; index <= this.props.cartItem.itemMaxQuantity; index++ ) {
            aQuantitySelectOptionsArray.push(index);
            
        }
        let {selectedSize, selectedQuantity, selectedColor} = this.state;
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
                                <h3 ref="itmName" tabIndex="0">{ this.props.cartItem.itemName }</h3>
                                <div className="">
                                    <span className="modal-prce-text-font" tabIndex="0"><small>$</small>{ this.props.cartItem.itemUnitPrice * selectedQuantity }</span>
                                </div>
                                <div>
                                    <h4>{ this.props.cartItem.itemBrand }</h4>
                                    <div className="colors-available">
                                        {["blue", "grey", "red"].map((ele)=>{
                                            return selectedColor === ele ? 
                                            <div key={ ele + Math.random()*10 } className={`color-box color-${ele} color-selected` } onClick={()=>this.changeColor(ele)} role="button"></div> :
                                            <div key={ ele + Math.random()*10 } className={`color-box color-${ele}`} onClick={()=>this.changeColor(ele)} role="button"></div>                                            
                                        })}
                                    </div>
                                </div>
                                
                                <div className="select-box">
                                    <select name="produt-size" onChange={this.onProductSizeChange} value={selectedSize} aria-label="Select size" tabIndex="0">                                    
                                        { this.props.cartItem.itemAvailableSizes.map((ele, index)=>{
                                            return <option key={ this.props.cartItem.itemStyle + ele } value={ele}>{ele}</option>;
                                            })
                                        }
                                    </select>
                                    <select id="qty-select" name="produt-qty" onChange={this.onProductQuanityChange} value={selectedQuantity} aria-label="Select quantity" tabIndex="0">
                                        { 
                                            aQuantitySelectOptionsArray.map((ele, index)=>
                                            {
                                                return  <option key={ this.props.cartItem.itemStyle + ele } value={ele}>{ele}</option>; 
                                            })
                                        }
                                    </select>
                                </div>                
                                <input type="button" className="button btn-blue modal-edit-button" value="EDIT" onClick={()=>this.updateEditedData(this.props.cartItem, selectedSize, selectedQuantity, selectedColor)}/>                
                                <div><a href="/ProductDetails">See product details</a></div>
                            </article>
                            <div className="product-image">
                                <img src={this.props.cartItem.imageURL} alt={this.props.cartItem.itemName} className="image-responsive" tabIndex="0"/>
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
