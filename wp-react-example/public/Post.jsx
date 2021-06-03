import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {getPostByTaxonomy} from './module'
import PostContent from './template-parts/PostContent'
import {withRouter} from 'react-router' // react-router v4/v5

const toId = (category, categories) => {
    const filtered = categories.filter(c => c.get('slug') == category);
    if (filtered && filtered.size > 0) {
        return filtered.get(0).get('id')
    } else {
        return null;
    }
}

class Post extends React.Component {


    componentDidMount() {

        const {
            onLoadPost,
            loading,
            type,
            taxonomy,
            category,
            post,
            location,
            slug,
            categories,
            intro,
            excerpt
        } = this.props
        if (category && categories) {
            onLoadPost(type, taxonomy, toId(category, categories))
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {onLoadPost, loading, type, taxonomy, category, post, location, slug, categories} = this.props
        if (prevProps.categories == null && this.props.categories != null) {
            onLoadPost(type, taxonomy, toId(category, categories))
        }
    }

    render() {
        const {post, category} = this.props

        if (post) {
            return <PostContent visibility={this.props.visibility} post={post ? post.toJS() : null}/>
        } else if (this.props.location.search.indexOf("debugger") > -1) {
            return <blocklquote><h2>{category}</h2></blocklquote>
        }
        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    const {category, categories, taxonomy, module} = ownProps
    return {
        post: categories ? state.getIn(['wordpress', 'post', taxonomy, toId(category, categories), 'post']) : null,
    }
}

const mapActionCreators = {
    onLoadPost: getPostByTaxonomy
};


export default connect(mapStateToProps, mapActionCreators)(injectIntl(withRouter(Post)));
