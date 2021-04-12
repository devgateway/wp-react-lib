import React, {useState} from 'react'
import {Accordion, Container, Grid, Label, Segment} from 'semantic-ui-react'
import PostProvider from "../../wp/providers/PostProvider";
import PostConsumer from "../../wp/consumers/PostConsumer";
import TheContent from "../../wp/template-parts/TheContent";
import TheIntro from "../../wp/template-parts/TheIntro";
import MediaProvider from "../../wp/providers/MediaProvider";
import MediaConsumer from "../../wp/consumers/MediaConsumer";
import TheIcon from "../../wp/template-parts/TheIcon";
import Icon from "../body/Heart";


class ListOfPost extends React.Component {

     render() {
        const {posts,showIcons} = this.props
        return (
            <Container fluid className="inline list">
                {posts && posts.map(p => (

                            <Grid>
                                {showIcons&&<Grid.Column textAlign={"center"} width={1}>
                                    <MediaProvider
                                        id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <TheIcon as={Label}></TheIcon>
                                        </MediaConsumer>
                                    </MediaProvider>
                                </Grid.Column>}
                                <Grid.Column width={showIcons?15:16}>
                                        <TheIntro as={Container} fluid post={p}/>
                                </Grid.Column>

                            </Grid>
                    ))}

            </Container>
        )
    }
}


const Root = (props) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1    );
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-show-post-icons": showIcons,
        parent,
        editing,
        component,

    } = props

    return  <Container className={`tcdi inline list ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider  type={type}
                      taxonomy={taxonomy}
                      categories={categories}
                      store={"inline_list_"+random}
                      page={1}
                      perPage={items}>
            <PostConsumer>
                    <ListOfPost showIcons={showIcons==="true"}/>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
