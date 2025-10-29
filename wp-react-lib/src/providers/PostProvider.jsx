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
        apiBaseUrl
    } = props;

    const dispatch = useDispatch();

    const meta = useSelector(state => state.getIn(['wordpress', store, 'meta']));
    const posts = useSelector(state => state.getIn(['wordpress', store, 'items']));
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
                search,
                apiBaseUrl
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
            search,
            apiBaseUrl
        }));
    }, []);

    if (posts && posts.length > 0) {
        return <PostContext.Provider value={{ posts, locale, meta }}>{children}</PostContext.Provider>;
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
        return (
            <Container>
                <Segment color={"red"}>
                    <p>No entries found</p>
                </Segment>
            </Container>
        );
    }
};

export default LocalizedProvider(PostProvider);
