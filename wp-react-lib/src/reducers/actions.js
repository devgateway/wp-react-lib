import {
    CLEAN_PAGE_DATA,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR,
    LOAD_MEDIA,
    LOAD_MEDIA_DONE,
    LOAD_MEDIA_ERROR,
    LOAD_MENU,
    LOAD_MENU_DONE,
    LOAD_MENU_ERROR,
    LOAD_PAGES,
    LOAD_PAGES_DONE,
    LOAD_PAGES_ERROR,
    LOAD_POSTS,
    LOAD_POSTS_DONE,
    LOAD_POSTS_ERROR,
    LOAD_TAXONOMY,
    LOAD_TAXONOMY_DONE,
    LOAD_TAXONOMY_ERROR
} from "./constans";

import * as wp from '../api'

//used to transform categories to id
export const loadTaxonomy = (taxonomy, locale) => (dispatch, getState) => {
    dispatch({type: LOAD_TAXONOMY})
    wp.getTaxonomy(taxonomy, locale).then(data => {
        dispatch({type: LOAD_TAXONOMY_DONE, data, taxonomy})
    }).catch(error => {
        dispatch({type: LOAD_TAXONOMY_ERROR, taxonomy})
    })
}

// api -> getPostsTaxonomy=(type,category,value,lang)=>{
export const getPostByTaxonomy = (wpType, taxonomy, category, categoryId, page, perPage, locale) => (dispatch, getState) => {
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
    dispatch({type: LOAD_POSTS, ...params})
    wp.getPosts({...params}).then(data => {
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
export const getMenu = (slug, locale) => (dispatch, getState) => {

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


export const getMedia = (id, locale) => (dispatch, getState) => {

    dispatch({type: LOAD_MEDIA, id})
    wp.getMedia(id, locale).then(data => {
        dispatch({type: LOAD_MEDIA_DONE, data, id})
    }).catch(error => {
        dispatch({type: LOAD_MEDIA_ERROR, error, id})
    })
}


