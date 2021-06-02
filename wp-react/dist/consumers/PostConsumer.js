import React from 'react';
import { PostContext } from '../providers/Context';

const PostConsumer = props => {
  return /*#__PURE__*/React.createElement(PostContext.Consumer, null, posts => {
    return posts && /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(props.children, child => /*#__PURE__*/React.cloneElement(child, {
      posts: posts
    })));
  });
};

export default PostConsumer;