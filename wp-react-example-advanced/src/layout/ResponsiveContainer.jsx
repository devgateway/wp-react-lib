import React, {Component} from 'react'

import {Container, Icon, Menu, Sidebar,} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import MainMenu from "@devgateway/wp-react-lib"
import {Media} from "../AppMedia"
import Footer from "./Footer";
import Header from "./Header";

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
            <Container fluid>
                <Header></Header>
                <Container className="desktop">
                    {children}
                </Container>
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


    render() {
        const {children, fixed} = this.props
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
