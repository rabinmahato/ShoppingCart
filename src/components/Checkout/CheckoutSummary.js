import React, {Component} from 'react';
import {connect} from 'react-redux';

class CheckoutSummary extends Component{
    render(){
        return (
            <div className="container-chekout">
                <div className="promotion-code-layoout">
                    <div className="promo-label">
                        <label htmlFor="promotioncode" tabIndex="2">ENTER PROMOTION CODE OR GIFT CARD</label>
                    </div>
                    <div className="promo-input">
                        <input type="text" id="pcode" name="promotioncode" tabIndex="2"/>
                        <input type="button" className="button" value="APPLY" tabIndex="2" aria-label="Apply promotion code"/>
                    </div>
                </div>
                <div className="checkout-summary" role="Checkout" tabIndex="2">
                    <div>
                        <span>SUB TOTAL</span>
                        <span className="prce-text-font"><small>$</small>{this.props.totalPrice.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>PROMOTION CODE <b>JF10</b> APPLIED</span>
                        <span className="prce-text-font">-<small>$</small>{this.props.couponDiscount.toFixed(2)}</span>
                    </div>
                    <div>
                        <div>
                            <span>ESTIMATED SHIPPING*</span>
                            <p>You qualify for free shipping because your order is over $50*</p>
                        </div>
                        <span className="prce-text-font">FREE</span>
                    </div>
                    <div className="total-price">
                        <div>
                            <span>ESTIMATED TOTAL*</span>
                            <p>Tax wil be applied during checkout</p>
                        </div>
                        <span className="prce-text-font"><small>$</small>{(this.props.totalPrice - this.props.couponDiscount).toFixed(2)}</span>
                    </div>
                </div>
                <div className="checkout-actions">
                    <a href="https://www.continueshipping.com" className="continueshipping">CONTINUE SHIPPING</a>
                    <input type="button" className="button btn-blue" value="CHECKOUT"/>
                </div>
            </div>
        
        )
    }
}

const mapStateToProps = state => {
    return {
        totalPrice: state.totalPrice,
        couponDiscount: state.couponDiscount
    };
}

const mapDispatchToProps = dispatch => {
    return { }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary);