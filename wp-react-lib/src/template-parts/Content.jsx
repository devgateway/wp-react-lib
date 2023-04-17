import React from 'react'
import EmbeddedGateway from '../embedded/EmbeddedGateway'
import {Container} from "semantic-ui-react";
import {replaceHTMLinks, replaceLink} from "../util";

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
    constructor(props) {
        super(props);
        this.state = {showContentEnabled: false}

    }

    componentDidMount() {
        if ( this.props.onLoad){
             this.props.onLoad()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        const {
            post,
            pageNumber,
            showTitle,
            showContent,
            showIntro,
            showDate,
            showLoading,
            as,
            locale,
            messages,
            preview
        } = this.props

          if (post) {
            const contentParts = post.content ? post.content.rendered.split("<!--more-->") : []
            const intro = contentParts.length > 1 ? contentParts[0] : null
            const content = contentParts.length > 1 ? contentParts[1] : contentParts[0]
            const pages = content ? content.split("<!--nextpage-->") : '';

            let body = ''
            if (pageNumber != null && pages.length > 0) {
                body = pages[pageNumber]
            } else {
                body = content
            }

            return <EmbeddedGateway parentUnique={this.props.parentUnique}  messages={messages} parent={preview ? post.parent : post.id}>
                <Enhance className="entry-content" {...this.props}>
                    <div></div>
                    {showDate &&
                        <Container fluid className="date">{post.date.toLocaleString()}</Container>}
                    {showTitle &&
                        <span id={post.slug} className="title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />}
                    {showIntro &&
                        <Container fluid className="excerpt"
                            dangerouslySetInnerHTML={{ __html: replaceHTMLinks(intro, locale) }} />}
                    {showContent &&
                        <Container fluid className="content"
                            dangerouslySetInnerHTML={{ __html: replaceHTMLinks(body, locale) }} />}

                </Enhance>
            </EmbeddedGateway>
        } else {
            return showLoading ? 'Loading' : false;
        }
    }

}


export default Content
