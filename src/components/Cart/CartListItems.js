import React from 'react';
import CartListItem from '../Cart/CartListItem';
import AuxBox from '../../hoc/AuxBox';

const cartListItems = (props) => {
    const {cartItems} = props; 
    return(
        <AuxBox>        
            { props.cartItems.map((ele, key)=>
                <CartListItem 
                key={ele.key}
                itemId={ele.id}
                imageURL={ele.imageURL}
                itemName={ele.name}
                itemStyle={ele.style}
                itemColor={ele.color}
                itemSize={ele.size}
                itemQuantity={ele.quantity}
                itemUnitPrice={ele.unitPrice}
                itemPrice={ele.unitPrice * ele.quantity}
                itemAvailableSizes={ele.availableSizes}
                itemBrand={ele.brand}
                itemMaxQuantity={ele.maxQuantity}
                cartEditDialogOpen={props.cartEditDialogOpen}
                cartEditDialogClose={props.cartEditDialogClose}
                />
            ) }
        </AuxBox>

    );  
}
export default cartListItems;