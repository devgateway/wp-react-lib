const API_ROOT = process.env.REACT_APP_WP_API
const URL_MENU = API_ROOT + '/menus/v1/menus/'
const URL_API_BASE = API_ROOT + '/wp/v2/'

const URL_PAGE = API_ROOT + '/wp/v2/pages'

const URL_SEARCH = API_ROOT + (process.env.REACT_APP_WP_SEARCH_END_POINT ? process.env.REACT_APP_WP_SEARCH_END_POINT : '/wp/v2/search')

const URL_MEDIA = API_ROOT + '/wp/v2/media'


export const post = (url, params, isBlob) => {

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
                        const meta = {}
                        response.headers.forEach((header, name) => {
                            meta[name] = header

                        })
                        resolve({data: response.blob(), meta})
                    }
                    response.json().then(function (data) {
                        const meta = {}
                        response.headers.forEach((header, name) => {
                            meta[name] = header

                        })
                        resolve({data, meta})
                    }).catch(() => resolve(response.status))
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}
export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {

        fetch(url, {credentials: 'include'})
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    response.json().then(function (data) {
                        const meta = {}
                        response.headers.forEach((header, name) => {
                            meta[name] = header

                        })

                        resolve({data, meta})
                    })
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}

export const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}


export const getTaxonomy = (name, locale) => {
    return get(URL_API_BASE + "" + name + '?lang=' + locale + '&per_page=100')

}

//TODO:make a unique getPost method
export const getPostsByTypeAndTaxonomy = (type, category, value, locale, page = 1, perPage = 1) => {
    return get(URL_API_BASE + type + "?_embed&" + category + '=' + value + '&lang=' + locale + '&per_page=' + perPage + '&page=' + page)
}

export const getMenu = (name, locale) => {
    return get(URL_MENU + name + '?lang=' + locale)
}

export const getPosts = (slug, type, taxonomy, categories, before, perPage, page, fields, locale, previewNonce, previewId, search) => {
    //language , categories id, date before, record per page, number of page, fields to be included, post type
    //const {lang, slug, wType: type, taxonomy, categories, before, perPage, page, fields} = params

    let url = URL_API_BASE + (type ? type : 'posts')
    if (previewId) {
        url += '/' + previewId + '/revisions'
            + (previewNonce ? '?_wpnonce=' + previewNonce + '&' : '')
    } else {
        url += "?"
    }
    url += '_embed=true&lang=' + locale
        + (slug ? '&slug=' + slug : '')
    if (!slug) {
        url += (categories ? (taxonomy ? '&' + taxonomy : '&categories')
            + "=" + (categories ? categories : "") : '') //ids
            + (before ? "&before=" + before.toISOString() : "")
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
            + (search ? '&search=' + search : '')
    }

    url += "&lang=" + locale
    return get(url)
}

export const getPages = (before, perPage, page, fields, parent, slug, store, locale, previewNonce, previewId, search) => {

    let url = URL_PAGE

    if (previewId) {
        url += '/' + previewId + '/revisions'
            + (previewNonce ? '?_wpnonce=' + previewNonce + '&' : '')
    } else {
        url += "?"
    }

    url += 'lang=' + locale
        + (slug ? '&slug=' + slug : '')
    if (!slug) {
        url += (before ? "&before=" + before.toISOString() : "")
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
            + (parent ? '&parent=' + parent : '')
            + (search ? '&search=' + search : '')
    }
    return get(url)
}

export const search = (context, page, perPage, search, type, subtype, locale) => {
    let url = URL_SEARCH + '?lang=' + locale
        + (context ? "&context=" + context : '')
        + (perPage ? '&per_page=' + perPage : '')
        + (page ? '&page=' + page : '')
        + (search ? '&search=' + search : '')
        + (type ? '&type=' + type : '')
        + (subtype ? '&subtype=' + subtype : '')

    return get(url)
}

export const getMedia = (slug, locale) => {
    return get(URL_MEDIA + '/' + slug + '?lang=' + locale)
}

