import React from 'react'
import {Image} from "semantic-ui-react";

const PostIcon = (props) => {
    const {media} = props
    if (media && media.guid && media.guid.rendered) {
        return <Image {...props} src={media.guid.rendered}/>
    } else {
        return null
    }

}

export default PostIcon