import React, {Component} from 'react'
import {withRouter,} from "react-router-dom";

import {Container, Icon, Menu, Sidebar,} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './layout.scss'
import MainMenu from '../wp/Menu.jsx'
import {Media} from "../AppMedia"
import Footer from "./Footer";
import {Route} from "react-router";
import {injectIntl} from "react-intl";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    render() {
        const {children, fixed} = this.props
        return (
            <Container fluid className="desktop">
                <MainMenu slug="main" fixed={fixed}/>
                {children}
            </Container>


        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {

    state = {}
    handleSidebarHide = () => this.setState({sidebarOpened: false})
    handleToggle = () => this.setState({sidebarOpened: true})

    render() {
        const {children, big} = this.props
        const {sidebarOpened} = this.state

        return (
            <Container>
                <Sidebar
                    as={Menu}
                    animation='push'
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}>
                    <Container>
                        <MainMenu slug="main"/>
                    </Container>

                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Container fluid>
                        <Menu>
                            <Menu.Item onClick={this.handleToggle}> <Icon name='sidebar' color="orange"/> </Menu.Item>
                        </Menu>
                        {children}
                    </Container>
                </Sidebar.Pusher>
            </Container>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

class ResponsiveContainer extends Component {

    componentDidUpdate(prevProps) {
      debugger;
    }

    render() {
        const {children, fixed,locale} = this.props
        return (<div>
            <style>
                {Media.mediaStyles}
            </style>

            <DesktopContainer fixed={fixed}>
                    {children}
            </DesktopContainer>
            <Footer></Footer>
        </div>)
    }
}


export default ResponsiveContainer
