import React from 'react';
import { connect } from 'react-redux';
import { getMenu } from '../reducers/actions';
import { MenuContext } from './Context';
/*
WP-REST-API V2 Menus plugin is required
Will load a post base ond passed properties and put in PostContext
*/

class MenuProvider extends React.Component {
  componentDidMount() {
    const {
      onLoad,
      loading,
      slug
    } = this.props;

    if (slug) {
      this.props.onLoad(slug);
    }
  }

  render() {
    const {
      menu,
      slug
    } = this.props;
    return /*#__PURE__*/React.createElement(MenuContext.Provider, {
      value: menu
    }, this.props.children);
  }

}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.slug;
  return {
    error: state.getIn(['wordpress', 'menu', slug, 'error']),
    menu: state.getIn(['wordpress', 'menu', slug, 'menu']),
    loading: state.getIn(['wordpress', 'menu', slug, 'loading'])
  };
};

const mapActionCreators = {
  onLoad: getMenu
};
export default connect(mapStateToProps, mapActionCreators)(MenuProvider);