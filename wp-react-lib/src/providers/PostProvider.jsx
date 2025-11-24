import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../reducers/actions'
import { PostContext } from './Context'
import { Container, Loader, Segment } from "semantic-ui-react"
import LocalizedProvider from "./LocalizedProvider"

const PostProvider = (props) => {
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
        children,
        fallbackComponent
    } = props;

    const dispatch = useDispatch();

    const meta = useSelector(state => state.getIn(['wordpress', store, 'meta']));
    const postsRaw = useSelector(state => state.getIn(['wordpress', store, 'items']));
    // Handle both Immutable List and plain array
    const posts = postsRaw && typeof postsRaw.toJS === 'function' ? postsRaw.toJS() : postsRaw;
    const error = useSelector(state => state.getIn(['wordpress', store, 'error']));
    const loading = useSelector(state => state.getIn(['wordpress', store, 'loading']));

    const prevProps = useRef({categories, locale, slug, taxonomy, page, perPage, search}).current;

    useEffect(() => {
       
        if (categories != prevProps.categories || locale != prevProps.locale || slug != prevProps.slug ||
            taxonomy != prevProps.taxonomy || page != prevProps.page || perPage != prevProps.perPage || search != prevProps.search
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
                search
            }));
        }
        
    }, [categories, locale, slug, taxonomy, page, perPage, search]);

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
            search
        }));
    }, []);

    // Check if we have posts - handle both array and single object cases
    const hasPosts = posts && (Array.isArray(posts) ? posts.length > 0 : posts);
    

    if (slug && !loading && !hasPosts && !error) {
        console.log('PostProvider: No posts found', { slug, store, locale, posts, loading, error });
    }
    
    if (hasPosts) {
        // Ensure posts is always an array for the context
        const postsArray = Array.isArray(posts) ? posts : [posts];
        return <PostContext.Provider value={{ posts: postsArray, locale, meta }}>{children}</PostContext.Provider>;
    } else if (error) {
        return (
            <Segment color={"red"}>
                <h1>500</h1>
                <p>The service is not available please try again in a few minutes</p>
            </Segment>
        );
    } else if (loading) {
        return (
            <Container>
                <Loader>Loading</Loader>
            </Container>
        );
    } else {
        // If no posts found and fallback component provided, use it
        if (fallbackComponent) {
            return <>{fallbackComponent}</>;
        }
        return (
            <Container>
                <Segment color={"red"}>
                    <p>No posts found</p>
                </Segment>
            </Container>
        );
    }
};

export default LocalizedProvider(PostProvider);
