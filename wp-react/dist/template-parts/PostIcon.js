function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Image } from "semantic-ui-react";

const PostIcon = props => {
  const {
    media
  } = props;

  if (media && media.guid && media.guid.rendered) {
    return /*#__PURE__*/React.createElement(Image, _extends({}, props, {
      src: media.guid.rendered
    }));
  } else {
    return null;
  }
};

export default PostIcon;