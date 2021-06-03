import React from 'react';
import { Container } from 'semantic-ui-react';
import TaxonomyProvider from '../providers/TaxonomyProvider';
import TaxonomyConsumer from '../consumers/TaxonomyConsumer';
import PostConsumer from '../consumers/PostConsumer';
import PostContent from './Post';
import { PostProvider } from "../index";

const CategoryDetail = ({
  taxonomies,
  slug
}) => {
  const category = taxonomies ? taxonomies.filter(t => t.slug == slug)[0] : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, category && /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("h1", null, category.name), /*#__PURE__*/React.createElement(Container, {
    className: "has-medium-font-size",
    color: "green"
  }, category.description), /*#__PURE__*/React.createElement("h2", null, "Pots"), /*#__PURE__*/React.createElement(PostProvider, {
    fields: ['title', 'date', 'link', 'excerpt'],
    store: "posts",
    page: 1,
    perPage: 10,
    categories: [category.id]
  }, /*#__PURE__*/React.createElement("ul", {
    className: "wp post list"
  }, /*#__PURE__*/React.createElement(PostConsumer, null, /*#__PURE__*/React.createElement(PostContent, {
    as: 'li',
    visibility: {
      title: true,
      excerpt: true,
      link: true,
      content: true
    }
  }))))));
};

const Category = props => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TaxonomyProvider, null, /*#__PURE__*/React.createElement(TaxonomyConsumer, null, /*#__PURE__*/React.createElement(CategoryDetail, {
    slug: props.match.params.slug
  }))));
};

export default Category;