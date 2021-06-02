import React from 'react'
import {connect} from 'react-redux'
import PostContent from "../template-parts/PostContent";


const Page = (props) => {

    const {onLoad, pages} = props


    if (pages) {

        return pages.map(page => {
            return (<React.Fragment>
                <PostContent post={page} {...props}></PostContent>
            </React.Fragment>)
        })
    } else {
        return null
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)((Page));
