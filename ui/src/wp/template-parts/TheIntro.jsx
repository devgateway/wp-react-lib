import React from 'react'
import Content from "./Content";
const TheIntro = (props) => {


            return <Content {...props} visibility={{intro: true,title:false,content:false,date:false}}></Content>
}

export default TheIntro