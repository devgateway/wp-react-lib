import React, { useLayoutEffect } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {getSettings} from '../reducers/actions'

import {SettingsContext} from './Context'

/*
WP-REST-API V2 Menus plugin is required
Will load a post base ond passed properties and put in PostContext
*/
const SettingProvider = (props) => {
    const {children, locale, changeUUID } = props;
    const dispatch = useDispatch();

    const error = useSelector(state => state.getIn(['wordpress', 'settings', 'error']));
    const data = useSelector(state => state.getIn(['wordpress', 'settings', 'data']));
    const loading = useSelector(state => state.getIn(['wordpress', 'settings', 'loading']));

    useLayoutEffect(() => {
        if (locale) {
            dispatch(getSettings({
                locale,
                changeUUID
            }));
        }

        return () => {
            // cleanup
        }
    }, [locale, changeUUID]);

    return (
        <SettingsContext.Provider value={{ data }}>
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingProvider;