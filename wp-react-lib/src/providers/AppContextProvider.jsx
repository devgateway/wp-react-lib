import React, { Suspense } from 'react'
import { AppContext } from './Context';
import { Dimmer, Loader } from 'semantic-ui-react';

const AppContextProvider = ({ locale, store, getComponent, children }) => {
    return (
        <AppContext.Provider value={{ store, getComponent, locale }}>
            <Suspense fallback={
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            }>
                {children}
            </Suspense>
        </AppContext.Provider>
    );
}

export default AppContextProvider
