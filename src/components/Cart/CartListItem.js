import React from 'react';

const cartListItem = (props) => (
    <li>
        <article className="flex-row cart-list-item">
            <div className="items-layout">
                <div className="items-image">
                    <img src={props.imageURL} alt={props.itemName} className="image-responsive"  tabIndex="1"/>
                </div>
                <div className="items-description">
                    <h3 tabIndex="1">{props.itemName}</h3>
                    <span className="font-small" tabIndex="1">Style #:{props.itemStyle}</span>
                    <span className="font-small capitalise" tabIndex="1">Color: {props.itemColor}</span>
                    <span className="font-small row-hide-mobile" tabIndex="1">Size: {props.itemSize}</span>
                    <span className="qty-desc row-hide-mobile" tabIndex="1" aria-label={"Quantity" + props.itemQuantity}>QTY: <strong className="qty-box">{props.itemQuantity}</strong></span>
                    <span className="prce-text-font row-hide-mobile" tabIndex="1"><small>$</small >{props.itemPrice.toFixed(2)}</span>
                </div>
                <div className="items-actions">
                    <span className="action-button edit" 
                    onClick={()=>props.cartEditDialogOpen(props)} tabIndex="1" aria-label="Edit" role="button">EDIT</span>
                    <span className="separator"></span>
                    <span className="action-button" tabIndex="1" aria-label="Remove Item" role="button">&times; REMOVE</span>
                    <span className="separator"></span>
                    <span className="action-button" tabIndex="1" aria-label="Save for later" role="button">SAVE FOR LATER</span>
                </div>
            </div>
            <div className="size-layout row-item center-align">
                <span tabIndex="1" aria-label={"Size"+props.itemSize}>{props.itemSize}</span>
            </div>
            <div className="quantity-layout row-item center-align">
                <span className="qty-box" tabIndex="1" aria-label={"Quantity"+props.itemQuantity}>{props.itemQuantity}</span>
            </div>
            <div className="price-layout row-item center-align">
                <span className="prce-text-font" tabIndex="1" aria-label={"Price $"+props.itemPrice}><small>$</small>{props.itemPrice}</span>
            </div>
        </article>
    </li>
)
export default cartListItem;