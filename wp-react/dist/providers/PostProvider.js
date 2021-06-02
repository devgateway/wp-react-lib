import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../reducers/actions';
import { PostContext } from './Context';
import { Container, Loader, Segment } from "semantic-ui-react";

class PostProvider extends React.Component {
  componentDidMount() {
    //TODO pass locale parameter to get the post in the right language
    const {
      type = 'posts',
      taxonomy,
      categories,
      before,
      perPage,
      page,
      fields,
      slug,
      store,
      locale
    } = this.props;
    this.props.onLoadPost({
      slug,
      wType: type,
      taxonomy,
      categories,
      before,
      perPage,
      page,
      fields,
      store
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {//TODO reload?
  }

  render() {
    const {
      posts,
      category,
      loading,
      error
    } = this.props;

    if (posts && posts.length > 0) {
      return /*#__PURE__*/React.createElement(PostContext.Provider, {
        value: posts
      }, this.props.children);
    } else if (error) {
      return /*#__PURE__*/React.createElement(Segment, {
        color: "red"
      }, /*#__PURE__*/React.createElement("h1", null, "500"), /*#__PURE__*/React.createElement("p", null, "The service is not available please try again in a few minutes"));
    } else if (loading) {
      return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Loader, null));
    } else {
      return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Segment, {
        color: "red"
      }, /*#__PURE__*/React.createElement("p", null, "No entries found")));
    }
  }

}

const mapStateToProps = (state, ownProps) => {
  const {
    store
  } = ownProps;
  return {
    posts: state.getIn(['wordpress', store, 'items']),
    error: state.getIn(['wordpress', store, 'error']),
    loading: state.getIn(['wordpress', store, 'loading'])
  };
};

const mapActionCreators = {
  onLoadPost: getPosts
};
export default connect(mapStateToProps, mapActionCreators)(PostProvider);