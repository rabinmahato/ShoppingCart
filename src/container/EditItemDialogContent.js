import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/action/';
import {oAppContext as AppContext} from '../context/Context';

class EditModalContent extends Component {
    constructor(props){
        super(props); 
        this.state={
            selectedSize: null,
            selectedQuantity: null,
            selectedColor: ""
        } 
        this.onProductSizeChange = this.onProductSizeChange.bind(this);
        this.onProductQuanityChange = this.onProductQuanityChange.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
         if(Object.keys(nextProps.cartItem).length && (nextProps !== prevState.prevPropsList)){
            return {
                ...prevState,
                selectedSize : nextProps.cartItem.itemSize,
                selectedQuantity : nextProps.cartItem.itemQuantity,
                selectedColor: nextProps.cartItem.itemColor.toLowerCase(),
                prevPropsList: nextProps
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
    updateEditedData=(cartItem, selectedSize, selectedQuantity, selectedColor, fnDialogClose)=>{
        this.props.onUpdateEditedData({cartItem, selectedSize, selectedQuantity, selectedColor});
        //Close the dialog
        fnDialogClose();
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
            <AppContext.Consumer>
                {(context)=>
                    (<React.Fragment>                      
                        <section className="flex-modal-content">
                            <article className="product-details">
                                <h3 tabIndex="0">{ this.props.cartItem.itemName }</h3>
                                <div className="">
                                    <span className="modal-prce-text-font" tabIndex="0"><small>$</small>{ this.props.cartItem.itemUnitPrice * selectedQuantity }</span>
                                </div>
                                <div>
                                    <h4>{ this.props.cartItem.itemBrand }</h4>
                                    <div className="colors-available">
                                        { this.props.cartItem.itemAvailableColors.map((ele)=>{
                                            return selectedColor === ele ? 
                                            <div key={ ele + Math.random()*10 } className={`color-box color-${ele} color-selected` }
                                                 onClick={()=>this.changeColor(ele)} onKeyPress={(evt) => { if(evt.charCode == 13) this.changeColor(ele) }} 
                                                 role="button" tabIndex="0" aria-label={"Change color" + ele}></div> :
                                            <div key={ ele + Math.random()*10 } className={`color-box color-${ele}`}
                                                 onClick={()=>this.changeColor(ele)} onKeyPress={(evt) => { if(evt.charCode == 13) this.changeColor(ele) }} 
                                                 role="button" tabIndex="0" aria-label={"Change color" + ele}></div>                                            
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
                                <input type="button" className="button btn-blue modal-edit-button" value="EDIT" onClick={()=>this.updateEditedData(this.props.cartItem, selectedSize, selectedQuantity, selectedColor, context.dialogClose)}/>                
                                <div><a href="/ProductDetails">See product details</a></div>
                            </article>
                            <div className="product-image">
                                <img src={this.props.cartItem.imageURL} alt={this.props.cartItem.itemName} className="image-responsive" tabIndex="0"/>
                            </div>
                        </section>
                    </React.Fragment>)
                }
            </AppContext.Consumer>
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
            dispatch(actionTypes.updateCartItemToDB(oItemsDetails));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModalContent);
