import React from 'react'
import {SearchContext} from '../providers/Context'

interface SearchConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `SearchContext.Consumer` instead.
 * SearchConsumer is a component that provides the search results, meta, and locale to its children.
 * @param props - The props for the SearchConsumer component.
 * @returns The SearchConsumer component.
 */
const SearchConsumer = (props: SearchConsumerProps) => {
    return (
        <SearchContext.Consumer>
            {({results, meta, locale}) => {
                return results
                    ? React.Children.map(props.children, (child) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child as React.ReactElement<any>, { results, meta, locale })
                            : child
                    )
                    : null;
            }}
        </SearchContext.Consumer>
    )
}

export default SearchConsumer
