import React from 'react'
import {FormattedDate, injectIntl} from 'react-intl';
import Content from "../template-parts/Content";
import TheContent from "../template-parts/TheContent";


const Wrapper = (props) => {
   const {posts} = props
    if (posts) {
        const single = posts.length == 1
        if (single) {
            return <React.Fragment><TheContent post={posts[0]} {...props}></TheContent></React.Fragment>
        } else {
            return posts.map(p => <TheContent showTitle showDate  post={p} {...props}></TheContent>)
        }
    } else {
        return null
    }

}


export default Wrapper
