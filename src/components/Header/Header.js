import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component{
    componentDidMount(){
        //this.refs.header.scrollIntoViewIfNeeded();
    }
    render(){
        return (
            <header role="header" ref="header">
                <div className="header-wrapper">
                    <div>
                        <h1 tabIndex="1">YOUR SHOPPING BAG</h1>
                    </div>
                    <div className="items-layout header-items-count" tabIndex="1">{this.props.cartItems.length} Items</div>
                </div>
            </header>
        );
    }
}
const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
}
const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);