import React from 'react'
import {PostContext} from '../providers/Context';

interface PostConsumerProps {
    children: React.DetailedReactHTMLElement<any, HTMLElement>;
}

const PostConsumer = (props: PostConsumerProps) => {
    return (
        <PostContext.Consumer>
            {({ posts, meta, locale }) => {
                if (!posts) return null;
                return (
                    <React.Fragment>
                        {React.Children.map(props.children, (child => React.cloneElement(child, {posts, meta, locale})))}
                    </React.Fragment>
                );
            }}
        </PostContext.Consumer>
    )
}


export default PostConsumer
