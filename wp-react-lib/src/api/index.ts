import type { PageResponse } from "../post-type"
import type { DgSettings, Media } from "../types"

const API_ROOT = process.env.VITE_REACT_APP_WP_API ?? '/wp/wp-json'
const URL_MENU = API_ROOT + '/menus/v1/menus/'

const URL_API_BASE = API_ROOT + '/wp/v2/'

const URL_PAGE = API_ROOT + '/wp/v2/pages'

const URL_SEARCH = API_ROOT + (process.env.VITE_REACT_APP_WP_SEARCH_END_POINT ?? '/wp/v2/search')

const URL_MEDIA = API_ROOT + '/wp/v2/media'

const URL_SETTINGS = API_ROOT + '/dg/v1/settings'


export const post = (url: string, params: Record<string, unknown>, isBlob?: boolean) => {

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
                        const meta: Record<string, string> = {}
                        response.headers.forEach((header, name) => {
                            meta[name] = header

                        })
                        resolve({data: response.blob(), meta})
                    }
                    response.json().then(function (data) {
                        const meta: Record<string, string> = {}
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
export const get = (url: string, _params: Record<string, unknown> = {}) => {
    return new Promise((resolve, reject) => {

        fetch(url, {credentials: 'include'})
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    response.json().then(function (data) {
                        const meta: Record<string, string> = {}
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

export const queryParams = (params: Record<string, any>) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}


export const getTaxonomy = (name: string, locale: string) => {
    return get(URL_API_BASE + "" + name + '?lang=' + locale + '&per_page=100')

}

//TODO:make a unique getPost method
export const getPostsByTypeAndTaxonomy = (
    {type, category, value, locale, page = 1, perPage = 1}:
    {type: string, category: string, value: string, locale: string, page?: number, perPage?: number}) => {
    return get(URL_API_BASE + type + "?_embed&" + category + '=' + value + '&lang=' + locale + '&per_page=' + perPage + '&page=' + page)
}


export const getSettings=(locale: string,changeUUID?: string) : Promise<DgSettings> =>{
    return get(URL_SETTINGS+'?cacheBust='+((Math.random() + 1).toString(36).substring(7))+'&lang='+locale+(changeUUID?'&customize_changeset_uuid='+changeUUID:'')) as Promise<DgSettings>
}

export const getMenu = (name: string, locale: string) => {
    return get(URL_MENU + name + '?lang=' + locale)
}

export const getPosts = ({
    slug,
    type,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields,
    locale,
    previewNonce,
    previewId,
    search
}: {
    slug?: string;
    type?: string;
    taxonomy?: string;
    categories?: string;
    before?: Date;
    perPage?: number;
    page?: number;
    fields?: string;
    locale?: string;
    previewNonce?: string;
    previewId?: string;
    search?: string;
}) => {
    //language , categories id, date before, record per page, number of page, fields to be included, post type
    //const {lang, slug, wType: type, taxonomy, categories, before, perPage, page, fields} = params

    let url = URL_API_BASE + (type ?? 'posts')
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
                + "=" + (categories ??  "") : '') //ids
            + (before ? "&before=" + before.toISOString() : "")
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
            + (search ? '&search=' + search : '')
    }

    //url += "&lang=" + locale
    return get(url);
}

export const getPages = ({
    before,
    perPage,
    page,
    fields,
    parent,
    slug,
    locale,
    previewNonce,
    previewId,
    search,
    noCache
}: {
    before?: Date;
    perPage?: number;
    page?: number;
    fields?: string;
    parent?: string;
    slug?: string;
    locale?: string;
    previewNonce?: string;
    previewId?: string;
    search?: string;
    noCache?: boolean;
}) => {
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
            + (noCache ? '&cacheBust='+((Math.random() + 1).toString(36).substring(7)) : '')
    }
    return get(url) as Promise<PageResponse>
}

export const search = (
    context?: string,
    page?: number,
    perPage?: number,
    search?: string,
    type?: string,
    subtype?: string,
    locale?: string) => {
    let url = URL_SEARCH + '?lang=' + locale
        + (context ? "&context=" + context : '')
        + (perPage ? '&per_page=' + perPage : '')
        + (page ? '&page=' + page : '')
        + (search ? '&search=' + search : '')
        + (type ? '&type=' + type : '')
        + (subtype ? '&subtype=' + subtype : '')

    return get(url)
}

export const getMedia = (slug: string, locale: string) : Promise<Media> => {
    return get(URL_MEDIA + '/' + slug + '?lang=' + locale) as Promise<Media>;
}




/*
export const getSettings = (slug, locale) => {
    return get(URL_SETTINGS)
}*/
