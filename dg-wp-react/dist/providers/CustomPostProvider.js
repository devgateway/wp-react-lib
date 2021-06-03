import React from 'react';
import { connect } from 'react-redux';
import { getPostByTaxonomy } from '../reducers/actions';
import { PostContext } from './Context';

const toId = (category, categories) => {
  const filtered = categories.filter(c => c.get('slug') == category);

  if (filtered && filtered.size > 0) {
    return filtered.get(0).get('id');
  } else {
    return null;
  }
};
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
      perPage,
      locale
    } = this.props; //TODO: Pass locale

    if (category && categories) {
      onLoadPost(type, taxonomy, category, toId(category, categories), page, perPage);
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
      perPage = 1,
      locale
    } = this.props; //TODO: Pass locale

    if (prevProps.categories == null && this.props.categories != null && this.props.category != null) {
      onLoadPost(type, taxonomy, category, toId(category, categories), page, perPage);
    }
  }

  render() {
    const {
      posts,
      category
    } = this.props;

    if (!category) {
      return null;
    }

    if (document.location.search.indexOf("debugger") > -1) {
      return /*#__PURE__*/React.createElement(PostContext.Provider, {
        value: null
      }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("blocklquote", null, /*#__PURE__*/React.createElement("h2", null, category))), this.props.children);
    } else {
      if (posts) {
        return /*#__PURE__*/React.createElement(PostContext.Provider, {
          value: posts
        }, this.props.children);
      } else {
        console.log('null - ' + category);
        return /*#__PURE__*/React.createElement("h3", null, "No Post");
      }
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  const {
    type,
    category,
    taxonomy
  } = ownProps;
  return {
    error: state.getIn(['wordpress', type, taxonomy, category, 'items']),
    loading: state.getIn(['wordpress', type, taxonomy, category, 'items']),
    posts: state.getIn(['wordpress', type, taxonomy, category, 'items'])
  };
};

const mapActionCreators = {
  onLoadPost: getPostByTaxonomy
};
export default connect(mapStateToProps, mapActionCreators)(CustomPostProvider);