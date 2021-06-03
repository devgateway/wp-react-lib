import {Container, Grid} from "semantic-ui-react";

import React from "react";

import {PageConsumer,PageProvider, PostIntro} from "dg-wp-react";

import {connect} from "react-redux";
import './gallery.scss'

const DashboardGallery = ({pages,width}) => {
    return (<Grid  columns={3} stackable={true}>
        {pages && pages.map(p =>
                <Grid.Column  className={"item"}>
                    <Container fluid={true} className={"preview"}>
                        <PostIntro as={"div"} post={p}></PostIntro>
                    </Container>
                </Grid.Column>
            )}
    </Grid>)
}

const Root = (props) => {
    return (<Container fluid className="tcdi dashboard gallery">

            {props.parent&&<PageProvider parent={props.parent} store={"gallery"} perPage={100}>
                <PageConsumer>
                    <DashboardGallery width={props.width}></DashboardGallery>
                </PageConsumer>
            </PageProvider>}
            {!props.parent&&<h1>No child pages yet</h1>}
        </Container>
        )
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Root)