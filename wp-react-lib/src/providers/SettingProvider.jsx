import React from 'react'
import {connect} from 'react-redux'
import {getSettings} from '../reducers/actions'

import {SettingsContext} from './Context'

/*
WP-REST-API V2 Menus plugin is required
Will load a post base ond passed properties and put in PostContext
*/
class SettingProvider extends React.Component {

    componentDidMount() {
        const {onLoad, locale, changeUUID} = this.props
        if (locale && onLoad) {
            this.props.onLoad({locale,changeUUID})
        }
    }

    render() {
        const {data} = this.props
        return (<SettingsContext.Provider value={{data}}>
            {this.props.children}
        </SettingsContext.Provider>);

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.getIn(['wordpress', 'settings', 'error']),
        data: state.getIn(['wordpress', 'settings', 'data']),
        loading: state.getIn(['wordpress', 'settings', 'loading'])
    }
}
const mapActionCreators = {
    onLoad: getSettings
};

export default connect(mapStateToProps, mapActionCreators)(SettingProvider);
