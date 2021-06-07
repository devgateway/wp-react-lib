import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable'
import {intlReducer} from 'react-intl-redux'

import  {wordpress} from 'wp-react-lib'


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    wordpress,
    intl: intlReducer
})


export default createRootReducer
