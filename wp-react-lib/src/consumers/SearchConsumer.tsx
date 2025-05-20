import React from 'react'
import {SearchContext} from '../providers/Context'

interface SearchConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const SearchConsumer = (props: SearchConsumerProps) => {
    return (
        <SearchContext.Consumer>
            {({results, meta, locale}) => {
                return results && <React.Fragment>
                    {React.Children.map(props.children, (child => React.cloneElement(child as React.ReactElement, {results, meta, locale})))}
                </React.Fragment>
            }}
        </SearchContext.Consumer>
    )
}


export default SearchConsumer
