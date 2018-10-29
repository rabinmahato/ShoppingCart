import React, { Component } from 'react'


export const oAppContext = React.createContext();
export class Context extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <oAppContext.Provider value={this.props.value}>
                {this.props.children}
            </oAppContext.Provider>
        )
    }
}

export default Context;
