import React from 'react';
import { PageContext } from '../providers/Context';

interface PageConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `PageContext.Consumer` instead.
 * PageConsumer is a component that provides the pages, meta, and locale to its children.
 * @param props - The props for the PageConsumer component.
 * @returns The PageConsumer component.
 */
const PageConsumer = (props: PageConsumerProps) => {

    return (
        <PageContext.Consumer>
            {

                ({ pages, meta, locale }) => {
                    return pages ? <React.Fragment>
                        {React.Children.map(props.children, (child) =>
                            React.isValidElement(child) && 'props' in child && child.props && typeof child.type !== 'string'
                                ? React.cloneElement(child as React.ReactElement<any>, { pages, meta, locale })
                                : child
                        )}
                    </React.Fragment>
                        : null;
                }
            }
        </PageContext.Consumer>
    )
}

export default PageConsumer
