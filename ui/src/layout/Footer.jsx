import React, {Component} from "react";
import {Container, Grid, Header, Image} from "semantic-ui-react";
import './footer.scss'

class Footer extends Component {
    componentDidMount() {

    }

    render() {
        const {children, fixed, location} = this.props
        return (<Container fluid className={"tcdi footer"}>
            <Container>
                <Grid columns={4}>
                    <Grid.Column>
                        <Header as={"h4"}>Development Gateway</Header>

                        <p>
                            Vivamus ac neque eu tortor efficitur posuere a in odio.<br/>
                            Praesent rutrum mauris feugiat magna iaculis auctor.<br/>
                            Curabitur tincidunt massa a eros imperdiet, nec faucibus lorem imperdiet.<br/>
                        </p>

                    </Grid.Column>
                    <Grid.Column>
                        <Header as={"h4"}>Development Gateway</Header>

                        <p>
                            Development Gateway, Inc.<br/>
                            1110 Vermont Ave. NW., Suite 500<br/>
                            Washington, DC 20005, USA<br/>
                            Tel: +1.202.572.9200
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as={"h4"}>What is Lorem Ipsum?</Header>
                        <p>
                            Vivamus ac neque eu tortor efficitur posuere a in odio.<br/>
                            Praesent rutrum mauris feugiat magna iaculis auctor.<br/>
                            Curabitur tincidunt massa a eros imperdiet, nec faucibus lorem imperdiet.<br/>
                        </p>

                    </Grid.Column>
                    <Grid.Column>
                        <Header>Contact Us</Header>
                            <p>
                                Vivamus ac neque eu tortor efficitur posuere a in odio.<br/>
                                Praesent rutrum mauris feugiat magna iaculis auctor.<br/>
                                Curabitur tincidunt massa a eros imperdiet, nec faucibus lorem imperdiet.<br/>
                            </p>

                    </Grid.Column>

                </Grid>
            </Container>
            <Container fluid className={"tcdi secondary-menu"}>
                <Container>

                    <Grid >
                        <Grid.Column width={11}>

                        </Grid.Column>
                        <Grid.Column width={5}>
                            <p>

                            </p>
                        </Grid.Column>

                    </Grid>
                </Container>
            </Container>
        </Container>)
    }
}


export default Footer