import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {loadTaxonomy} from '../module'
import {withRouter} from 'react-router' // react-router v4/v5
import {TaxonomyContext} from './Context'

class TaxonomyProvider extends React.Component {


    componentDidMount() {
        if (this.props.taxonomies.length == 0) {
            this.props.onLoad(this.props.taxonomy ? this.props.taxonomy : 'categories')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {taxonomies, loading} = this.props

        if (taxonomies) {
            return <TaxonomyContext.Provider value={taxonomies}>{this.props.children}</TaxonomyContext.Provider>
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

export default connect(mapStateToProps, mapActionCreators)(injectIntl(withRouter(TaxonomyProvider)));
