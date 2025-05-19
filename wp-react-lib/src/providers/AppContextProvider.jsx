import React, { Suspense, memo, useMemo } from 'react'
import { AppContext } from './Context';

const AppContextProvider = ({ locale, store, getComponent, children }) => {
    const memoizedValue = useMemo(() => ({
        store: store,
        getComponent: getComponent,
        locale: locale
    }), [store, getComponent, locale]);
    return (
        <AppContext.Provider value={memoizedValue}>
            <Suspense>
                {children}
            </Suspense>
        </AppContext.Provider>
    );
}

export default memo(AppContextProvider);
