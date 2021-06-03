function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { FormattedDate } from 'react-intl';
import EmbeddedGateway from '../embeddable/EmbeddedGateway';
import { Container } from "semantic-ui-react";
import { replaceHTMLinks } from "../util";

const Enhance = props => {
  const Component = props.as ? props.as : Container;
  const filteredProps = ['post', 'pageNumber', 'visibility', 'intl', "as"];
  const newProps = {};
  Object.keys(props).filter(p => p).forEach(e => {
    if (filteredProps.indexOf(e) == -1) {
      newProps[e] = props[e];
    }
  });
  return /*#__PURE__*/React.createElement(Component, newProps, props.children);
};

class Content extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const {
      post,
      pageNumber,
      showTitle,
      showContent,
      showIntro,
      showLink,
      showDate,
      showLoading,
      as,
      locale
    } = this.props;

    if (post) {
      const contentParts = post.content ? post.content.rendered.split("<!--more-->") : [];
      const intro = contentParts.length > 1 ? contentParts[0] : null;
      const content = contentParts.length > 1 ? contentParts[1] : contentParts[0];
      const pages = content ? content.split("<!--nextpage-->") : '';
      let theContent = '';

      if (pageNumber != null && pages.length > 0) {
        theContent = pages[pageNumber];
      } else {
        theContent = content;
      } //TODO: Use htmlUtils link replace function line in 74


      return /*#__PURE__*/React.createElement(EmbeddedGateway, {
        locale: locale,
        parent: post.id
      }, /*#__PURE__*/React.createElement(Enhance, _extends({
        className: "entry-content"
      }, this.props), showDate && /*#__PURE__*/React.createElement(Container, {
        fluid: true,
        className: "date"
      }, /*#__PURE__*/React.createElement(FormattedDate, {
        value: post.date,
        day: "numeric",
        month: "long",
        year: "numeric"
      })), showTitle && /*#__PURE__*/React.createElement("span", {
        fluid: true,
        className: "title",
        dangerouslySetInnerHTML: {
          __html: post.title.rendered
        }
      }), showIntro && /*#__PURE__*/React.createElement(Container, {
        fluid: true,
        className: "excerpt",
        dangerouslySetInnerHTML: {
          __html: replaceHTMLinks(intro)
        }
      }), showContent && /*#__PURE__*/React.createElement(Container, {
        fluid: true,
        className: "content",
        dangerouslySetInnerHTML: {
          __html: replaceHTMLinks(theContent)
        }
      }), showLink === true && /*#__PURE__*/React.createElement("a", {
        href: post.link.replace(/^[a-z]{1,}\:\/{2}([a-z]{1,}.){1,}\//, '#' + locale + '/'),
        className: "link"
      }, "Read More")));
    } else {
      return showLoading ? 'Loading' : false;
    }
  }

}

export default Content;