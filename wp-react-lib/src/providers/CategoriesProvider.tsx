import React, { useEffect, useRef } from 'react';
import LocalizedProvider from "./LocalizedProvider";
import { CategoriesContext } from './Context';
import { getCategories } from '../reducers/actions'
import { useDispatch, useSelector } from 'react-redux';

interface CategoriesComponentProps extends React.PropsWithChildren {
    context?: string
    page?: number
    perPage?: number
    search?: string
    exclude?: string
    include?: string
    order?: string
    orderby?: string
    hideEmpty?: boolean
    parent?: string
    post?: string;
    slug?: string;
    locale?: string;
    store?: string;
    apiBaseUrl?: string | null;
}

const CategoriesProvider = (props: CategoriesComponentProps) => {
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
        children,
        apiBaseUrl
    } = props;

    const dispatch:any = useDispatch();

    const meta = useSelector((state: any) => state.getIn(['wordpress', store, 'meta']));
    const categories = useSelector((state: any) => {
        const items = state.getIn(['wordpress', store, 'items']);
        return items ? items.toJS() : null;
    });
    const error = useSelector((state: any) => state.getIn(['wordpress', store, 'error']));
    const loading = useSelector((state: any) => state.getIn(['wordpress', store, 'loading']));

    const prevProps = useRef({ context, page, perPage, search, exclude, include, order, orderby, hideEmpty, parent, post, slug, locale }).current;

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
                store,
                apiBaseUrl
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
            store,
            apiBaseUrl
        }));
    }, []);

    if (error) {
        return (
            <CategoriesContext.Provider value={{ categories: null, loading: false, error, meta, locale }}>
                {children}
            </CategoriesContext.Provider>
        );
    }

    if (loading) {
        return (
            <CategoriesContext.Provider value={{ categories: null, loading: true, error: null, meta, locale }}>
                {children}
            </CategoriesContext.Provider>
        );
    }

    return (
        <CategoriesContext.Provider value={{ categories: categories || [], loading: false, error: null, meta, locale }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default LocalizedProvider(CategoriesProvider);