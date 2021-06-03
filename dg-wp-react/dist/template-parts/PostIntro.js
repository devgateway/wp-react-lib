function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Content from "./Content";

const PostIntro = props => {
  return /*#__PURE__*/React.createElement(Content, _extends({}, props, {
    showIntro: true
  }));
};

export default PostIntro;