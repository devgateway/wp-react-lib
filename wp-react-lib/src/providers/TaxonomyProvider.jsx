import React from 'react'
import {connect} from 'react-redux'
import {loadTaxonomy} from '../reducers/actions'
import {TaxonomyContext} from './Context'

class TaxonomyProvider extends React.Component {

    componentDidMount() {
        const {taxonomy, locale} = this.props
        if (this.props.taxonomies.length == 0) {
            this.props.onLoad({taxonomy: taxonomy ? taxonomy : 'categories', locale})
        }
    }

    render() {
        const {taxonomies, locale} = this.props

        if (taxonomies) {
            return <TaxonomyContext.Provider
                value={{taxonomies, locale}}>{this.props.children}</TaxonomyContext.Provider>
        } else {
            return <h3>Loading</h3>
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        taxonomies: state.getIn(['wordpress', ownProps.taxonomy ? ownProps : 'categories', 'items']) ? state.getIn(['wordpress', ownProps.taxonomy ? ownProps : 'categories', 'items']).toJS() : [],
        loading: state.getIn(['wordpress', ownProps.taxonomy ? ownProps : 'categories', 'loading'])

    }
}

const mapActionCreators = {
    onLoad: loadTaxonomy
};

export default connect(mapStateToProps, mapActionCreators)((TaxonomyProvider));
