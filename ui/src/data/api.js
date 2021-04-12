import {get} from '../api/commons'
const API_ROOT = document.location.href.indexOf('localhost') > -1 ? 'http://localhost:8082' : "https://prevalence.tobacco.dgstg.org"
const URL_TAXONOMY = API_ROOT + '/categories'
const URL_STATS = API_ROOT + '/stats'

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export const getCategories = (params) => {
    return get(URL_TAXONOMY, params)
}


export const getData = (path, params) => {

    return get(URL_STATS + "/" + path+(params?'?'+queryParams(params):''))
}
