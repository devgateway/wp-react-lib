import React from 'react'
import {connect} from 'react-redux'

import {getPosts} from '../reducers/actions'
import {PostContext} from './Context'
import {Container, Loader, Segment} from "semantic-ui-react";

class PostProvider extends React.Component {

    componentDidMount() {
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
            previewId
        } = this.props
        this.props.onLoadPost(slug, type, taxonomy, categories, before, perPage, page, fields, store, locale, previewNonce, previewId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
            previewId
        } = this.props

        if (categories != prevProps.categories || locale != prevProps.locale || slug != prevProps.slug ||
            taxonomy != prevProps.taxonomy || page != prevProps.page || perPage != prevProps.perPage
        ) {
            this.props.onLoadPost(slug, type, taxonomy, categories, before, perPage, page, fields, store, locale, previewNonce, previewId)
        }
    }

    render() {
        const {posts, loading, error, locale} = this.props
        if (posts && posts.length > 0) {
            return <PostContext.Provider value={{posts, locale}}>{this.props.children}</PostContext.Provider>
        } else if (error) {
            return <Segment color={"red"}>
                <h1>500</h1>
                <p>The service is not available please try again in a few minutes</p>
            </Segment>
        } else if (loading) {
            return (<Container>
                <Loader>Loading</Loader>
            </Container>)
        } else {
            return <Container>
                <Segment color={"red"}>
                    <p>No entries found</p>
                </Segment>
            </Container>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const {store = "posts"} = ownProps
    return {
        posts: state.getIn(['wordpress', store, 'items']),
        error: state.getIn(['wordpress', store, 'error']),
        loading: state.getIn(['wordpress', store, 'loading']),
    }
}

const mapActionCreators = {
    onLoadPost: getPosts
};

export default connect(mapStateToProps, mapActionCreators)(PostProvider);
