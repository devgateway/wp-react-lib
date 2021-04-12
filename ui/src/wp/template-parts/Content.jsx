import React from 'react'
import {FormattedDate, injectIntl} from 'react-intl';

import EmbeddedGateway from '../EmbeddedGateway.js'
import {Container} from "semantic-ui-react";

const replaceLinks = (html) => {

    var link;
    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    if (document.location.hostname === 'localhost') {
        var re = new RegExp("^(http|https)://localhost", "i");
    } else {
        //replace wp.someurl
        var re = new RegExp("^(http|https)://" + "wp." + document.location.hostname, "i");
    }
    let newHtml = html
    while ((link = regex.exec(html)) !== null) {
        let href = link[2]
        let newLink = href.replace(re, '#en')
        newHtml = html.replaceAll(link[2], newLink)
    }

    return newHtml;
}

const Enhance = (props) => {
    const Component = props.as ? props.as : Container;

    const filteredProps = ['post', 'pageNumber', 'visibility', 'intl', "as"]
    const newProps = {}

    Object.keys(props).filter(p => p).forEach(e => {
        if (filteredProps.indexOf(e) == -1) {
            newProps[e] = props[e]
        }
    })

    return <Component {...newProps}>{props.children}</Component>
}


class Content extends React.Component {

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const {
            intl,
            post,
            pageNumber,
            showTitle, showContent, showIntro, showLink, showDate,showLoading,
            as,
            intl: {locale}
        } = this.props

        if (post) {
            const contentParts = post.content ? post.content.rendered.split("<!--more-->") : []
            const intro = contentParts.length > 1 ? contentParts[0] : null
            const content = contentParts.length > 1 ? contentParts[1] : contentParts[0]
            const pages = content ? content.split("<!--nextpage-->") : '';

            let theContent = ''
            if (pageNumber != null && pages.length > 0) {
                theContent = pages[pageNumber]
            } else {
                theContent = content
            }

            return <EmbeddedGateway parent={post.id}>
                        <Enhance className="entry-content" {...this.props}>
                            {showDate &&<Container fluid className="date"><FormattedDate value={post.date} day="numeric" month="long" year="numeric"/></Container>}
                            {showTitle &&<Container fluid className="title" dangerouslySetInnerHTML={{__html: post.title.rendered}}/>}
                            {showIntro &&<Container fluid className="excerpt" dangerouslySetInnerHTML={{__html: replaceLinks(intro)}}/>}
                            {showContent &&<Container fluid className="content" dangerouslySetInnerHTML={{__html: replaceLinks(theContent)}}/>}
                            {showLink === true &&<a href={post.link.replace(/^[a-z]{1,}\:\/{2}([a-z]{1,}.){1,}\//, '#' + intl.locale + '/')} className="link">Read More</a>}
                        </Enhance>
                </EmbeddedGateway>
        } else {
            return showLoading ? 'Loading' : false;
        }
    }

}


export default injectIntl(Content)
