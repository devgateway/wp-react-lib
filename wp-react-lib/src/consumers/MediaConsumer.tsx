import React from 'react'
import { MediaContext } from '../providers/MediaProvider'

interface MediaConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `MediaContext.Consumer` instead if you want type safety.
 * MediaConsumer is a component that provides the media, locale to its children.
 * @param props - The props for the MediaConsumer component.
 * @returns The MediaConsumer component.
 */
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
