import {Container, Flag, Menu} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import MenuProvider from "../wp/providers/MenuProvider";
import MenuConsumer from "../wp/consumers/MenuConsumer";
import {PageConsumer} from "../wp";
import {injectIntl} from "react-intl";
import {replaceLink} from '../wp/htmlUtils'
import TheTitle from "../wp/template-parts/TheTitle";
import {withRouter} from "react-router";
import Search from '../wp/Search'

const BreadCrumbs = ({pages}) => {

    debugger;
    return <React.Fragment>
        {pages && pages.map(p => <p>{p.slug != 'home' ?
            <span><a href={"/#"}> Home</a> / <TheTitle as={"span"} post={p}></TheTitle></span> : ''}</p>)}
    </React.Fragment>

}


const MyMenuItems = ({withIcons, active, menu, onSetSelected, selected, locale}) => {

    useEffect((e) => {
    }, [menu])

    return menu && <React.Fragment>
        {menu.items.map(i => (
            <Menu.Item  className={`divided ${selected && selected.ID == i.ID ? 'selected' : ''}  ${active==i.slug?"active":""}`}
                       onMouseOver={e => onSetSelected(i)}>
                {withIcons && <div className={"mark"}></div>}
                {i.child_items?<span>{i.title}</span>:<a href={replaceLink(i.url, locale)}>{i.title}</a>}

            </Menu.Item>
        ))}

    </React.Fragment>
}

const Header = ({intl, match}) => {

    const [selected, setSelected] = useState()
    const {slug} = match.params
    debugger;

    return <React.Fragment>
        <Container fluid={true} className="header">
            <Container fluid={true} className={"background"}>
                <MenuProvider slug={"main"}>
                    <Menu className={"branding"} text>
                        <Menu.Item>
                            <a href="/"><img className="brand logo" size="large" src='/logo_full.png'/></a>
                        </Menu.Item>

                        <Menu.Item className={"divider"}>
                            <div></div>
                        </Menu.Item>

                        <Menu.Item fitted>
                            <Flag name="za"/> <b>South Africa</b>
                        </Menu.Item>

                        <Menu.Menu className={"pages"}>
                            <MenuConsumer>
                                <MyMenuItems active={slug} locale={intl.locale} selected={selected}
                                             onSetSelected={setSelected}></MyMenuItems>
                            </MenuConsumer>
                        </Menu.Menu>

                        <Menu.Item fitted>
                            <Search/>
                        </Menu.Item>
                    </Menu>
                </MenuProvider>
            </Container>

            <Container fluid={true} className={"child"}>
                {selected && selected.child_items && <Menu fluid text>
                    <MyMenuItems active={slug} locale={intl.locale} withIcons onSetSelected={e => null}
                                 menu={{items: selected.child_items}}>}</MyMenuItems>
                </Menu>}
            </Container>
        </Container>


        <Container className={"url breadcrumbs"}>
            <PageConsumer>
                <BreadCrumbs></BreadCrumbs>
            </PageConsumer>

        </Container>

    </React.Fragment>

}


export default injectIntl(withRouter(Header))