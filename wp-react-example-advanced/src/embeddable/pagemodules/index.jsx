import {Container, Image, Menu, Visibility} from "semantic-ui-react";
import React, {createRef} from "react";
import {MediaConsumer, MediaProvider, PageConsumer, PageProvider, PostContent} from "@devgateway/wp-react-lib";

import {injectIntl} from "react-intl";
import FloatingNavigator from './FloatingNavigator'


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

            <MediaProvider id={page.meta_fields && page.meta_fields.icon ? page.meta_fields.icon[0] : null}>
                <MediaConsumer>
                    <SectionHeader title={page.title.rendered} subtitle={page.meta_fields.subtitle}/>
                </MediaConsumer>
            </MediaProvider>
            {page && <PostContent as={Container} fluid={true} post={page}/>}
        </Container>)

    }

}

class PageIterator extends React.Component {
    contextRef = createRef()

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

        const bboxScreen = document.body.getBoundingClientRect();
        const bbox = document.getElementById(id) ? document.getElementById(id).getBoundingClientRect() : null;

        if (onScreen && bbox != null) {

            if (direction == 'down') {

                if (bbox.y / bboxScreen.height < .7) {
                    active = true
                }


            }
            if (direction == 'up' && bbox.y / bboxScreen.height < .7) {
                active = true

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
        const {pages, locale, editing, navTitle, toTopLabel} = this.props
        const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
        const list = childPages.map(p => {
            return {
                active: (this.state.modules.indexOf(p.id) > -1),
                id: p.id,
                label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
                iconComponent: <MediaProvider id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                    <MediaConsumer>
                        <MediaImage/>
                    </MediaConsumer>
                </MediaProvider>
            }
        })

        return (<React.Fragment>

                {!editing && <FloatingNavigator navTitle={navTitle} toTopLabel={toTopLabel} sections={list}/>}

                <div className={"pages"}>
                    {childPages.map(p => (
                            <Visibility onUpdate={(e, {calculations}) => {
                                this.onVisibilityUpdate(p.id, calculations)
                            }}>

                                <Module locale={locale} {...this.props} page={p}
                                        onVisibilityUpdate={this.onVisibilityUpdate}/>

                            </Visibility>
                        )
                    )}
                </div>
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
        "data-nav-label": navTitle = "Sections",
        "data-to-top-label": toTopLabel = "TO THE TOP",
        editing, parent, unique,
        intl: {locale}
    } = props


    return (<Container className="tcdi dashboard green" fluid={true}>

            {props.parent &&
            <PageProvider parent={props.parent} store={"modules_" + parent + "_" + unique} perPage={100}>
                <PageConsumer>
                    <PageIterator toTopLabel={toTopLabel} navTitle={navTitle} editing={editing === "true"}
                                  locale={locale}></PageIterator>
                </PageConsumer>
            </PageProvider>}

        </Container>
    )
}


export default injectIntl(Root)
