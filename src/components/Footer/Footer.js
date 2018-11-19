import React from 'react';
import secureImage from '../../assets/secure.png';

const footer = (props) =>(
    <footer>
        <div className="secure-massage">
            <img src={secureImage} alt="Secure checkout. Shopping is always safe & secure" width="20px" className="secure-image"/>
            <p>Secure checkout. Shopping is always safe & secure.</p>
        </div>
        <div className="sign-in-massage">
            <p><a href="/Login">SIGN IN</a> to save your cart and have acess to your items on mobile, tablet, and dekstop.</p>
        </div>
    </footer>
)

export default footer;

