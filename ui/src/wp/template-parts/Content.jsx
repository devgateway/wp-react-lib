import React from 'react'
import {FormattedDate, injectIntl} from 'react-intl';

import EmbeddedGateway from '../EmbeddedGateway.js'
import {Container} from "semantic-ui-react";

const replaceLinks = (html) => {

    var link;
    var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
    if (document.location.hostname==='localhost'){
        var re = new RegExp("^(http|https)://localhost", "i");
    }else{
        //replace wp.someurl
        var re = new RegExp("^(http|https)://"+"wp."+document.location.hostname, "i");
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
    debugger
    const Component = props.as ? props.as : Container;
    return <Component {...props}>{props.children}</Component>
}


class Content extends React.Component {

    componentDidMount() {

    }

    render() {
        const {
            intl,
            post,
            pageNumber,
            visibility = {'title': true, 'content': true, 'intro': true, 'link': true},
            as
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

                        <Enhance {...this.props}  key={post.id} className="entry-content">
                            {post && visibility['date'] == true &&
                            <div className="date"><FormattedDate value={post.date} day="numeric" month="long" year="numeric"/>
                            </div>}
                            {post && visibility['title'] != false &&
                            <h2><div className="title" dangerouslySetInnerHTML={{__html: post.title.rendered}}/></h2>}
                            {post && visibility['intro'] != false &&
                            <div className="excerpt" dangerouslySetInnerHTML={{__html: replaceLinks(intro)}}/>}
                            {post && visibility['content'] != false &&
                            <div className="entry-content" dangerouslySetInnerHTML={{__html: replaceLinks(theContent)}}/>}
                            {post && visibility['link'] === true &&
                            <a href={post.link.replace(/^[a-z]{1,}\:\/{2}([a-z]{1,}.){1,}\//, '#' + intl.locale + '/')}
                               className="link">
                                Read More</a>}
                        </Enhance>

            </EmbeddedGateway>
        } else {
            return visibility['showLoading'] ? 'Loading' : false;
        }
    }

}


export default injectIntl(Content)
