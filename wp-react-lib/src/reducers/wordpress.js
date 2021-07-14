import Immutable from 'immutable'
import {
    CLEAN_PAGE_DATA,
    LOAD_CHILD_PAGES,
    LOAD_CHILD_PAGES_DONE,
    LOAD_CHILD_PAGES_ERROR,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR,
    LOAD_MEDIA,
    LOAD_MEDIA_DONE,
    LOAD_MEDIA_ERROR,
    LOAD_MENU,
    LOAD_MENU_DONE,
    LOAD_MENU_ERROR,
    LOAD_PAGE,
    LOAD_PAGE_DONE,
    LOAD_PAGE_ERROR,
    LOAD_PAGES,
    LOAD_PAGES_DONE,
    LOAD_PAGES_ERROR,
    LOAD_POST,
    LOAD_POST_DONE,
    LOAD_POST_ERROR,
    LOAD_POSTS,
    LOAD_POSTS_DONE,
    LOAD_POSTS_ERROR,
    LOAD_SEARCH,
    LOAD_SEARCH_DONE,
    LOAD_SEARCH_ERROR,
    LOAD_TAXONOMY,
    LOAD_TAXONOMY_DONE,
    LOAD_TAXONOMY_ERROR,
} from "./constans";


const initialState = Immutable.Map()


export default (state = initialState, action) => {

    switch (action.type) {

        case LOAD_MENU: {
            return state.setIn(['menu', 'loading'], true)
        }
        case LOAD_MENU_DONE: {
            const {data, slug, meta} = action
            return state.setIn(['menu', slug, 'loading'], false)
                .deleteIn(['menu', slug, 'error'])
                .setIn(['menu', slug, 'meta'], meta)
                .setIn(['menu', slug, 'menu'], data)
        }
        case LOAD_MENU_ERROR: {
            const {data, slug} = action
            return state
                .setIn(['menu', slug, 'loading'], false)
                .setIn(['menu', slug, 'error'], action.error)
        }

        /*WP Categories*/
        case LOAD_TAXONOMY: {
            const {slug} = action
            return state.setIn(['categories', 'loading'], true)
        }
        case LOAD_TAXONOMY_DONE: {
            const {data, name} = action
            return state.setIn([name, 'loading'], false)
                .deleteIn([name, 'error'])
                .setIn([name, 'items'], Immutable.fromJS(data))
        }
        case LOAD_TAXONOMY_ERROR: {
            return state.setIn(['categories', 'loading'], false)
                .setIn(['categories', 'error'], action.error)
        }

        /*WP Posts*/
        case LOAD_POSTS: {
            const {data, store} = action
            return state.setIn([store, 'loading'], true)

        }
        case LOAD_POSTS_DONE: {
            const {data, meta, store} = action
            return state.setIn([store, 'loading'], false)
                .deleteIn([store, 'error'])
                .setIn([store, 'meta'], meta)
                .setIn([store, "items"], data)

        }
        case LOAD_POSTS_ERROR: {
            const {store} = action
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
            const {data, wpType, taxonomy, category, meta} = action
            return state.setIn([wpType, taxonomy, category, 'loading'], false)
                .deleteIn([wpType, taxonomy, category, 'error'])
                .setIn([wpType, taxonomy, category, 'meta'], meta)
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
            return state.setIn([store, 'loading'], true)
        }
        case LOAD_PAGES_DONE: {
            const {data, store, meta} = action
            return state.setIn([store, 'loading'], false)
                .deleteIn([store, 'error'])
                .setIn([store, 'meta'], meta)
                .setIn([store, 'items'], data)
        }
        case LOAD_PAGES_ERROR: {
            const {store} = action
            return state
                .setIn([store, 'loading'], false)
                .setIn([store, 'error'], action.error)
        }

        case LOAD_SEARCH: {
            const {store} = action
            return state.setIn([store, 'loading'], true)
        }
        case LOAD_SEARCH_DONE: {
            const {data, store, meta} = action
            return state.setIn([store, 'loading'], false)
                .deleteIn([store, 'error'])
                .setIn([store, 'meta'], meta)
                .setIn([store, 'items'], data)
        }
        case LOAD_SEARCH_ERROR: {
            const {store} = action
            return state
                .setIn([store, 'loading'], false)
                .setIn([store, 'error'], action.error)
        }
        case CLEAN_PAGE_DATA: {
            const {data, store} = action
            return state.setIn([store, 'loading'], true)
                .deleteIn([store, 'error'])
                .deleteIn([store, 'items'])
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
