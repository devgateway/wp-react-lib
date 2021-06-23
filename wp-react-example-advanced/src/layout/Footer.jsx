import React, {Component} from "react";
import {Container} from "semantic-ui-react";

import {Page, PageConsumer, PageProvider} from "wp-react-lib";


class Footer extends Component {
    componentDidMount() {

    }

    render() {
        const {children, fixed, location} = this.props
        return (<Container fluid className={"tcdi footer"}>

            <PageProvider slug={"footer"} store={"footer"}>
                <PageConsumer>
                    <Page></Page>
                </PageConsumer>
            </PageProvider>

        </Container>)
    }
}


export default Footer
