import React from 'react'
import {TaxonomyContext} from '../providers/Context'

const TaxonomyConsumer = (props) => {
    return (
        <TaxonomyContext.Consumer>
            {(taxonomies) => {
                return taxonomies && <React.Fragment>
                         {React.Children.map(props.children, (child => React.cloneElement(child, {taxonomies})))}
                 </React.Fragment>
            }}
        </TaxonomyContext.Consumer>
    )
}
export default TaxonomyConsumer
