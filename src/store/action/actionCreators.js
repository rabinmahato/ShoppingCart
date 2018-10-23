import * as actionTypes from './actions';
import axios from '../../items-axios';

export const startSpinner = (bStart) =>{
    return {
        type: actionTypes.START_SPINNER
    };
}

export const stopSpinner = () =>{
    return {
        type: actionTypes.STOP_SPINNER
    };
}

export const updateEditDialog = (oItemsDetails) => {
    return {
        type: actionTypes.UPDATE_EDIT_DIALOG,
        item: oItemsDetails
    }
}

export const updateCartItemToDB = (oItemsDetails) => {
    return (dispatch)=>{        
        const itemId = oItemsDetails.cartItem.itemId;
        dispatch(startSpinner());
        //Update item in db
        const oPyaload = {
            "availableSizes": oItemsDetails.cartItem.itemAvailableSizes,
            "availableColors": oItemsDetails.cartItem.itemAvailableColors,
            "brand": oItemsDetails.cartItem.itemBrand,
            "color": oItemsDetails.selectedColor,
            "imageURL": oItemsDetails.cartItem.imageURL,
            "key": oItemsDetails.cartItem.itemAvailableSizes,
            "maxQuantity": oItemsDetails.cartItem.itemMaxQuantity,
            "name": oItemsDetails.cartItem.itemName,
            "quantity": oItemsDetails.selectedQuantity,
            "size": oItemsDetails.selectedSize,
            "style": oItemsDetails.cartItem.itemStyle,
            "unitPrice": oItemsDetails.cartItem.itemUnitPrice,
            "key": oItemsDetails.cartItem.itemStyle
        }
        axios.put(`/shoppingcart-6df6b/${itemId}.json`, oPyaload)
        .then(response => {
            dispatch(updateCartItem(oItemsDetails));
            console.log('Data updated ', response);
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export const updateCartItem = (oItemsDetails) => {
    return {
        type: actionTypes.UPDATE_CART_ITEM,
        updatedData: oItemsDetails
    }
}

export const fetchCartItems = () => {
    return (dispatch) => {
        dispatch(startSpinner());
        axios.get('/shoppingcart-6df6b.json')
        .then(res => {
            const fetchedItems = [];
            for (let key in res.data) {
                fetchedItems.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(updateFetchedItems(fetchedItems));
        })
        .catch(err => {
            dispatch(startSpinner());
        });
    }
}

export const updateFetchedItems = (aFetchedItems) => {
    return {
        type: actionTypes.UPDATE_FETCHED_ITEMS, 
        items: aFetchedItems
    }
}