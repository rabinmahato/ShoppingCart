import React from 'react';

const cart = (props) => (
    <section className="cart-lists" aria-label="item list">
        <ul>
            {props.children}
        </ul>
    </section>

)
export default cart;