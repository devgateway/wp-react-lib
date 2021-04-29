import * as wp from './api'
import Immutable from 'immutable'

const LOAD_MENU = 'LOAD_WP_MENU'
const LOAD_MENU_DONE = 'LOAD_WP_MENU_DONE'
const LOAD_MENU_ERROR = 'LOAD_WP_MENU_ERROR'

const LOAD_TAXONOMY = 'LOAD_WP_TAXONOMY'
const LOAD_TAXONOMY_DONE = 'LOAD_WP_TAXONOMY_DONE'
const LOAD_TAXONOMY_ERROR = 'LOAD_WP_TAXONOMY_ERROR'

const LOAD_POSTS = 'LOAD_WP_POSTS'
const LOAD_POSTS_DONE = 'LOAD_WP_POSTS_DONE'
const LOAD_POSTS_ERROR = 'LOAD_WP_POSTS_ERROR'

const LOAD_CUSTOM_POSTS_BY_TAXONOMY = 'LOAD_CUSTOM_POSTS_BY_TAXONOMY'
const LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE = 'LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE'
const LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR = 'LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR'

const LOAD_POST = 'LOAD_WP_POST'
const LOAD_POST_DONE = 'LOAD_WP_POST_DONE'
const LOAD_POST_ERROR = 'LOAD_WP_POST_ERROR'

const LOAD_PAGE = 'LOAD_WP_PAGE'
const LOAD_PAGE_DONE = 'LOAD_WP_PAGE_DONE'
const LOAD_PAGE_ERROR = 'LOAD_WP_PAGE_ERROR'


const LOAD_PAGES = 'LOAD_PAGES'
const LOAD_PAGES_DONE = 'LOAD_PAGES_DONE'
const LOAD_PAGES_ERROR = 'LOAD_PAGES_ERROR'


const LOAD_MEDIA = 'LOAD_MEDIA'
const LOAD_MEDIA_DONE = 'LOAD_MEDIA_DONE'
const LOAD_MEDIA_ERROR = 'LOAD_MEDIA_ERROR'


const LOAD_CHILD_PAGES = 'LOAD_CHILD_PAGES'
const LOAD_CHILD_PAGES_DONE = 'LOAD_CHILD_PAGES_DONE'
const LOAD_CHILD_PAGES_ERROR = 'LOAD_CHILD_PAGES_ERROR'

const CLEAN_PAGE_DATA = 'CLEAN_PAGE_DATA'


const initialState = Immutable.Map()

//used to transform categories to id
export const loadTaxonomy = (name) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])
    dispatch({type: LOAD_TAXONOMY})
    wp.getTaxonomy(name, locale).then(data => {
        dispatch({type: LOAD_TAXONOMY_DONE, data, name})
    }).catch(error => {
        dispatch({type: LOAD_TAXONOMY_ERROR, name})
    })
}

// api -> getPostsTaxonomy=(type,category,value,lang)=>{

export const getPostByTaxonomy = (wpType, taxonomy, category, categoryId, page, perPage) => (dispatch, getState) => {

    const locale = getState().getIn(['intl', 'locale'])

    const payLoad = {wpType, taxonomy, category}

    dispatch({type: LOAD_CUSTOM_POSTS_BY_TAXONOMY, ...payLoad})

    wp.getPostsByTypeAndTaxonomy(wpType, taxonomy, categoryId, locale, page, perPage)
        .then(data => {
            dispatch({type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE, data: data, ...payLoad})
        })
        .catch(error => {
            dispatch({type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR, error, ...payLoad})
        })
}

export const getPosts = (params) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])
    dispatch({type: LOAD_POSTS, ...params})
    wp.getPosts({...params, lang: locale}).then(data => {
        dispatch({type: LOAD_POSTS_DONE, data, ...params})
    }).catch(error => {
        dispatch({type: LOAD_POSTS_ERROR, error, ...params})
    })
}


export const clean = (params) => (dispatch, getState) => {
    dispatch({type: CLEAN_PAGE_DATA, ...params})

}

