import React from 'react'

import { PageContext } from '../providers/Context'

interface PageConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const PageConsumer = (props: PageConsumerProps) => {

    return (
        <PageContext.Consumer>
            {

                ({ pages, meta, locale }) => {
                    return pages && <React.Fragment>
                        {React.Children.map(props.children, (child => React.cloneElement(child as React.ReactElement, {
                            pages,
                            meta,
                            locale
                        })))}
                    </React.Fragment>
                }
            }
        </PageContext.Consumer>
    )
}


export default PageConsumer
