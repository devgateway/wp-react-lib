import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {getPosts} from '../module'
import {PostContext} from './Context'
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";

class PostProvider extends React.Component {

    componentDidMount() {

        const {type = 'posts', taxonomy, categories, before, perPage, page, fields, slug, store} = this.props
        this.props.onLoadPost({slug, wType:type, taxonomy, categories, before, perPage, page, fields, store})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //TODO reload?
    }

    render() {

        const {posts, category, loading, error} = this.props

        if (posts && posts.length > 0) {
            return <PostContext.Provider value={posts}>{this.props.children}</PostContext.Provider>
        } else if (error) {
            return <Segment color={"red"}>
                <h1>500</h1>
                <p>The service is not available please try again in a few minutes</p>
            </Segment>
        } else if (loading) {
            return (<Container>
                <Dimmer active inverted>
                    <Loader inverted content='Loading'/>
                </Dimmer>
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
    const {store} = ownProps
    return {
        posts: state.getIn(['wordpress', store, 'items']),
        error: state.getIn(['wordpress', store, 'error']),
        loading: state.getIn(['wordpress', store, 'loading']),
    }
}

const mapActionCreators = {
    onLoadPost: getPosts
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(PostProvider));
