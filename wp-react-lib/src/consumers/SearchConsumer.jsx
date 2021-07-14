import React from 'react'
import {SearchContext} from '../providers/Context'

const SearchConsumer = (props) => {
    return (
        <SearchContext.Consumer>

            {({results, meta, locale}) => {
                return <React.Fragment>
                    {React.Children.map(props.children, (child => React.cloneElement(child, {results, meta, locale})))}
                </React.Fragment>
            }}
        </SearchContext.Consumer>
    )
}


export default SearchConsumer
