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
    LOAD_SEARCH,
    LOAD_SEARCH_DONE,
    LOAD_SEARCH_ERROR,
    LOAD_SETTINGS,
    LOAD_SETTINGS_DONE,
    LOAD_SETTINGS_ERROR,
    LOAD_TAXONOMY,
    LOAD_TAXONOMY_DONE,
    LOAD_TAXONOMY_ERROR,
    LOAD_CATEGORIES,
    LOAD_CATEGORIES_DONE,
    LOAD_CATEGORIES_ERROR
} from "./constants";

import * as wp from '../api';

//used to transform categories to id
export const loadTaxonomy = ({ taxonomy, locale = "en" }) => (dispatch, getState) => {
    dispatch({ type: LOAD_TAXONOMY });
    wp.getTaxonomy(taxonomy, locale).then(response => {
        const { data, meta } = response;
        dispatch({ type: LOAD_TAXONOMY_DONE, data, meta, taxonomy });
    }).catch(error => {
        dispatch({ type: LOAD_TAXONOMY_ERROR, taxonomy });
    });
};

// api -> getPostsTaxonomy=(type,category,value,lang)=>{
export const getPostByTaxonomy = ({
    wpType,
    taxonomy,
    category,
    categoryId,
    page,
    perPage,
    locale = "en"
}) => (dispatch, getState) => {
    const payLoad = { wpType, taxonomy, category };

    dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY, ...payLoad });

    wp.getPostsByTypeAndTaxonomy({ type: wpType, category: taxonomy, value: categoryId, locale, page, perPage })
        .then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE, data, meta, ...payLoad });
        })
        .catch(error => {
            dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR, error, ...payLoad });
        });
};

export const getPosts = ({
    slug,
    type,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields,
    store,
    locale = "en",
    previewNonce,
    previewId,
    search,
    after
}) => (dispatch, getState) => {

    dispatch({ type: LOAD_POSTS, slug, taxonomy, categories, before, perPage, page, fields, store, locale, after });

    wp.getPosts({ slug, type, taxonomy, categories, before, perPage, page, fields, locale, previewNonce, previewId, search, after })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_POSTS_DONE,
                data,
                slug,
                taxonomy,
                categories,
                before,
                perPage,
                page,
                fields,
                store,
                locale,
                previewNonce,
                previewId,
                after,
                meta
            });

        }).catch(error => {
            dispatch({
                type: LOAD_POSTS_ERROR,
                error,
                slug,
                taxonomy,
                categories,
                before,
                perPage,
                page,
                fields,
                store,
                locale,
                previewNonce,
                previewId,
                after
            });
        });
};

export const clean = (params) => (dispatch, getState) => {
    dispatch({ type: CLEAN_PAGE_DATA, ...params });

};

export const search = ({ context, page, perPage, search, type, subtype, store, locale }) => (dispatch, getState) => {
    dispatch({ type: LOAD_SEARCH, store });
    wp.search(context, page, perPage, search, type, subtype, locale)
        .then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_SEARCH_DONE, store, data, meta });
        })
        .catch(error => {
            dispatch({ type: LOAD_SEARCH_ERROR, store });
        });
};

export const getPages = ({
    before,
    perPage,
    page,
    fields,
    parent,
    slug,
    store,
    locale = "en",
    previewNonce,
    previewId,
    search
}) => (dispatch, getState) => {

    dispatch({ type: LOAD_PAGES, store });
    wp.getPages({ before, perPage, page, fields, parent, slug, locale, previewNonce, previewId, search })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_PAGES_DONE,
                data,
                meta,
                before,
                perPage,
                page,
                fields,
                parent,
                slug,
                store,
                locale,
                previewNonce,
                previewId
            });
        }).catch(error => {
            dispatch({
                type: LOAD_PAGES_ERROR,
                error,
                before,
                perPage,
                page,
                fields,
                parent,
                slug,
                store,
                locale,
                previewNonce,
                previewId
            });
        });
};

/*
Gt WP Menus  (WP-REST-API V2 Menus plugin requiered)
*/
export const getMenu = ({ slug, locale = "en" }) => (dispatch, getState) => {
    dispatch({ type: LOAD_MENU, slug });
    wp.getMenu(slug, locale).then(response => {
        const { data, meta } = response;
        dispatch({ type: LOAD_MENU_DONE, slug, data, meta });
    }).catch(error => {
        dispatch({ type: LOAD_MENU_ERROR, slug, error });
    });
};


export const getSettings = ({ locale = "en", changeUUID = null }) => (dispatch, getState) => {
    dispatch({ type: LOAD_SETTINGS });
    wp.getSettings(locale, changeUUID).then(response => {
        const { data, meta } = response;
        dispatch({ type: LOAD_SETTINGS_DONE, data, meta });
    }).catch(error => {
        dispatch({ type: LOAD_SETTINGS_ERROR, error });
    });
};

export const getMedia = ({ id, locale = "en" }) => (dispatch, getState) => {
    dispatch({ type: LOAD_MEDIA, id });
    wp.getMedia(id, locale).then(response => {
        const { data, meta } = response;
        dispatch({ type: LOAD_MEDIA_DONE, data, meta, id });
    }).catch(error => {
        dispatch({ type: LOAD_MEDIA_ERROR, error, id });
    });
};

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
    store
}) => (dispatch, getState) => {
    dispatch({ type: LOAD_CATEGORIES, context, page, perPage, search, exclude, include, order, orderby, hideEmpty, parent, post, slug, locale, store });
    wp.getCategories({ context, page, perPage, search, exclude, include, order, orderby, hideEmpty, parent, post, slug, locale })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_CATEGORIES_DONE,
                data,
                meta,
                context,
                page,
                perPage,
                search,
                exclude,
                include,
                order,
                orderby,
                hideEmpty,
                parent,
                post,
                slug,
                locale,
                store
            });
        })
        .catch(error => {
            dispatch({
                type: LOAD_CATEGORIES_ERROR,
                error,
                context,
                page,
                perPage,
                search,
                exclude,
                include,
                order,
                orderby,
                hideEmpty,
                parent,
                post,
                slug,
                locale,
                store
            });
        });
};
