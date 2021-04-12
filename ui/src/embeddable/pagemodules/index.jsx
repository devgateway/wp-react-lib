import {Container, Grid, Image, Menu, Visibility} from "semantic-ui-react";
import React from "react";
import PageProvider from "../../wp/providers/PageProvider";
import {PageConsumer} from "../../wp";
import './modules.scss'
import Content from "../../wp/template-parts/Content";
import MediaProvider from "../../wp/providers/MediaProvider";
import MediaConsumer from "../../wp/consumers/MediaConsumer";

import {injectIntl} from "react-intl";
import FloatingNavigator from './FloatingNavigator'
import TheContent from "../../wp/template-parts/TheContent";


export const SectionHeader = ({title, subtitle, icon, media}) => {
    return <Menu className="header title" text>
        <Menu.Item>

            <Image src={media && media.guid ? media.guid.rendered : icon}/>
        </Menu.Item>
        <Menu.Header>
            <div>
                <h1 className="has-light-blue-color">{title}</h1>
                <h2 className="has-gray-color">{subtitle}</h2>
            </div>
        </Menu.Header>
    </Menu>
}

const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null}/>

class Module extends React.Component {

    render() {
        const {page, locale} = this.props
        return (<Container fluid={true} className={"section " + page.slug} id={page.id}>

            <MediaProvider id={page.meta_fields&&page.meta_fields.icon?page.meta_fields.icon[0]:null}>
                <MediaConsumer>
                    <SectionHeader title={page.title.rendered} subtitle={page.meta_fields.subtitle}/>
                </MediaConsumer>
            </MediaProvider>
            {page && <TheContent as={Container} fluid={true} post={page} visibility={{content: true, title: false}}/>}
        </Container>)

    }

}

class PageIterator extends React.Component {
    constructor(props) {
        super(props)
        this.onVisibilityUpdate = this.onVisibilityUpdate.bind(this)
        this.state = {modules: []};
    }

    componentDidMount() {

    }

    onVisibilityUpdate(id, {
        bottomPassed,
        bottomVisible,
        direction,
        fits,
        height,
        offScreen,
        onScreen,
        passing,
        percentagePassed,
        pixelsPassed,
        topPassed,
        topVisible,
        width
    }) {
        let active = false

        if (onScreen) {
            if (direction == 'down') {
                active = true
                if (passing && percentagePassed > .75) {
                    active = false
                }
            }

            if (direction == 'up') {
                if (onScreen) {
                    if (topVisible) {
                        active = true
                    }

                    if (passing && percentagePassed < .65) {
                        active = true
                    }

                }

            }
        }
        let modules = this.state.modules.slice();

        if (active) {
            if (modules.indexOf(id) == -1) {

                modules.push(id)
            }
        } else {


            modules = modules.filter(d => d != id)
        }
        this.setState({modules})
    }


    render() {

        const {pages, locale, editing} = this.props

        const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []

        const list = childPages.map(p => {
            return {
                active: (this.state.modules.indexOf(p.id) > -1),
                id: p.id,
                label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
                iconComponent: <MediaProvider id={p.meta_fields&&p.meta_fields.icon?p.meta_fields.icon[0]:null}>
                    <MediaConsumer>
                        <MediaImage/>
                    </MediaConsumer>
                </MediaProvider>
            }
        })

        return (
            <React.Fragment>
                    {!editing&&<FloatingNavigator sections={list}/>}
                     {childPages.map(p => <Visibility onUpdate={(e, {calculations}) => {
                        this.onVisibilityUpdate(p.id, calculations)
                    }}>
                        <Module locale={locale} {...this.props} page={p} onVisibilityUpdate={this.onVisibilityUpdate}/>
                    </Visibility>
                )}

            </React.Fragment>
        )
    }
}


const Root = (props) => {

    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        editing,
        intl: {locale}
    } = props
    return (<Container className="tcdi dashboard green">
            {props.parent && <PageProvider parent={props.parent} store={props.parent} perPage={100}>
                <PageConsumer>
                    <PageIterator editing={editing==="true"} locale={locale}></PageIterator>
                </PageConsumer>
            </PageProvider>}
            {!props.parent && <h1>No child pages yet</h1>}
        </Container>
    )
}


export default injectIntl(Root)