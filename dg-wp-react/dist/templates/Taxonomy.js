function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';

const Taxonomy = props => {
  //use local if passed for link
  return /*#__PURE__*/React.createElement("div", props, /*#__PURE__*/React.createElement("a", {
    href: '#' + props.locale + '/category/' + props.taxonomy.slug
  }, props.taxonomy.name));
};

const Iterator = props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.taxonomies && props.taxonomies.map(taxonomy => /*#__PURE__*/React.createElement(Taxonomy, _extends({
    key: taxonomy.id,
    taxonomy: taxonomy
  }, props))));
};

export default Iterator;