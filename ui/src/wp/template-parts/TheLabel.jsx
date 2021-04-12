import React from 'react'
import {Image, Label} from "semantic-ui-react";

const TheLabel = ({post}) => {
    const label = post.meta_fields ? post.meta_fields.label : ""
    return <Label>{label}</Label>
}

export default TheLabel