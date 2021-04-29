import React, {useState} from 'react'
import {Button, Container, Grid, Label, Menu} from 'semantic-ui-react'
import {PostConsumer, PostProvider} from "../../wp";
import TheIntro from "../../wp/template-parts/TheIntro";
import '../embeddable.scss'
import MediaProvider from "../../wp/providers/MediaProvider";
import MediaConsumer from "../../wp/consumers/MediaConsumer";
import TheIcon from "../../wp/template-parts/TheIcon";
import TheLabel from "../../wp/template-parts/TheLabel";

const ItemMenu = ({posts, activeItem, setActive,showLabels}) => {

    return posts ? posts.map(post => <Menu.Item key={post.id} onClick={e => setActive(post.slug)}
                                                className={post.slug === activeItem ? 'active' : ''}>

        {showLabels?<TheLabel post={post}></TheLabel>:<Label><span dangerouslySetInnerHTML={{__html: post.title.rendered}}/></Label>}


    </Menu.Item>) : null

}

const GriNavigator = ({posts, activeItem, setActive, showIcons, showLabels}) => {
    return posts ? posts.map(post => {
        const iconUrl = post['_embedded'] && post['_embedded']["wp:featuredmedia"] ? post['_embedded']["wp:featuredmedia"][0].source_url : null
        return <Grid.Column key={post.id}
                            className={(post.slug == activeItem ? 'active' : null) + (showIcons ? ' has-icon' : '')}>

            <Button onClick={e => setActive(post.slug)}>
                {showIcons &&<MediaProvider id={post.meta_fields&&post.meta_fields.icon?post.meta_fields.icon[0]:null}>
                    <MediaConsumer>
                        <TheIcon className={"icon"}></TheIcon>
                    </MediaConsumer>
                </MediaProvider>}

                {showLabels?<TheLabel  post={post}></TheLabel>:<Label><span dangerouslySetInnerHTML={{__html: post.title.rendered}}/></Label>}

            </Button>
        </Grid.Column>
    }) : null
}

const TabContent = ({posts, activeItem}) => {

    return posts ? posts.filter(p => p.slug === activeItem).map(p => <TheIntro as={Container} fluid key={p.id} post={p}/>) : null


}


const SingleTabbedView = ({posts,showLabels}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null)

    return (
        <React.Fragment>

            <Menu className="tabbed posts" text>
                <ItemMenu showLabels={showLabels} posts={posts} setActive={setActive} activeItem={activeItem}></ItemMenu>
            </Menu>

            <TabContent posts={posts} activeItem={activeItem}></TabContent>

        </React.Fragment>
    )
}


const GridTabbedView = ({posts, showLabels,showIcons}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null)

    return (
        <React.Fragment>
            <Grid stackable className="tabbed posts" columns={posts.length}>
                <GriNavigator showIcons={showIcons} showLabels={showLabels} posts={posts} activeItem={activeItem}
                              setActive={setActive}></GriNavigator>
                <Grid.Row>
                    <Grid.Column width={16} className={"content"}>
                        <TabContent posts={posts} activeItem={activeItem}></TabContent>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    )
}


const Wrapper = (props) => {


    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-theme": theme = 'light',
        "data-show-icons": showIcons,
        "data-show-labels": showLabels,
        parent, editing
    } = props

    return <Container className={`tcdi tabbed posts ${editing ? 'editing' : ''}`} fluid={true}>
                <PostProvider type={type} taxonomy={taxonomy} categories={categories}
                      store={"tabbedposts_" + parent} page={1}
                      perPage={items}>
                    <PostConsumer>

                        {theme == 'light' ? <SingleTabbedView showLabels={showLabels=="true"}></SingleTabbedView> :<GridTabbedView showLabels={showLabels==='true'} showIcons={showIcons == 'true'}></GridTabbedView>}

            </PostConsumer>

        </PostProvider>
    </Container>
}

export default Wrapper
