import * as actionTypes from './action/actions';
import axios from '../items-axios';

const initialState = {
    cartItems : [],
    totalPrice: 0,
    couponDiscount: 7.00,
    editDialogDetails:{},
    loading: false
};

const reducer = ( state = initialState, action ) => {
    let totalPrice;
    switch ( action.type ) {
        case actionTypes.START_SPINNER:
            return {
                ...state,
                loading: true
            };
        
        case actionTypes.START_SPINNER:
            return {
                ...state,
                loading: true
            }; 

        case actionTypes.UPDATE_EDIT_DIALOG:
            return {
                ...state,
                editDialogDetails : {
                    ...action.item
                }
            };

        case actionTypes.UPDATE_FETCHED_ITEMS:
            totalPrice = 0
            for(let index = 0; index < action.items.length; index++){                
                totalPrice += (action.items[index].quantity * action.items[index].unitPrice);
            }
            return {
                ...state,
                cartItems : action.items,
                totalPrice,
                loading: false
            };

        case actionTypes.UPDATE_CART_ITEM:
            const aCartItemsCopied = Array.from(state.cartItems);
            totalPrice = 0;
            for(let index = 0; index < aCartItemsCopied.length; index++){                
                if(aCartItemsCopied[index].id == action.updatedData.cartItem.itemId){
                    aCartItemsCopied[index].size = action.updatedData.selectedSize;
                    aCartItemsCopied[index].quantity = action.updatedData.selectedQuantity;
                    aCartItemsCopied[index].color = action.updatedData.selectedColor;
                    totalPrice += (action.updatedData.selectedQuantity * aCartItemsCopied[index].unitPrice);
                } else {
                    totalPrice += (aCartItemsCopied[index].quantity * aCartItemsCopied[index].unitPrice);
                }
            }

            return {
                ...state,
                cartItems: aCartItemsCopied,
                totalPrice,
                loading: false
            };

        default:
            return state;
    }
};

export default reducer;