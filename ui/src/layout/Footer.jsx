import React, {Component} from "react";
import {Container, Grid, Header} from "semantic-ui-react";
import './footer.scss'

class Footer extends Component {
    componentDidMount() {

    }

    render() {
        const {children, fixed, location} = this.props
        return (<Container fluid className={"tcdi footer"}>
            <Container>
                <Grid columns={4}>
                    <Grid.Column><img src={"/home/footer_logo.png"}></img></Grid.Column>
                    <Grid.Column>
                        <Header as={"h4"}>Development Gateway</Header>

                        <p>
                            Development Gateway, Inc.<br/>
                            1100 13th Street, NW, Suite 800<br/>
                            Washington, DC 20005, USA<br/>
                            Tel: +1.202.572.9200
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as={"h4"}>University of Cape Town</Header>
                        <p>
                            University of Cape Town<br/>
                            Research Unit on the Economic Excisable Products (REEP)<br/>
                            School of Economics<br/>
                            Bremner Building, Lovers Walk, University of Cape Town, Rondebosch, 7701 South Africa<br/>
                            Tel: +27 (0)21 650 3608
                        </p>

                    </Grid.Column>
                    <Grid.Column>
                        <Header>Contact Us</Header>
                        <p>
                        <a href="mailto:info@tobaccocontroldata.org">info@tobaccocontroldata.org</a>
                        </p>
                    </Grid.Column>

                </Grid>
            </Container>
            <Container fluid className={"tcdi secondary-menu"}>
                <Container>

                    <Grid >

                        <Grid.Column width={16}>
                            <p>
                                © Tobacco Control Initiative, 2021. All Rights Reserved.
                            </p>
                        </Grid.Column>

                    </Grid>
                </Container>
            </Container>
        </Container>)
    }
}


export default Footer
