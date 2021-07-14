import React from 'react'
import PostContent from "../template-parts/PostContent";


const Wrapper = (props) => {
    const {posts} = props
    if (posts) {
        const single = posts.length == 1
        if (single) {
            return <React.Fragment><PostContent  {...props} post={posts[0]}></PostContent></React.Fragment>
        } else {
            return posts.map(p => <PostContent showTitle showDate {...props} post={p}></PostContent>)
        }
    } else {
        return null
    }

}


export default Wrapper
