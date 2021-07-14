import React, {useState} from 'react'
import {Container, Grid, Label} from 'semantic-ui-react'
import {MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostIntro, PostProvider} from "@devgateway/wp-react-lib";


class ListOfPost extends React.Component {

    render() {
        const {posts, showIcons} = this.props
        return (
            <Container fluid className="inline list">
                {posts && posts.map(p => (

                    <Grid>
                        {showIcons && <Grid.Column textAlign={"center"} width={1}>
                            <MediaProvider
                                id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                                <MediaConsumer>
                                    <PostIcon as={Label}></PostIcon>
                                </MediaConsumer>
                            </MediaProvider>
                        </Grid.Column>}
                        <Grid.Column width={showIcons ? 15 : 16}>
                            <PostIntro as={Container} fluid post={p}/>
                        </Grid.Column>

                    </Grid>
                ))}

            </Container>
        )
    }
}


const Root = (props) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
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
        component, unique

    } = props

    return <Container className={`wp-react-lib inline list ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider type={type}
                      taxonomy={taxonomy}
                      categories={categories}
                      store={"inline_list_" + parent + "_" + unique}
                      page={1}
                      perPage={items}>
            <PostConsumer>
                <ListOfPost showIcons={showIcons === "true"}/>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
