import React from 'react'
import {MediaContext} from '../providers/MediaProvider'

interface MediaConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const MediaConsumer = (props: MediaConsumerProps) => {
    return (
        <MediaContext.Consumer>
            {
                ({media, locale}) => {
                    return media && <React.Fragment>
                        {React.Children.map(props.children, (child => React.cloneElement(child as React.ReactElement, {media, locale})))}
                    </React.Fragment>
                }
            }
        </MediaContext.Consumer>
    )
}


export default MediaConsumer
