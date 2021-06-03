import { CLEAN_PAGE_DATA, LOAD_CHILD_PAGES, LOAD_CHILD_PAGES_DONE, LOAD_CHILD_PAGES_ERROR, LOAD_CUSTOM_POSTS_BY_TAXONOMY, LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE, LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR, LOAD_MEDIA, LOAD_MEDIA_DONE, LOAD_MEDIA_ERROR, LOAD_MENU, LOAD_MENU_DONE, LOAD_MENU_ERROR, LOAD_PAGE, LOAD_PAGE_DONE, LOAD_PAGE_ERROR, LOAD_PAGES, LOAD_PAGES_DONE, LOAD_PAGES_ERROR, LOAD_POST, LOAD_POST_DONE, LOAD_POST_ERROR, LOAD_POSTS, LOAD_POSTS_DONE, LOAD_POSTS_ERROR, LOAD_TAXONOMY, LOAD_TAXONOMY_DONE, LOAD_TAXONOMY_ERROR } from "./constans";
import * as wp from '../api'; //used to transform categories to id

export const loadTaxonomy = (name, locale) => (dispatch, getState) => {
  dispatch({
    type: LOAD_TAXONOMY
  });
  wp.getTaxonomy(name, locale).then(data => {
    dispatch({
      type: LOAD_TAXONOMY_DONE,
      data,
      name
    });
  }).catch(error => {
    dispatch({
      type: LOAD_TAXONOMY_ERROR,
      name
    });
  });
}; // api -> getPostsTaxonomy=(type,category,value,lang)=>{

export const getPostByTaxonomy = (wpType, taxonomy, category, categoryId, page, perPage, locale) => (dispatch, getState) => {
  const payLoad = {
    wpType,
    taxonomy,
    category
  };
  dispatch({
    type: LOAD_CUSTOM_POSTS_BY_TAXONOMY,
    ...payLoad
  });
  wp.getPostsByTypeAndTaxonomy(wpType, taxonomy, categoryId, locale, page, perPage).then(data => {
    dispatch({
      type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE,
      data: data,
      ...payLoad
    });
  }).catch(error => {
    dispatch({
      type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR,
      error,
      ...payLoad
    });
  });
};
export const getPosts = params => (dispatch, getState) => {
  dispatch({
    type: LOAD_POSTS,
    ...params
  });
  wp.getPosts({ ...params
  }).then(data => {
    dispatch({
      type: LOAD_POSTS_DONE,
      data,
      ...params
    });
  }).catch(error => {
    dispatch({
      type: LOAD_POSTS_ERROR,
      error,
      ...params
    });
  });
};
export const clean = params => (dispatch, getState) => {
  dispatch({
    type: CLEAN_PAGE_DATA,
    ...params
  });
};
export const getPages = params => (dispatch, getState) => {
  const {
    locale
  } = params;
  dispatch({
    type: LOAD_PAGES,
    locale
  });
  wp.getPages({ ...params,
    lang: locale
  }).then(data => {
    dispatch({
      type: LOAD_PAGES_DONE,
      data,
      ...params
    });
  }).catch(error => {
    dispatch({
      type: LOAD_PAGES_ERROR,
      error,
      ...params
    });
  });
};
/*
Gt WP Menus  (WP-REST-API V2 Menus plugin requiered)
*/

export const getMenu = slug => (dispatch, getState) => {
  const locale = getState().getIn(['intl', 'locale']);
  dispatch({
    type: LOAD_MENU,
    slug
  });
  wp.getMenu(slug, locale).then(data => {
    dispatch({
      type: LOAD_MENU_DONE,
      slug,
      data
    });
  }).catch(error => {
    dispatch({
      type: LOAD_MENU_ERROR,
      slug,
      error
    });
  });
}; //get single post by slug and type

export const getPost = (slug, wpType) => (dispatch, getState) => {
  const locale = getState().getIn(['intl', 'locale']);
  dispatch({
    type: LOAD_POST,
    slug
  });
  wp.getPost(slug, wpType, locale).then(data => {
    dispatch({
      type: LOAD_POST_DONE,
      data,
      slug
    });
  }).catch(error => {
    dispatch({
      type: LOAD_POST_ERROR,
      error,
      slug
    });
  });
};
export const getPage = slug => (dispatch, getState) => {
  const locale = getState().getIn(['intl', 'locale']);
  dispatch({
    type: LOAD_PAGE,
    slug
  });
  wp.getPage(slug, locale).then(data => {
    dispatch({
      type: LOAD_PAGE_DONE,
      data,
      slug
    });
  }).catch(error => {
    dispatch({
      type: LOAD_PAGE_ERROR,
      error,
      slug
    });
  });
};
export const getMedia = id => (dispatch, getState) => {
  const locale = getState().getIn(['intl', 'locale']);
  dispatch({
    type: LOAD_MEDIA,
    id
  });
  wp.getMedia(id, locale).then(data => {
    dispatch({
      type: LOAD_MEDIA_DONE,
      data,
      id
    });
  }).catch(error => {
    dispatch({
      type: LOAD_MEDIA_ERROR,
      error,
      id
    });
  });
};
export const getChildPages = parentId => (dispatch, getState) => {
  const locale = getState().getIn(['intl', 'locale']);
  dispatch({
    type: LOAD_CHILD_PAGES,
    parentId
  });
  wp.getPagesByParent(parentId, locale).then(data => {
    dispatch({
      type: LOAD_CHILD_PAGES_DONE,
      data,
      parentId
    });
  }).catch(error => {
    dispatch({
      type: LOAD_CHILD_PAGES_ERROR,
      error,
      parentId
    });
  });
};
export const getOptionId = (name, lang, getState) => {
  const item = getState().getIn(['wordpress', 'options', 'items']) ? getState().getIn(['wordpress', 'options', 'items']).find(i => i.slug == name + '-' + lang) : null;

  if (item) {
    return item.id;
  } else return null;
};