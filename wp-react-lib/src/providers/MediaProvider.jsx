import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {getMedia} from '../reducers/actions'

export const MediaContext = React.createContext()

/*
Will load a post base ond passed properties and put in PostContext
*/
class MediaProvider extends React.Component {

    componentDidMount() {
        const {onLoad, loading, id, intl: {locale}} = this.props
        if (id) {
            this.props.onLoad({id, locale})
        }
    }

    render() {
        const {media, id, intl: {locale}} = this.props
        return (<MediaContext.Provider value={{media, locale}}>
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

export default injectIntl(connect(mapStateToProps, mapActionCreators)(MediaProvider));
