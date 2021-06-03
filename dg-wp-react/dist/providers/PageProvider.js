import React from 'react';
import { Container, Loader, Segment } from "semantic-ui-react";
import { connect } from 'react-redux';
import { PageContext } from './Context';
import { clean, getPages } from "../reducers/actions";
/*
Will load a post base ond passed properties and put in PostContext
*/

class PageProvider extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      before,
      perPage,
      page,
      fields,
      parent,
      slug,
      store,
      locale
    } = this.props;

    if (prevProps.parent !== parent || prevProps.slug !== slug || locale !== prevProps.locale) {
      this.props.onLoad({
        before,
        perPage,
        page,
        fields,
        parent,
        slug,
        store,
        locale
      });
    }
  }

  componentDidMount() {
    const {
      before,
      perPage,
      page,
      fields,
      parent,
      slug,
      store,
      locale
    } = this.props;
    this.props.onLoad({
      before,
      perPage,
      page,
      fields,
      parent,
      slug,
      store,
      locale
    });
  }

  componentWillUnmount() {
    const {
      before,
      perPage,
      page,
      fields,
      parent,
      slug,
      store,
      locale
    } = this.props;
    this.props.onClean({
      store
    });
  }

  render() {
    const {
      pages,
      loading,
      error,
      fallbackComponent
    } = this.props;

    if (pages && pages.length > 0) {
      return /*#__PURE__*/React.createElement(PageContext.Provider, {
        value: pages
      }, this.props.children);
    } else if (error) {
      return /*#__PURE__*/React.createElement(Segment, {
        color: "red"
      }, /*#__PURE__*/React.createElement("h1", null, "500"), /*#__PURE__*/React.createElement("p", null, "The service is not available please try again in a few minutes"));
    } else if (loading) {
      return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Loader, {
        inverted: true,
        content: "Loading"
      }));
    } else if (loading === false) {
      if (fallbackComponent) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, fallbackComponent);
      } else {
        return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Segment, {
          color: "red"
        }, /*#__PURE__*/React.createElement("h1", null, "404"), /*#__PURE__*/React.createElement("p", null, "Can't find this page")));
      }
    }

    return null;
  }

}

const mapStateToProps = (state, ownProps) => {
  const store = ownProps.store;
  return {
    error: state.getIn(['wordpress', 'pages', store, 'error']),
    pages: state.getIn(['wordpress', 'pages', store, 'items']),
    loading: state.getIn(['wordpress', 'pages', store, 'loading'])
  };
};

const mapActionCreators = {
  onClean: clean,
  onLoad: getPages
};
export default connect(mapStateToProps, mapActionCreators)(PageProvider);