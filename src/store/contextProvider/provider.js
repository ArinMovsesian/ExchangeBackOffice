import React, { Component } from 'react';

//first we will make a new context
export const myContext = React.createContext();

class MyContextProvider extends Component{
    state = {
        linkFile: '',
        registeredCommoditySecurityTransactions: [],
        unknownPersons: []
    };
    render(){
        return (
            <myContext.Provider value={{
                state: this.state,
            }}>
                {this.props.children}
            </myContext.Provider>
        )
    }
};
export default MyContextProvider;
