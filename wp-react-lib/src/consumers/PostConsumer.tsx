import React from 'react'
import {PostContext} from '../providers/Context';

interface PostConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `PostContext.Consumer` instead if you want type safety.
 * PostConsumer is a component that provides the posts, meta, and locale to its children.
 * @param props - The props for the PostConsumer component.
 * @returns The PostConsumer component.
 */
const PostConsumer = (props: PostConsumerProps) => {
    return (
        <PostContext.Consumer>
            {({ posts, meta, locale }) => {
                return posts ? <React.Fragment>
                    {React.Children.map(props.children, (child) =>
                        React.isValidElement(child) && 'props' in child && child.props && typeof child.type !== 'string'
                            ? React.cloneElement(child as React.ReactElement<any>, { posts, meta, locale })
                            : child
                    )}
                </React.Fragment> : null;
            }}
        </PostContext.Consumer>
    )
}

export default PostConsumer;
