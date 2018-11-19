import React from 'react';
const checkoutContiner = (props) => (
    <section>
        <div className="checkout-container">
            {props.children}       
        </div>
    </section>
)
export default checkoutContiner;