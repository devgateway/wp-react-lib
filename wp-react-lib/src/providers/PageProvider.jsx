import React, { useEffect } from 'react'
import { Container, Loader, Segment } from "semantic-ui-react"
import { useDispatch, useSelector } from 'react-redux'
import { PageContext } from './Context'
import { clean, getPages } from "../reducers/actions"
import LocalizedProvider from "./LocalizedProvider"

const PageProvider = (props) => {
    const {
        before,
        perPage,
        page,
        fields,
        parent,
        slug,
        store = "pages",
        locale,
        previewNonce,
        previewId,
        search,
        noCache,
        children,
        fallbackComponent
    } = props;

    const dispatch = useDispatch();

    const error = useSelector(state => state.getIn(['wordpress', store, 'error']));
    const meta = useSelector(state => state.getIn(['wordpress', store, 'meta']));
    const pages = useSelector(state => state.getIn(['wordpress', store, 'items']));
    const loading = useSelector(state => state.getIn(['wordpress', store, 'loading']));

    useEffect(() => {
        dispatch(getPages({
            before,
            perPage,
            page,
            fields,
            parent,
            slug,
            store,
            locale,
            previewNonce,
            previewId,
            search,
            noCache
        }));

        return () => {
            dispatch(clean({ store }));
        };
    }, [parent, slug, locale, previewId, search]);

    if (pages && pages.length > 0) {
        return <PageContext.Provider value={{ pages, meta, locale }}>{children}</PageContext.Provider>;
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
                <Loader inverted content='Loading' />
            </Container>
        );
    } else if (loading === false) {
        if (fallbackComponent) {
            return <>{fallbackComponent}</>;
        } else {
            return (
                <Container>
                    <Segment color={"red"}>
                        <h1>404</h1>
                        <p>Can't find this page</p>
                    </Segment>
                </Container>
            );
        }
    }
    return null;
};

export default LocalizedProvider(PageProvider);
