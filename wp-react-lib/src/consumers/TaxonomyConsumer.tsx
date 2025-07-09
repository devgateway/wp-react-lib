import React from 'react'
import {TaxonomyContext} from '../providers/Context'

interface TaxonomyConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `TaxonomyContext.Consumer` instead if you want type safety.
 * TaxonomyConsumer is a component that provides the taxonomies, locale to its children.
 * @param props - The props for the TaxonomyConsumer component.
 * @returns The TaxonomyConsumer component.
 */
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
