import React from 'react'
import {Label} from "semantic-ui-react";

const PostLabel = ({post}) => {
    const label = post.meta_fields ? post.meta_fields.label : ""
    return <Label>{label}</Label>
}

export default PostLabel