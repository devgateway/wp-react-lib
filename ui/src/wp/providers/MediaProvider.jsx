import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';

import {getMedia} from '../module'


export const MediaContext = React.createContext()

/*
Will load a post base ond passed properties and put in PostContext
*/

class PageProvider extends React.Component {

    componentDidMount() {
        const {onLoad, loading, id} = this.props
        if (id) {
            this.props.onLoad(id)
        }
    }

    render() {
        const {media, id} = this.props
        return (<MediaContext.Provider value={media}>
            {this.props.children}
        </MediaContext.Provider>);

    }


}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.id
    return {
        error: state.getIn(['wordpress', 'media', id, 'error']),
        media: state.getIn(['wordpress', 'media', id, 'content']) ? state.getIn(['wordpress', 'media', id, 'content']) : null,
        loading: state.getIn(['wordpress', 'media', id, 'loading'])
    }
}

const mapActionCreators = {
    onLoad: getMedia
};

export default injectIntl(connect(mapStateToProps, mapActionCreators)(PageProvider));