export const getPages = (params) => (dispatch, getState) => {
    const {locale} = params
    dispatch({type: LOAD_PAGES, locale})
    wp.getPages({...params, lang: locale}).then(data => {
        dispatch({type: LOAD_PAGES_DONE, data, ...params})
    }).catch(error => {
        dispatch({type: LOAD_PAGES_ERROR, error, ...params})
    })
}


/*
Gt WP Menus  (WP-REST-API V2 Menus plugin requiered)
*/
export const getMenu = (slug) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])

    dispatch({
        type: LOAD_MENU, slug
    })
    wp.getMenu(slug, locale).then(data => {
        dispatch({
            type: LOAD_MENU_DONE, slug,
            data
        })
    }).catch(error => {
        dispatch({
            type: LOAD_MENU_ERROR, slug,
            error
        })
    })
}

//get single post by slug and type
export const getPost = (slug, wpType) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])


    dispatch({type: LOAD_POST, slug})
    wp.getPost(slug, wpType, locale).then(data => {
        dispatch({
            type: LOAD_POST_DONE,
            data,
            slug
        })
    }).catch(error => {
        dispatch({
            type: LOAD_POST_ERROR,
            error,
            slug
        })
    })
}

export const getPage = (slug) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])
    dispatch({type: LOAD_PAGE, slug})
    wp.getPage(slug, locale).then(data => {
        dispatch({type: LOAD_PAGE_DONE, data, slug})
    }).catch(error => {
        dispatch({type: LOAD_PAGE_ERROR, error, slug})
    })
}


export const getMedia = (id) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])
    dispatch({type: LOAD_MEDIA, id})
    wp.getMedia(id, locale).then(data => {
        dispatch({type: LOAD_MEDIA_DONE, data, id})
    }).catch(error => {
        dispatch({type: LOAD_MEDIA_ERROR, error, id})
    })
}


export const getChildPages = (parentId) => (dispatch, getState) => {
    const locale = getState().getIn(['intl', 'locale'])
    dispatch({type: LOAD_CHILD_PAGES, parentId})
    wp.getPagesByParent(parentId, locale).then(data => {

        dispatch({type: LOAD_CHILD_PAGES_DONE, data, parentId})
    }).catch(error => {
        dispatch({type: LOAD_CHILD_PAGES_ERROR, error, parentId})
    })
}


export const getOptionId = (name, lang, getState) => {
    const item = getState().getIn(['wordpress', 'options', 'items'])
        ? getState().getIn(['wordpress', 'options', 'items']).find(i => i.slug == name + '-' + lang)
        : null

    if (item) {
        return item.id
    } else return null;
}

