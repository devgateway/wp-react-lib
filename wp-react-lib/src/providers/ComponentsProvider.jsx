import React from 'react'
import {ComponentsContext} from './Context'

class ComponentsProvider extends React.Component {


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {components} = props
        return (<ComponentsContext.Provider value={components}>
            {this.props.children}
        </ComponentsContext.Provider>);
    }

};

export default ComponentsProvider
