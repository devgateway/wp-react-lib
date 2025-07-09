import { useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../reducers/actions';
import { PostContext } from '../providers/Context';

interface UsePostsProps {
    type?: string;
    taxonomy?: string;
    categories?: string | string[];
    before?: string;
    perPage?: number;
    page?: number;
    fields?: string[];
    slug?: string;
    store?: string;
    locale?: string;
    previewNonce?: string;
    previewId?: string;
    search?: string;
    after?: string;
}

interface UsePostsReturn {
    posts: any[];
    meta: any;
    error: any;
    loading: boolean;
    locale: string;
    contextPosts?: any[];
    contextMeta?: any;
    contextLocale?: string | undefined;
}

export const usePosts = (props: UsePostsProps): UsePostsReturn => {
    // Check if used within PostProvider context
    const postContext = useContext(PostContext);

    if (!postContext) {
        throw new Error('usePosts must be used within a PostProvider. Make sure your component is wrapped with PostProvider.');
    }

    const {
        type = 'posts',
        taxonomy,
        categories,
        before,
        perPage,
        page,
        fields,
        slug,
        store = "posts",
        locale,
        previewNonce,
        previewId,
        search,
        after
    } = props;

    const dispatch = useDispatch() as any; // Type assertion to handle thunk actions

    const meta = useSelector((state: any) => state.getIn(['wordpress', store, 'meta']));
    const posts = useSelector((state: any) => state.getIn(['wordpress', store, 'items']));
    const error = useSelector((state: any) => state.getIn(['wordpress', store, 'error']));
    const loading = useSelector((state: any) => state.getIn(['wordpress', store, 'loading']));

    const prevProps = useRef({categories, locale, slug, taxonomy, page, perPage, search}).current;

    useEffect(() => {
        if (categories !== prevProps.categories ||
            locale !== prevProps.locale ||
            slug !== prevProps.slug ||
            taxonomy !== prevProps.taxonomy ||
            page !== prevProps.page ||
            perPage !== prevProps.perPage ||
            search !== prevProps.search
        ) {
            dispatch(getPosts({
                slug,
                type,
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
                search,
                after
            }));
        }
    }, [categories, locale, slug, taxonomy, page, perPage, search, dispatch, type, before, fields, store, previewNonce, previewId]);

    useEffect(() => {
        dispatch(getPosts({
            slug,
            type,
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
            search,
            after
        }));
    }, []);

    return {
        posts: posts || [],
        meta,
        error,
        loading,
        locale: postContext.locale || '',
        contextPosts: postContext.posts || [],
        contextMeta: postContext.meta || {},
        contextLocale: postContext.locale || ''
    };
};

