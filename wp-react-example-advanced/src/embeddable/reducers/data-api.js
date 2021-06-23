import {get} from '../../api/commons'


const PREVALENCE_API_ROOT = process.env.REACT_APP_PREVALENCE_API
const POLICY_API_ROOT = process.env.REACT_APP_POLICY_API

const PREVALENCE_URL_TAXONOMY = PREVALENCE_API_ROOT + '/categories'

const APIS = {
    prevalence: PREVALENCE_API_ROOT,
    policy: POLICY_API_ROOT
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export const getCategories = (params) => {
    return get(PREVALENCE_URL_TAXONOMY, params)
}

export const getData = ({source, app, params}) => {
    return get(APIS[app] + "/stats/" + source + (params ? '?' + queryParams(params) : ''))
}

