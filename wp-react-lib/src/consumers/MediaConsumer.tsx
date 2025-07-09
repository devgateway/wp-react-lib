import React from 'react'
import { MediaContext } from '../providers/MediaProvider'
import type { Media } from '../types';

interface MediaConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const MediaConsumer = (props: MediaConsumerProps) => {
    return (
        <MediaContext.Consumer>
            {
                ({ media, locale }) => {
                    return media ? <React.Fragment>
                        {React.Children.map(props.children, (child) =>
                            React.isValidElement(child) && 'props' in child && child.props && typeof child.type !== 'string'
                                ? React.cloneElement(child as React.ReactElement<any>, { media, locale })
                                : child
                        )}
                    </React.Fragment>
                        : null;
                }
            }
        </MediaContext.Consumer>
    )
}


export default MediaConsumer
