import React, { useEffect, useMemo } from 'react'
import {connect} from 'react-redux'
import {loadTaxonomy} from '../reducers/actions'
import {TaxonomyContext} from './Context'
import LocalizedProvider from "./LocalizedProvider"

const TaxonomyProvider = (props) => {
    const {taxonomy, locale, taxonomies, onLoad, children, apiBaseUrl} = props;

    useEffect(() => {
        if (taxonomies.length === 0) {
            onLoad({taxonomy: taxonomy ? taxonomy : 'categories', locale, apiBaseUrl});
        }
    }, []);

    const memoizedTaxonomies = useMemo(() => taxonomies, [taxonomies]);
    const memoizedLocale = useMemo(() => locale, [locale]);

    if (taxonomies) {
        return <TaxonomyContext.Provider value={{taxonomies: memoizedTaxonomies, locale: memoizedLocale}}>
            {children}
        </TaxonomyContext.Provider>;
    } else {
        return <h3>Loading</h3>;
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

export default connect(mapStateToProps, mapActionCreators)(LocalizedProvider(TaxonomyProvider));
