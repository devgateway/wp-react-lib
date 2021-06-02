import React from 'react';
import { MediaContext } from '../providers/MediaProvider';

const MediaConsumer = props => {
  return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, media => {
    return media && /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(props.children, child => /*#__PURE__*/React.cloneElement(child, {
      media
    })));
  });
};

export default MediaConsumer;