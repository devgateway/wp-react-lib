import {Container, Grid} from "semantic-ui-react";
import TheIntro from "../../wp/template-parts/TheIntro";
import React from "react";
import PageProvider from "../../wp/providers/PageProvider";
import {PageConsumer} from "../../wp";
import {connect} from "react-redux";
import './gallery.scss'
const DashboardGallery = ({pages,width}) => {
    return (<Grid  columns={3} stackable={true}>
        {pages && pages.map(p =>
                <Grid.Column  className={"item"}>
                    <Container fluid={true} className={"preview"}>
                        <TheIntro as={"div"} post={p}></TheIntro>
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