import React from 'react'

import {MediaContext} from '../providers/MediaProvider'

const MediaConsumer = (props) => {
    return (
        <MediaContext.Consumer>
            {
                ({media, locale}) => {
                    return media && <React.Fragment>
                        {React.Children.map(props.children, (child => React.cloneElement(child, {media, locale})))}
                    </React.Fragment>
                }
            }
        </MediaContext.Consumer>
    )
}


export default MediaConsumer
