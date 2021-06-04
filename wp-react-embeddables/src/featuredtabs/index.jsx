import React, {useState} from 'react'
import {Container, Grid, Icon, Label, Segment, Transition} from 'semantic-ui-react'
import TheContent from "../../wp/template-parts/TheContent";
import PostProvider from "../../wp/providers/PostProvider";
import PostConsumer from "../../wp/consumers/PostConsumer";
import TheTitle from "../../wp/template-parts/TheTitle";
import Content from "../../wp/template-parts/Content";
import MediaProvider from "../../wp/providers/MediaProvider";
import MediaConsumer from "../../wp/consumers/MediaConsumer";
import TheIcon from "../../wp/template-parts/TheIcon";


const FeaturedPost = ({post,  onClick, active}) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null

    return (<div className="cover" style={{"backgroundImage": 'url(' + (media ? media[0].source_url : '') + ')'}}>

        <Content showTitle={false} showIntro={true} showContent={false}  post={post} /> {!active ?
        <Label onClick={onClick}><Icon name='search' size="large"/> LEARN More</Label> :
        <Label onClick={onClick}><Icon name='arrow alternate circle left outline' size="large"/> Back </Label>}
    </div>)
}

const FeaturedTabs = ({posts, width, height, color}) => {
    const [active, setActive] = useState(null)
    const [visible, setVisible] = useState(false)
    const arrayColors = color.split(',')
    const toggleAnimation = (k) => {
        if (!visible) {
            setActive(k)
            setVisible(true)
        } else {
            setVisible(false)
            setActive(k)
        }
    }
    return (
        <Container fluid={true} className="featured tabs" style={{"min-height": height + 'px'}}>
            <Grid stackable columns={active != null ? 1 : posts.length} className="desktop">
                {posts && posts.map((post, i) => {
                    return <React.Fragment>
                        <Transition.Group animation={'fade'} duration={{show: 200, hide: 0}}>
                            {(active == null) && <Grid.Column style={{"background-color": arrayColors[i]}}>
                                <FeaturedPost  post={post}
                                              onClick={e => toggleAnimation(post.slug)}/>
                            </Grid.Column>}
                        </Transition.Group>

                        <Transition.Group animation={'fade'} duration={{show: 300, hide: 0}}>
                            { active == post.slug &&
                            <Grid.Column className="expanded">

                                <Segment style={{"background-color": arrayColors[i]}}>
                                    <MediaProvider id={post.meta_fields?post.meta_fields.icon[0]:null}>
                                        <MediaConsumer>
                                            <TheIcon></TheIcon>
                                        </MediaConsumer>
                                    </MediaProvider>
                                    <TheTitle as={"h2"} className={"expanded title has-standard-18-font-size"}
                                              post={post} className={"has-standard-36-font-size has-white-color"}/>

                                </Segment>
                                <TheContent as={"div"}  fluid={true} post={post}/>

                                <Label onClick={e=>setActive(null)}><Icon  name='arrow alternate circle left outline' size="large"/> Back </Label>

                            </Grid.Column>

                            }
                        </Transition.Group>
                    </React.Fragment>
                })}

            </Grid>


        </Container>
    )
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
        editing, parent
    } = props
    return <Container className={`tcdi featured tabs ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider type={type} taxonomy={taxonomy} categories={categories} store={"posts_"+random} page={1}
                      perPage={items}>
            <PostConsumer>
                <FeaturedTabs color={color} width={width} height={height}></FeaturedTabs>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
