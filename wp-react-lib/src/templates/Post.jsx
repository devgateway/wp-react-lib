import React from 'react'
import PostContent from "../template-parts/PostContent";


const Wrapper = (props) => {
    const {posts} = props
    if (posts) {
        const single = posts.length == 1
        if (single) {
            return <React.Fragment><PostContent post={posts[0]} {...props}></PostContent></React.Fragment>
        } else {
            return posts.map(p => <PostContent showTitle showDate post={p} {...props}></PostContent>)
        }
    } else {
        return null
    }

}


export default Wrapper
