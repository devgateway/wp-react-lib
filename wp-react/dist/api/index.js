const API_ROOT = process.env.REACT_APP_WP_API;
const URL_MENU = API_ROOT + '/menus/v1/menus/';
const URL_API_BASE = API_ROOT + '/wp/v2/';
const URL_POSTS = API_ROOT + '/wp/v2/posts';
const URL_POST = API_ROOT + '/wp/v2/posts?slug=';
const URL_PAGE = API_ROOT + '/wp/v2/pages?';
const URL_MEDIA = API_ROOT + '/wp/v2/media';
export const post = (url, params, isBlob) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(params)
    }).then(function (response) {
      if (response.status !== 200) {
        reject(response);
      }

      if (isBlob) {
        resolve(response.blob());
      }

      response.json().then(function (data) {
        resolve(data);
      }).catch(() => resolve(response.status));
    }).catch(function (err) {
      reject(err);
    });
  });
};
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(function (response) {
      if (response.status !== 200) {
        reject(response);
      }

      response.json().then(function (data) {
        resolve(data);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};
export const queryParams = params => {
  return Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
};
export const getTaxonomy = (name, lang) => {
  return get(URL_API_BASE + "" + name + '?lang=' + lang + '&per_page=100');
}; //TODO:make a unique getPost method

export const getPostsByTypeAndTaxonomy = (type, category, value, lang = 'en', page = 1, perPage = 1) => {
  return get(URL_API_BASE + type + "?_embed&" + category + '=' + value + '&lang=' + lang + '&per_page=' + perPage + '&page=' + page);
};
export const getMenu = (name, lang) => {
  return get(URL_MENU + name + '?lang=' + lang);
};
export const getPosts = params => {
  //language , categories id, date before, record per page, number of page, fields to be included, post type
  const {
    lang,
    slug,
    wType: type,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields
  } = params;
  let url = URL_API_BASE + (type ? type : 'posts') + '?_embed=true&lang=' + lang + (slug ? '&slug=' + slug : '');

  if (!slug) {
    url += (categories ? (taxonomy ? '&' + taxonomy : '&categories') + "=" + (categories ? categories : "") : '') + ( //ids
    before ? "&before=" + before.toISOString() : "") + (perPage ? '&per_page=' + perPage : '') + (page ? '&page=' + page : '') + (fields ? '&_fields=' + fields : '');
  }

  return get(url);
};
export const getPages = params => {
  const {
    lang,
    slug,
    before,
    perPage,
    page,
    parent,
    fields
  } = params;
  let url = URL_PAGE + 'lang=' + lang + (slug ? '&slug=' + slug : '');

  if (!slug) {
    url += (before ? "&before=" + before.toISOString() : "") + (perPage ? '&per_page=' + perPage : '') + (page ? '&page=' + page : '') + (fields ? '&_fields=' + fields : '') + (parent ? '&parent=' + parent : '');
  }

  return get(url);
};
export const getPost = (slug, type, lang) => {
  return get(API_ROOT + '/wp/v2/' + type + '?slug=' + slug + '&lang=' + lang);
};
export const getPage = (slug, lang) => {
  return get(URL_PAGE + 'slug=' + slug + '&lang=' + lang);
};
export const getMedia = (slug, lang) => {
  return get(URL_MEDIA + '/' + slug + '?lang=' + lang);
};
export const getPagesByParent = (parentId, lang) => {
  return get(URL_PAGE + 'parent=' + parentId + '&lang=' + lang);
};