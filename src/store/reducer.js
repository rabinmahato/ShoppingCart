import * as actionTypes from './actions';

const initialState = {
    cartItems : [{
        key: "MENS-SS18-RN-FS-CHECKED-TSHIRT-NAVY",
        name: "Maniac Checkered Men's Round Neck Dark Blue, Beige T-Shirt",
        brand: "Maniac",
        style: "MENS-SS18-RN-FS-CHECKED-TSHIRT-NAVY",
        color: "Blue",
        size: "S",
        quantity: 5,
        unitPrice: 13.00,
        availableSizes: ['S', 'M', 'L'],
        maxQuantity: 5,
        imageURL: ""
    },
    {
        key: "Maniac Checkered Men's Round Neck White, Black T-Shirt",
        name: "Maniac Checkered Men's Round Neck White, Black T-Shirt",
        style: "MENS-SS18-RN-FS-CHECKED-TSHIRT-WHITE",
        color: "Grey",
        size: "S",
        quantity: 3,
        unitPrice: 11.00,
        availableSizes: ['S', 'M', 'L', 'XL'],
        maxQuantity: 10,
        imageURL: ""
    }],
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