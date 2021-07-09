import React, {useEffect, useState} from 'react'
import {Container, Grid, Icon, Label, Segment, Transition} from 'semantic-ui-react'
import {
    MediaConsumer,
    MediaProvider,
    PostConsumer,
    PostContent,
    PostIcon,
    PostIntro,
    PostProvider,
    PostTitle
} from "@devgateway/wp-react-lib";


const FeaturedPost = ({post, onClick, active, moreLabel}) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null

    return (<div className="cover" style={{"backgroundImage": 'url(' + (media ? media[0].source_url : '') + ')'}}>
        <PostIntro post={post}/> {!active ?
        <Label onClick={onClick}><Icon name='search' size="large"/> {moreLabel}</Label> :
        <Label onClick={onClick}><Icon name='arrow alternate circle left outline' size="large"/> Back </Label>}
    </div>)
}

const FeaturedTabs = ({posts, width, height, color, moreLabel}) => {
    const [active, setActive] = useState(null)
    const [visible, setVisible] = useState(false)
    const [scrollPos, setScrollPos] = useState([])
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

    useEffect(() => {
        if (active) {
            setScrollPos([window.scrollX, window.scrollY])
        }
        if (active == null) {
            console.log(scrollPos)
            window.scrollTo(scrollPos[0], scrollPos[1])

        }
    }, [active])

    return (
        <Container fluid={true} className="featured tabs" style={{"min-height": height + 'px'}}>

            <Grid stackable columns={active != null ? 1 : posts.length} className="desktop">
                {posts && posts.map((post, i) => {
                    return <React.Fragment>
                        <Transition.Group animation={'fade'} duration={{show: 200, hide: 0}}>
                            {(active == null) && <Grid.Column style={{"background-color": arrayColors[i]}}>
                                <FeaturedPost post={post} moreLabel={moreLabel}
                                              onClick={e => toggleAnimation(post.slug)}/>
                            </Grid.Column>}
                        </Transition.Group>

                        <Transition.Group animation={'fade'} duration={{show: 300, hide: 0}}>
                            {active == post.slug &&
                            <Grid.Column className="expanded">

                                <Segment style={{"background-color": arrayColors[i]}}>
                                    <MediaProvider id={post.meta_fields ? post.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <PostIcon></PostIcon>
                                        </MediaConsumer>
                                    </MediaProvider>
                                    <PostTitle as={"h2"} className={"expanded title has-standard-18-font-size"}
                                               post={post} className={"has-standard-36-font-size has-white-color"}/>

                                </Segment>
                                <PostContent as={"div"} fluid={true} post={post}/>

                                <Label onClick={e => setActive(null)}><Icon name='arrow alternate circle left outline'
                                                                            size="large"/> Back </Label>

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
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-read-more-label": moreLabel = "READ More",
        editing, parent, unique
    } = props
    return <Container className={`wp-react-lib featured tabs ${editing ? 'editing' : ''}`} fluid={true}>

        <PostProvider type={type} taxonomy={taxonomy} categories={categories}
                      store={"tabbedposts_" + parent + "_" + unique} page={1}
                      perPage={items}>
            <PostConsumer>
                <FeaturedTabs moreLabel={moreLabel} color={color} width={width} height={height}></FeaturedTabs>
            </PostConsumer>
        </PostProvider>
    </Container>
}


export default Root
