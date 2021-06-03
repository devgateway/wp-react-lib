function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from 'react-redux';
import PostContent from "../template-parts/PostContent";

const Page = props => {
  const {
    onLoad,
    pages
  } = props;

  if (pages) {
    return pages.map(page => {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PostContent, _extends({
        post: page
      }, props)));
    });
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Page);