import React from 'react';

const cart = (props) => (
    <section className="cart-lists" aria-label="item list">
        <ul aria-label="Cart item list">
            {props.children}
        </ul>
    </section>

)
export default cart;