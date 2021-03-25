import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {getPostByTaxonomy} from '../module'
import {withRouter} from 'react-router' // react-router v4/v5
import {PostContext} from './Context'

const toId = (category, categories) => {
    const filtered = categories.filter(c => c.get('slug') == category);
    if (filtered && filtered.size > 0) {
        return filtered.get(0).get('id')
    } else {
        return null;
    }
}

/*
  Will load a post base ond passed properties and put in PostContext
*/

class CustomPostProvider extends React.Component {
    componentDidMount() {
        const {
            onLoadPost,
            type,
            taxonomy,
            category,
            categories,
            page,
            perPage
        } = this.props

        if (category && categories) {

            onLoadPost(type, taxonomy, category, toId(category, categories), page, perPage)
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
            page = 1,
            perPage = 1
        } = this.props
        if (prevProps.categories == null && this.props.categories != null && this.props.category != null) {

            onLoadPost(type, taxonomy, category, toId(category, categories), page, perPage)
        }
    }

    render() {
        const {posts, category} = this.props

        if (!category) {
            return null;
        }
        if (document.location.search.indexOf("debugger") > -1) {
            return (<PostContext.Provider value={null}>
                <React.Fragment>
                    <blocklquote>
                        <h2>{category}</h2>
                    </blocklquote>
                </React.Fragment>
                {this.props.children}
            </PostContext.Provider>)
        } else {
            if (posts) {
                return <PostContext.Provider value={posts}>
                    {this.props.children}
                </PostContext.Provider>
            } else {
                console.log('null - ' + category)
                return <h3>No Post</h3>
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const {type, category, taxonomy} = ownProps

    return {
        error: state.getIn(['wordpress', type, taxonomy, category, 'items']),
        loading: state.getIn(['wordpress', type, taxonomy, category, 'items']),
        posts: state.getIn(['wordpress', type, taxonomy, category, 'items'])
    }
}

const mapActionCreators = {
    onLoadPost: getPostByTaxonomy
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(CustomPostProvider));
