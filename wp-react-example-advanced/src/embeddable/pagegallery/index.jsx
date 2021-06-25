import {Container, Grid} from "semantic-ui-react";
import {PageConsumer, PageProvider, PostIntro} from "@devgateway/wp-react-lib";
import React from "react";
import {connect} from "react-redux";
import './gallery.scss'

const DashboardGallery = ({pages, width}) => {

    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []

    return (<Grid columns={3} stackable={true}>
        {childPages.map(p =>
            <Grid.Column className={"item"}>
                <Container fluid={true} className={"preview"}>
                    <PostIntro as={"div"} post={p}></PostIntro>
                </Container>
            </Grid.Column>
        )}
    </Grid>)
}

const Root = (props) => {
    return (<Container fluid className="tcdi dashboard gallery">

            {props.parent &&
            <PageProvider parent={props.parent} store={"gallery_" + props.parent + '_' + props.unique} perPage={100}>
                <PageConsumer>
                    <DashboardGallery width={props.width}></DashboardGallery>
                </PageConsumer>
            </PageProvider>}
            {!props.parent && <h1>No child pages yet</h1>}
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Root)