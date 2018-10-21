import * as actionTypes from './actions';

const initialState = {
    cartItems : [],
    totalPrice: 88.00,
    couponDiscount: 7.00,
    editDialogDetails:{},
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_EDIT_DIALOG:
            return {
                ...state,
                editDialogDetails : {
                    ...action.item
                }
            };

        case actionTypes.UPDATE_FETCHED_ITEMS:
            return {
                ...state,
                cartItems : action.items
            };

        case actionTypes.UPDATE_CART_ITEM:
            const aCartItemsCopied = Array.from(state.cartItems);
            let totalPrice = 0;
            for(let index = 0; index < aCartItemsCopied.length; index++){                
                if(aCartItemsCopied[index].style == action.updatedData.cartItem.itemStyle){
                    aCartItemsCopied[index].size = action.updatedData.selectedSize;
                    aCartItemsCopied[index].quantity = action.updatedData.selectedQuantity;
                    totalPrice += (action.updatedData.selectedQuantity * aCartItemsCopied[index].unitPrice);
                } else {
                    totalPrice += (aCartItemsCopied[index].quantity * aCartItemsCopied[index].unitPrice);
                }
            }
            return {
                ...state,
                cartItems: aCartItemsCopied,
                totalPrice : totalPrice
            };

        default:
            return state;
    }
};

export default reducer;