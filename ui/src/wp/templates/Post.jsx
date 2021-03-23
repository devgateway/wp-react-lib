import React from 'react'
import {FormattedDate, injectIntl} from 'react-intl';
import Content from "../template-parts/Content";


const Wrapper = (props) => {
   const {posts} = props
    if (posts) {
        const single = posts.length == 1
        if (single) {
            return <Content post={posts[0]} {...props}></Content>
        } else {
            return posts.map(p => <Content post={p} {...props}></Content>)
        }
    } else {
        return null
    }

}


export default Wrapper
