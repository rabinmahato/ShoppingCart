import * as actionTypes from './actions';
import axios from '../items-axios';

const initialState = {
    cartItems : [],
    totalPrice: 0,
    couponDiscount: 7.00,
    editDialogDetails:{},
};

const reducer = ( state = initialState, action ) => {
    let totalPrice;
    switch ( action.type ) {
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
                totalPrice
            };

        case actionTypes.UPDATE_CART_ITEM:
            const aCartItemsCopied = Array.from(state.cartItems);
            let itemId;
            totalPrice = 0;

            for(let index = 0; index < aCartItemsCopied.length; index++){                
                if(aCartItemsCopied[index].id == action.updatedData.cartItem.itemId){
                    itemId = action.updatedData.cartItem.itemId;
                    aCartItemsCopied[index].size = action.updatedData.selectedSize;
                    aCartItemsCopied[index].quantity = action.updatedData.selectedQuantity;
                    aCartItemsCopied[index].color = action.updatedData.selectedColor;
                    totalPrice += (action.updatedData.selectedQuantity * aCartItemsCopied[index].unitPrice);
                } else {
                    totalPrice += (aCartItemsCopied[index].quantity * aCartItemsCopied[index].unitPrice);
                }
            }
            //Update item in db
            const oPyaload = {
                "availableSizes": action.updatedData.cartItem.itemAvailableSizes,
                "brand": action.updatedData.cartItem.itemBrand,
                "color": action.updatedData.selectedColor,
                "imageURL": action.updatedData.cartItem.imageURL,
                "key": action.updatedData.cartItem.itemAvailableSizes,
                "maxQuantity": action.updatedData.cartItem.itemMaxQuantity,
                "name": action.updatedData.cartItem.itemName,
                "quantity": action.updatedData.selectedQuantity,
                "size": action.updatedData.selectedSize,
                "style": action.updatedData.cartItem.itemStyle,
                "unitPrice": action.updatedData.cartItem.itemUnitPrice,
                "key": action.updatedData.cartItem.itemStyle
            }
            axios.put(`/shoppingcart-6df6b/${itemId}.json`, oPyaload)
            .then(response => {
                console.log('Data updated ', response);
            })
            .catch(error => {
                console.log(error);
            });

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