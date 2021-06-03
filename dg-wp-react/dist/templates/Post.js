function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PostContent from "../template-parts/PostContent";

const Wrapper = props => {
  const {
    posts
  } = props;

  if (posts) {
    const single = posts.length == 1;

    if (single) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PostContent, _extends({
        post: posts[0]
      }, props)));
    } else {
      return posts.map(p => /*#__PURE__*/React.createElement(PostContent, _extends({
        showTitle: true,
        showDate: true,
        post: p
      }, props)));
    }
  } else {
    return null;
  }
};

export default Wrapper;