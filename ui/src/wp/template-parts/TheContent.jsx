import React from 'react'
import Content from "./Content";
const TheContent = (props) => {

    return <Content {...props} visibility={{intro: true,title:false,content:false,date:false}}></Content>
}

export default TheContent