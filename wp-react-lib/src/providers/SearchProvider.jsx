import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import {search} from '../reducers/actions'
import {SearchContext} from './Context'


class PostProvider extends React.Component {

    componentDidMount() {
        const {context, page, perPage, search, type, subtype, intl: {locale}, store = "results"} = this.props
        if (search && search !== "") {
            this.props.onLoad({context, page, perPage, search, type, subtype, locale, store})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {context, page, perPage, search, type, subtype, intl: {locale}, store = "results"} = this.props
        if (page != prevProps.page
            || search != prevProps.search
            || context != prevProps.context
            || type != prevProps.type
            || type != prevProps.subtype
        ) {
            if (search && search !== "") {
                this.props.onLoad({context, page, perPage, search, type, subtype, locale, store})
            }

        }
    }

    render() {
        const {results, loading, error, meta, intl: {locale}} = this.props
        return <SearchContext.Provider value={{results, meta, locale}}>{this.props.children}</SearchContext.Provider>

    }
}

const mapStateToProps = (state, ownProps) => {
    const {store = "results"} = ownProps
    return {
        results: state.getIn(['wordpress', store, 'items']),
        meta: state.getIn(['wordpress', store, 'meta']),
        error: state.getIn(['wordpress', store, 'error']),
        loading: state.getIn(['wordpress', store, 'loading']),
    }
}

const mapActionCreators = {
    onLoad: search
};

export default injectIntl(connect(mapStateToProps, mapActionCreators)(PostProvider));
