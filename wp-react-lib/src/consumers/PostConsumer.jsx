import React from 'react'
import {PostContext} from '../providers/Context'

const PostConsumer = (props) => {
    return (
        <PostContext.Consumer>
            {({posts, meta, locale}) => {
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
