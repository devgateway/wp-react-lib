import Immutable from 'immutable'
import {sendShowCase, subscribe} from "./embeddable-api";

const SHOW_CASE_SEND = "SEND_SHOW_CASE"
const SHOW_CASE_SEND_DONE = "SEND_SHOW_CASE_DONE"
const SHOW_CASE_SEND_FAILURE = "SEND_SHOW_CASE_FAILURE"
const SHOW_CASE_RESET = "SHOW_CASE_RESET"

const NEWS_LETTER_SUBSCRIBE = "NEWS_LETTER_SUBSCRIBE"
const NEWS_LETTER_SUBSCRIBE_DONE = "NEWS_LETTER_SUBSCRIBE_DONE"
const NEWS_LETTER_SUBSCRIBE_FAILURE = "NEWS_LETTER_SUBSCRIBE_FAILURE"


const initialState = Immutable.Map({})

export const newsletterSubscription = (params) => (dispatch, getState) => {
    return new Promise(((resolve, reject) => {

        dispatch({type: NEWS_LETTER_SUBSCRIBE})
        subscribe(params).then((res) => {
            dispatch({type: NEWS_LETTER_SUBSCRIBE_DONE})
            resolve()
        }).catch((err) => {
            dispatch({type: NEWS_LETTER_SUBSCRIBE_FAILURE})
            reject()
        })

    }))
}


export const sendShowCaseForm = (params) => (dispatch, getState) => {
    dispatch({type: SHOW_CASE_SEND})

    sendShowCase(params).then((res) => {
        if (res.status === 500) {
            dispatch({type: SHOW_CASE_SEND_FAILURE})
        } else {
            dispatch({type: SHOW_CASE_SEND_DONE})
        }
    }).catch((err) => {
        dispatch({type: SHOW_CASE_SEND_FAILURE})
    })
}


export const reset = (params) => (dispatch, getState) => {
    dispatch({type: SHOW_CASE_RESET})
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CASE_SEND: {
            return state.setIn(['showCase', 'loading'], true)
                .setIn(['showCase', 'status'], null)
        }
        case SHOW_CASE_SEND_DONE: {
            return state.setIn(['showCase', 'status'], "OK")
        }
        case SHOW_CASE_SEND_FAILURE: {
            return state.setIn(['showCase', 'status'], "ERROR")
        }
        case SHOW_CASE_RESET: {
            return state.setIn(['showCase', 'status'], null)
        }

        case NEWS_LETTER_SUBSCRIBE: {
            return state.setIn(['newsletter', 'loading'], true)
                .setIn(['newsletter', 'status'], null)
        }
        case NEWS_LETTER_SUBSCRIBE_DONE: {
            return state.setIn(['newsletter', 'status'], "OK")
        }
        case NEWS_LETTER_SUBSCRIBE_FAILURE: {
            return state.setIn(['newsletter', 'status'], "ERROR")
        }

        default:
            return state
    }
}
