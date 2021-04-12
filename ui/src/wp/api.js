import {get} from '../api/commons.js'

const API_ROOT = document.location.href.indexOf('localhost') > -1 ?
    "https://wp.tobacco.dgstg.org/wp-json"
    // 'http://localhost/wp-json'
    : "https://wp." + document.location.host + '/wp-json'
const URL_MENU = API_ROOT + '/menus/v1/menus/'
const URL_API_BASE = API_ROOT + '/wp/v2/'
const URL_POSTS = API_ROOT + '/wp/v2/posts'

const URL_POST = API_ROOT + '/wp/v2/posts?slug='
const URL_PAGE = API_ROOT + '/wp/v2/pages?'
const URL_MEDIA = API_ROOT + '/wp/v2/media'


export const getTaxonomy = (name, lang) => {
    return get(URL_API_BASE + "" + name + '?lang=' + lang + '&per_page=100')

}

//TODO:make a unique getPost method
export const getPostsByTypeAndTaxonomy = (type, category, value, lang = 'en', page = 1, perPage = 1) => {
    return get(URL_API_BASE + type + "?_embed&" + category + '=' + value + '&lang=' + lang + '&per_page=' + perPage + '&page=' + page)
}

export const getMenu = (name, lang) => {
    return get(URL_MENU + name + '?lang=' + lang)
}

export const getPosts = (params) => {
    //language , categories id, date before, record per page, number of page, fields to be included, post type
    const {lang, slug, wType:type, taxonomy, categories, before, perPage, page, fields,} = params

    let url = URL_API_BASE + (type ? type : 'posts')
        + '?_embed=true&lang=' + lang
        + (slug ? '&slug=' + slug : '')

    if (!slug) {
        url += (categories ? (taxonomy ? '&' + taxonomy : '&categories')
            + "=" + (categories ? categories : "") : '') //ids
            + (before ? "&before=" + before.toISOString() : "")
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
    }
    return get(url)
}

export const getPages = (params) => {
    const {lang, slug, before, perPage, page,parent, fields,} = params

    let url = URL_PAGE
        + 'lang=' + lang
        + (slug ? '&slug=' + slug : '')
    if (!slug) {
        url += (before ? "&before=" + before.toISOString() : "")
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
            + (parent ? '&parent=' + parent : '')
    }
    return get(url)
}


export const getPost = (slug, type, lang) => {
    return get(API_ROOT + '/wp/v2/' + type + '?slug=' + slug + '&lang=' + lang)
}

export const getPage = (slug, lang) => {
    return get(URL_PAGE + 'slug=' + slug + '&lang=' + lang)
}

export const getMedia = (slug, lang) => {
    return get(URL_MEDIA + '/' + slug + '?lang=' + lang)
}


export const getPagesByParent = (parentId, lang) => {
    return get(URL_PAGE + 'parent=' + parentId + '&lang=' + lang)
}
