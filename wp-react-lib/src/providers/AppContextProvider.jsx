import React, { Suspense } from 'react'
import { AppContext } from './Context';
import { Dimmer, Loader } from 'semantic-ui-react';

class AppContextProvider extends React.Component {


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const { locale, store, getComponent } = this.props

        return (
            <AppContext.Provider value={{ store, getComponent, locale }}>
                <Suspense fallback={
                     <Dimmer active>
                     <Loader>Loading</Loader>
                 </Dimmer>
                }>
                    {this.props.children}
                </Suspense>
            </AppContext.Provider>
        );
    }

}

export default AppContextProvider
