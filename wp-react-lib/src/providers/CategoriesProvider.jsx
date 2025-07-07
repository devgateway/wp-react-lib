import React, { useEffect, useRef } from 'react';
import LocalizedProvider from "./LocalizedProvider";
import { CategoriesContext } from './Context';
import { getCategories } from '../reducers/actions'
import { useDispatch, useSelector } from 'react-redux';

const CategoriesProvider = (props) => {
    const {
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
        store = 'categories',
        children
    } = props;

    const dispatch = useDispatch();

    const meta = useSelector(state => state.getIn(['wordpress', store, 'meta']));
    const categories = useSelector(state => {
        const items = state.getIn(['wordpress', store, 'items']);
        return items ? items.toJS() : null;
    });
    const error = useSelector(state => state.getIn(['wordpress', store, 'error']));
    const loading = useSelector(state => state.getIn(['wordpress', store, 'loading']));

    console.log("categories", categories, "loading", loading, "error", error);

    const prevProps = useRef({context, page, perPage, search, exclude, include, order, orderby, hideEmpty, parent, post, slug, locale}).current;

    useEffect(() => {
        if (context != prevProps.context || page != prevProps.page || perPage != prevProps.perPage
            || search != prevProps.search || exclude != prevProps.exclude || include != prevProps.include
            || order != prevProps.order || orderby != prevProps.orderby || hideEmpty != prevProps.hideEmpty
            || parent != prevProps.parent || post != prevProps.post || slug != prevProps.slug || locale != prevProps.locale) {
            dispatch(getCategories({
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
            }));
        }
    }, [context, page, perPage, search, exclude, include, order, orderby, hideEmpty, parent, post, slug, locale]);

    useEffect(() => {
        dispatch(getCategories({
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
        }));
    }, []);

    if (error) {
        return (
            <CategoriesContext.Provider value={{ categories: null, loading: false, error, meta }}>
                {children}
            </CategoriesContext.Provider>
        );
    }

    if (loading) {
        return (
            <CategoriesContext.Provider value={{ categories: null, loading: true, error: null, meta }}>
                {children}
            </CategoriesContext.Provider>
        );
    }

    return (
        <CategoriesContext.Provider value={{ categories: categories || [], loading: false, error: null, meta }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default LocalizedProvider(CategoriesProvider);