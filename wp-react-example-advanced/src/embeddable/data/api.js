const PREVALENCE_API_ROOT = process.env.REACT_APP_PREVALENCE_API
const POLICY_API_ROOT = process.env.REACT_APP_POLICY_API

const PREVALENCE_URL_TAXONOMY = PREVALENCE_API_ROOT + '/categories'

const APIS = {
    prevalence: PREVALENCE_API_ROOT,
    policy: POLICY_API_ROOT
}
const post = (url, params, isBlob) => {

    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    if (isBlob) {
                        resolve(response.blob())
                    }
                    response.json().then(function (data) {
                        resolve(data)
                    }).catch(() => resolve(response.status))
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}
const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {

        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    response.json().then(function (data) {
                        resolve(data)
                    })
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
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

