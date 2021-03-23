import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable'
import {intlReducer} from 'react-intl-redux'

import wordpress from '../wp/module'
import data from "../data/module.js";
import embeddable from '../embeddable/module'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    wordpress,
    embeddable,
    data,
    intl: intlReducer
})


export default createRootReducer
