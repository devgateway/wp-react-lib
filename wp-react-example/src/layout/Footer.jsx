import React, {Component} from "react";
import {Container, Grid, Header, Image} from "semantic-ui-react";

import {PageConsumer,PageProvider,Page} from  '../wp-react-lib/src/index';


class Footer extends Component {

    componentDidMount() {}

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
