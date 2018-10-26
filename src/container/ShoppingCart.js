import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';
import EditModalContent from '../container/EditItemDialogContent';
import CheckoutSummary from '../components/Checkout/CheckoutSummary';
import ContatUsContainer from '../components/Checkout/ContuctUs';
import CheckoutContiner from '../components/Checkout/CheckoutContiner';
import CartHeader from '../components/Cart/CartHeader';
import CartListItems from '../components/Cart/CartListItems';
import Cart from '../components/Cart/Cart';
import Aux from '../hoc/AuxBox';
import * as actionTypes from '../store/action/';
import { connect } from 'react-redux';
import Spinner from '../components/UI/Spinner/Spinner';
import {Context} from '../context/Context';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEditModal: false
        }
    }
    componentDidMount(){
        //Fetch all the initial cart items
        this.props.onFetchCartItems();
    }

    /* Dialog open handler for cart item edit */
    openEditDialog = (oItemDetails)=> {
        this.setState({showEditModal: true});
        //Update selected item to redux
        this.props.onEditDialogUpdate(oItemDetails);
    }
    /* Dialog close handler for cart item edit */
    fnDialogClose = (oItemDetails)=> {
        this.setState({showEditModal: false});
    }


    render() {
        const oShoppingCart=(   
        <Context    value={{
                    dialogClose : this.fnDialogClose
        }}>
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
            <Modal  show={this.state.showEditModal} 
                    dialogClose={this.fnDialogClose}>
                    <EditModalContent />
            </Modal>
        </Context>);

        return (
            this.props.loading ? <div><Spinner/></div> : oShoppingCart
        )
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems,
        loading: state.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onEditDialogUpdate: (oItemsDetails) => {
            dispatch(actionTypes.updateEditDialog(oItemsDetails));
        },
        onFetchCartItems: (aFetchedItems) => {
            dispatch(actionTypes.fetchCartItems());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
