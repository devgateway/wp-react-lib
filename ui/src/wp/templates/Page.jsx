import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';

import {withRouter} from 'react-router' // react-router v4/v5
import withTracker from "../../withTracker"
import Content from "../template-parts/Content";


const Page = (props) => {

    const {onLoad, pages, location,intl: {locale}} = props


    if (pages) {

        return pages.map(page => {
            return (<React.Fragment>
                          <Content key={page.id} post={page} visibility={{title: false}} {...props}/>

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

export default injectIntl(withRouter(connect(mapStateToProps, mapActionCreators)(withTracker(Page))));
