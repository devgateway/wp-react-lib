import React from 'react'
import EmbeddedGateway from '../embedded/EmbeddedGateway'
import {Container} from "semantic-ui-react";
import {removePatternBrackets, replaceHTMLinks, replaceLink} from "../util";

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


/*
WP_Multilang doesn't support patterns translation, this function eliminates the duplicated pattern
* */
const translate = (str, locale = "en") => {
    if (str==null){
        return null;
    }

    let newStr=null;
    const matches = str.match(/\[:([a-z])+\]([\s\S]*?)\[:\]/img)
    if (matches != null) {
        matches.forEach((part) => {
            let regularExpression = new RegExp(`\\[:${locale}\\][\\s\\S]([\\s\\S]*?)\\[:`, 'g')
            let tr = part.match(regularExpression)
            
            if (tr != null) {
                
                let translation = tr[0]
                newStr = str.replace(part, translation.substring(5, translation.length - 2))
            }
        })
    }
    return newStr?newStr:str
}

const Content = (props) => {
    const [showContentEnabled, setShowContentEnabled] = React.useState(false);

    React.useEffect(() => {
        if (props.onLoad) {
            props.onLoad();
        }
    }, []);

    const {
        post, pageNumber, showTitle, showContent, showIntro, showDate, showLoading, as, locale, messages, preview
    } = props;

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

        return <EmbeddedGateway parentUnique={props.parentUnique} messages={messages}
                                parent={preview ? post.parent : post.id}>
            <Enhance className="entry-content" {...props}>
                <div></div>
                {showDate && <Container fluid className="date">{post.date.toLocaleString()}</Container>}
                {showTitle && <span id={post.slug} className="title"
                                    dangerouslySetInnerHTML={{__html: post.title.rendered}} key="title"/>}
                {showIntro && <Container fluid className="excerpt"
                                         dangerouslySetInnerHTML={{__html: removePatternBrackets(replaceHTMLinks(translate(intro, locale), locale))}} key="intro"/>}
                {showContent && <Container fluid className="content "
                                           dangerouslySetInnerHTML={{__html: removePatternBrackets(replaceHTMLinks(translate(body, locale), locale))}} key="content"/>}

            </Enhance>
        </EmbeddedGateway>
    } else {
        return showLoading ? 'Loading' : false;
    }
}


export default Content
