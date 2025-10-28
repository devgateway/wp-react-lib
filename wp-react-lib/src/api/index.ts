import type { PageResponse } from "../post-type"
import type { DgSettings, Media } from "../types"

// @ts-ignore Types not available
const API_ROOT = import.meta.env.VITE_REACT_APP_WP_API ?? process.env.VITE_REACT_APP_WP_API ?? '/wp/wp-json'
// const URL_MENU = API_ROOT + '/menus/v1/menus/'

// const URL_API_BASE = API_ROOT + '/wp/v2/'

// const URL_PAGE = API_ROOT + '/wp/v2/pages'
// // @ts-ignore
// const URL_SEARCH = API_ROOT + (import.meta.env.VITE_REACT_APP_WP_SEARCH_END_POINT ?? process.env.VITE_REACT_APP_WP_SEARCH_END_POINT ?? '/wp/v2/search')

// const URL_MEDIA = API_ROOT + '/wp/v2/media'

// const URL_SETTINGS = API_ROOT + '/dg/v1/settings';

// const URL_CATEGORIES = API_ROOT + '/wp/v2/categories'

// const URL_YEAR_RANGE = API_ROOT + '/util-api/v1/year-range'


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
    console.log("get", url);
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


export const getTaxonomy = (name: string, locale: string, apiBaseUrl: string = API_ROOT + '/wp/v2/') => {
    const apiUrl = apiBaseUrl + "/wp/v2/"
    return get(apiUrl + "" + name + '?lang=' + locale + '&per_page=100')

}

//TODO:make a unique getPost method
export const getPostsByTypeAndTaxonomy = (
    {type, category, value, locale, page = 1, perPage = 1, apiBaseUrl}:
    {type: string, category: string, value: string, locale: string, page?: number, perPage?: number, apiBaseUrl?: string}) => {
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/wp/v2/" : API_ROOT + '/wp/v2/';
    return get(apiUrl + type + "?_embed&" + category + '=' + value + '&lang=' + locale + '&per_page=' + perPage + '&page=' + page)
}


export const getSettings=(locale: string,changeUUID?: string, apiBaseUrl?: string) : Promise<DgSettings> =>{
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/dg/v1/settings" : API_ROOT + '/dg/v1/settings';
    return get(apiUrl+'?cacheBust='+((Math.random() + 1).toString(36).substring(7))+'&lang='+locale+(changeUUID?'&customize_changeset_uuid='+changeUUID:'')) as Promise<DgSettings>
}

export const getMenu = (name: string, locale: string, apiBaseUrl?: string) => {
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/menus/v1/menus/" : API_ROOT + '/menus/v1/menus/';
    return get(apiUrl + name + '?lang=' + locale)
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
    search,
    after,
    apiBaseUrl
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
    after?: Date;
    apiBaseUrl?: string;
}) => {

    let url = apiBaseUrl ? apiBaseUrl + "/wp/v2/" : API_ROOT + '/wp/v2/';
    url += (type ?? 'posts')

    if (previewId) {
        url += '/' + previewId + '/revisions'
            + (previewNonce ? '?_wpnonce=' + previewNonce + '&' : '')
    } else {
        url += "?"
    }

    url += 'lang=' + locale
        + (slug ? '&slug=' + slug : '')
    if (!slug) {
        url += (categories ? (taxonomy ? '&' + taxonomy : '&categories')
            + "=" + (categories ? categories : "") : '') //ids
            + (perPage ? '&per_page=' + perPage : '')
            + (page ? '&page=' + page : '')
            + (fields ? '&_fields=' + fields : '')
            + (search ? '&search=' + search : '')

        if (before !== null && before !== undefined) {
            if (before instanceof Date) {
                url += "&before=" + before.toISOString();
            } else {
                url += "&before=" + before;
            }
        }
        if (after !== null && after !== undefined) {
            if (after instanceof Date) {
                url += "&after=" + after.toISOString();
            } else {
                url += "&after=" + after;
            }
        }
    }
    return get(url)
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
    noCache,
    apiBaseUrl
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
    apiBaseUrl?: string;
}) => {
    let url = apiBaseUrl ? apiBaseUrl + "/wp/v2/pages" : API_ROOT + '/wp/v2/pages'

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
    console.log("url==>", url);
    return get(url) as Promise<PageResponse>
}

export const search = (
    context?: string,
    page?: number,
    perPage?: number,
    search?: string,
    type?: string,
    subtype?: string,
    locale?: string,
    apiBaseUrl?: string) => {
    let url = apiBaseUrl ? apiBaseUrl + "/dg/v1/search" : API_ROOT + '/dg/v1/search';
    url += '?lang=' + locale
        + (context ? "&context=" + context : '')
        + (perPage ? '&per_page=' + perPage : '')
        + (page ? '&page=' + page : '')
        + (search ? '&search=' + search : '')
        + (type ? '&type=' + type : '')
        + (subtype ? '&subtype=' + subtype : '')

    return get(url)
}

export const getMedia = (slug: string, locale: string, apiBaseUrl?: string) : Promise<Media> => {
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/wp/v2/media" : API_ROOT + '/wp/v2/media';
    return get(apiUrl + '/' + slug + '?lang=' + locale) as Promise<Media>;
}

export const getCategories = ({
    context = 'view',
    page = 1,
    perPage = 10,
    search,
    exclude,
    include,
    order = 'asc',
    orderby = 'name',
    hideEmpty,
    parent,
    post,
    slug,
    locale,
    apiBaseUrl
}: {
    context?: string;
    page?: number;
    perPage?: number;
    search?: string;
    exclude?: string;
    include?: string;
    order?: string;
    orderby?: string;
    hideEmpty?: boolean;
    parent?: string;
    post?: string;
    slug?: string;
    locale?: string;
    apiBaseUrl?: string;
})=> {
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/wp/v2/categories" : API_ROOT + '/wp/v2/categories';
    let url = apiUrl + '?lang=' + locale
    + (context ? '&context=' + context : '')
    + (page ? '&page=' + page : '')
    + (perPage ? '&per_page=' + perPage : '')
    + (search ? '&search=' + search : '')
    + (exclude ? '&exclude=' + exclude : '')
    + (include ? '&include=' + include : '')
    + (order ? '&order=' + order : '')
    + (orderby ? '&orderby=' + orderby : '')
    + (hideEmpty ? '&hide_empty=' + hideEmpty : '')
    + (parent ? '&parent=' + parent : '')
    + (post ? '&post=' + post : '')
    + (slug ? '&slug=' + slug : '')
    return get(url)
}

export const getYearRange = (apiBaseUrl?: string) => {
    const apiUrl = apiBaseUrl ? apiBaseUrl + "/util-api/v1/year-range" : API_ROOT + '/util-api/v1/year-range';

    return get(apiUrl)
}
