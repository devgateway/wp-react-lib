import React from 'react'
import {TaxonomyContext} from '../providers/Context'

interface TaxonomyConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const TaxonomyConsumer = (props: TaxonomyConsumerProps) => {
    return (
        <TaxonomyContext.Consumer>
            {({taxonomies, locale}) => {
                return taxonomies && <React.Fragment>
                    {React.Children.map(props.children, (child => React.cloneElement(child as React.ReactElement, {taxonomies, locale})))}
                </React.Fragment>
            }}
        </TaxonomyContext.Consumer>
    )
}
export default TaxonomyConsumer
