import React from 'react';
import AuxBox from '../../hoc/AuxBox';

const layout = (props) => (
    <AuxBox>
        {props.children}
    </AuxBox>
)

export default layout;