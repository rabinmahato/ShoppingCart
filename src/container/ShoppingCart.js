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
import axios from '../items-axios';
import Spinner from '../components/UI/Spinner/Spinner';

class ShoppingCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            showEditModal: false
        }
    }
    componentDidMount(){
        axios.get('/shoppingcart-6df6b.json')
        .then(res => {
            const fetchedItems = [];
            for (let key in res.data) {
                fetchedItems.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading: false},()=>{
                this.props.onItemsFetched(fetchedItems);
            });
        })
        .catch(err => {
            this.setState({loading: false});
        });
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
        const oShoppingCart=(   
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
        </Aux>);

        return (
            this.state.loading ? <div><Spinner/></div> : oShoppingCart
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
        },
        onItemsFetched: (aFetchedItems) => {
            dispatch({type: actionTypes.UPDATE_FETCHED_ITEMS, items: aFetchedItems});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
