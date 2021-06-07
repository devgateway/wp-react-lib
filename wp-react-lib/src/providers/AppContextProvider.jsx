import React from 'react'
import {AppContext} from './Context'

class AppContextProvider extends React.Component {


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {components, store} = this.props
        return (<AppContext.Provider value={{components, store}}>
            {this.props.children}
        </AppContext.Provider>);
    }

};

export default AppContextProvider
