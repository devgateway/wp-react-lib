import React from 'react';
import { connect } from 'react-redux';
import { getMedia } from '../reducers/actions';
export const MediaContext = /*#__PURE__*/React.createContext();
/*
Will load a post base ond passed properties and put in PostContext
*/

class MediaProvider extends React.Component {
  componentDidMount() {
    //TODO:pass locale
    const {
      onLoad,
      loading,
      id,
      locale
    } = this.props;

    if (id) {
      this.props.onLoad(id);
    }
  }

  render() {
    const {
      media,
      id
    } = this.props;
    return /*#__PURE__*/React.createElement(MediaContext.Provider, {
      value: media
    }, this.props.children);
  }

}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    error: state.getIn(['wordpress', 'media', id, 'error']),
    media: state.getIn(['wordpress', 'media', id, 'content']) ? state.getIn(['wordpress', 'media', id, 'content']) : null,
    loading: state.getIn(['wordpress', 'media', id, 'loading'])
  };
};

const mapActionCreators = {
  onLoad: getMedia
};
export default connect(mapStateToProps, mapActionCreators)(MediaProvider);