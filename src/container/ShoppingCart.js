import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import ContatUsContainer from '../components/Checkout/ContuctUs';
import CheckoutContiner from '../components/Checkout/CheckoutContiner';
import CartHeader from '../components/Cart/CartHeader';
import CartListItems from '../components/Cart/CartListItems';
import Cart from '../components/Cart/Cart';
import Aux from '../hoc/AuxBox';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            showEditModal: false
        }
    }

    /* Dialog open handler for cart item edit */
    openEditDialog = (oItemDetails)=> {
        this.setState({showEditModal: true});
        this.props.onEditDialogUpdate(oItemDetails);
    }
    /* Dialog close handler for cart item edit */
    fnDialogClose = (oItemDetails)=> {
        this.setState({showEditModal: false});
    }

    render() {
        return (
            <Aux>
                <main role="Cart">
                    <Cart>
                        <CartHeader itemCount={this.props.cartItems.length}/>
                        <CartListItems 
                            cartItems={this.props.cartItems} 
                            cartEditDialogOpen={this.openEditDialog}
                        />
                    </Cart>
                    <CheckoutContiner>
                        <ContatUsContainer/>
                        <CheckoutSummary/>
                    </CheckoutContiner>
                </main>
                <Modal show={this.state.showEditModal} 
                    dialogClose={this.fnDialogClose}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onEditDialogUpdate: (oItemsDetails) => {
            dispatch({type: actionTypes.UPDATE_EDIT_DIALOG, item: oItemsDetails});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