export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_MENU: {
            return state.setIn(['menu', 'loading'], true)
        }
        case LOAD_MENU_DONE: {
            const {
                data, slug
            } = action

            return state.setIn(['menu', slug, 'loading'], false)
                .deleteIn(['menu', slug, 'error'])
                .setIn(['menu', slug, 'menu'], data)
        }
        case LOAD_MENU_ERROR: {
            const {
                data, slug
            } = action
            return state
                .setIn(['menu', slug, 'loading'], false)
                .setIn(['menu', slug, 'error'], action.error)
        }

        /*WP Categories*/
        case LOAD_TAXONOMY: {
            return state.setIn(['categories', 'loading'], true)
        }
        case LOAD_TAXONOMY_DONE: {
            const {data, name} = action

            return state.setIn([name, 'loading'], false)
                .deleteIn([name, 'error'])
                .setIn([name, 'items'], Immutable.fromJS(data))
        }
        case LOAD_TAXONOMY_ERROR: {
            return state
                .setIn(['categories', 'loading'], false)
                .setIn(['categories', 'error'], action.error)
        }

        /*WP Posts*/
        case LOAD_POSTS: {

            const {data, store = 'posts'} = action
            return state.setIn([store, 'loading'], true)

        }
        case LOAD_POSTS_DONE: {

            const {data, store = 'posts'} = action
            return state.setIn([store, 'loading'], false)
                .deleteIn([store, 'error'])
                .setIn([store, "items"], data)

        }
        case LOAD_POSTS_ERROR: {

            const {store = 'posts'} = action
            return state
                .setIn([store, 'loading'], false)
                .setIn([store, 'error'], action.error)

        }

        /*CUSTOM POST TYPES*/
        case LOAD_CUSTOM_POSTS_BY_TAXONOMY: {
            const {wpType, taxonomy, category} = action
            return state.setIn([wpType, taxonomy, category, 'loading'], true)

        }
        case LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE: {
            const {data, wpType, taxonomy, category} = action
            return state.setIn([wpType, taxonomy, category, 'loading'], false)
                .deleteIn([wpType, taxonomy, category, 'error'])
                .setIn([wpType, taxonomy, category, 'items'], data)
        }
        case LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR: {
            const {wpType, taxonomy, category} = action
            return state
                .setIn([wpType, taxonomy, category, 'loading'], false)
                .setIn([wpType, taxonomy, category, 'error'], action.error)
        }



        /*WP Posts*/
        case LOAD_POST: {
            const {slug, category} = action
            const path = ['post']
            if (category) {
                path.push(category)
            }
            return state.setIn([...path, slug, 'loading'], true)
        }
        case LOAD_POST_DONE: {

            const {slug, category, data} = action
            const path = ['post']
            if (category) {
                path.push(category)
            }
            return state.setIn([...path, slug, 'loading'], false)
                .deleteIn([...path, slug, 'error'])
                .setIn([...path, slug, 'content'], data)
        }
        case LOAD_POST_ERROR: {
            const {slug, category} = action
            const path = ['post']
            if (category) {
                path.push(category)
            }
            return state
                .setIn([...path, slug, 'loading'], false)
                .setIn([...path, slug, 'error'], action.error)
        }

        /*WP pages*/
        case LOAD_PAGE: {
            const {slug} = action
            return state.setIn(['page', slug, 'loading'], true)
        }
        case LOAD_PAGE_DONE: {
            const {data, slug} = action
            return state.setIn(['page', slug, 'loading'], false)
                .deleteIn(['page', slug, 'error'])
                .setIn(['page', slug, 'content'], data)
        }
        case LOAD_PAGE_ERROR: {
            const {slug} = action
            return state
                .setIn(['page', slug, 'loading'], false)
                .setIn(['page', slug, 'error'], action.error)
        }


        case LOAD_PAGES: {
            const {store} = action
            return state.setIn(['pages', store, 'loading'], true)
        }
        case LOAD_PAGES_DONE: {
            const {data, store} = action
            return state.setIn(['pages', store, 'loading'], false)
                .deleteIn(['pages', store, 'error'])
                .setIn(['pages', store, 'items'], data)
        }
        case LOAD_PAGES_ERROR: {
            const {store} = action
            return state
                .setIn(['pages', store, 'loading'], false)
                .setIn(['pages', store, 'error'], action.error)
        }

        case CLEAN_PAGE_DATA: {
            const {data, store} = action
            return state.setIn(['pages', store, 'loading'], true)
                .deleteIn(['pages', store, 'error'])
                .deleteIn(['pages', store, 'items'])
        }

        /*WP pages*/
        case LOAD_MEDIA: {
            const {id} = action
            return state.setIn(['media', id, 'loading'], true)
        }
        case LOAD_MEDIA_DONE: {
            const {data, id} = action
            return state.setIn(['media', id, 'loading'], false)
                .deleteIn(['media', id, 'error'])
                .setIn(['media', id, 'content'], data)
        }
        case LOAD_MEDIA_ERROR: {
            const {id} = action
            return state
                .setIn(['media', id, 'loading'], false)
                .setIn(['media', id, 'error'], action.error)
        }


        case LOAD_CHILD_PAGES: {
            const {parentId} = action
            return state.setIn(['child', parentId, 'loading'], true)
        }
        case LOAD_CHILD_PAGES_DONE: {
            const {data, parentId} = action

            return state.setIn(['children', parentId, 'loading'], false)
                .deleteIn(['children', parentId, 'error'])
                .setIn(['children', parentId, 'items'], data)
        }
        case LOAD_CHILD_PAGES_ERROR: {
            const {parentId} = action
            return state
                .setIn(['children', parentId, 'loading'], false)
                .setIn(['children', parentId, 'error'], action.error)
        }

        default:
            return state
    }
}
