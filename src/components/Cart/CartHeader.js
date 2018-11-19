import React from 'react';
const cartHeader = (props) => (
    <li aria-label="Cart Header">
        <div className="flex-row cart-header-item">
            <div className="items-layout" tabIndex="1">{props.itemCount} Items</div>
            <div className="size-layout center-align">SIZE</div>
            <div className="quantity-layout center-align">QTY</div>
            <div className="price-layout center-align">PRICE</div>
        </div>         
    </li>
)
export default cartHeader;