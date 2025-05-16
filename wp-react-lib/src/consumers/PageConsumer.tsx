import React from 'react'

import {PageContext} from '../providers/Context'

interface PageConsumerProps {
    children: React.DetailedReactHTMLElement<any, HTMLElement>;
}

const PageConsumer = (props: PageConsumerProps) => {

    return (
        <React.Fragment>
            <PageContext.Consumer>
                {

                    ({pages, meta, locale}) => {
                        return pages && <React.Fragment>
                            {React.Children.map(props.children, (child => React.cloneElement(child, {
                                pages,
                                meta,
                                locale
                            })))}
                        </React.Fragment>
                    }
                }
            </PageContext.Consumer>
        </React.Fragment>)
}


export default PageConsumer
