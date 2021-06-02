import React from 'react';
import { MenuContext } from '../providers/Context';

const PageConsumer = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuContext.Consumer, null, menu => {
    return menu && /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(props.children, child => /*#__PURE__*/React.cloneElement(child, {
      menu
    })));
  }));
};

export default PageConsumer;