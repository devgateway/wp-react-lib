import React, {useState} from 'react'
import {Button, Container, Grid, Menu} from 'semantic-ui-react'
import {PostConsumer, PostProvider} from "../../wp";
import Content from "../../wp/template-parts/Content";


const ItemMenu = ({posts, activeItem, setActive}) => {

    return posts ? posts.map(post => <Menu.Item key={post.id} onClick={e => setActive(post.slug)}
                                                className={post.slug === activeItem ? 'active' : ''}>
        <div className="title" dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
    </Menu.Item>) : null

}

const GriNavigator = ({posts, activeItem, setActive, useIcons}) => {
    return posts ? posts.map(post => {
        const iconUrl = post['_embedded'] && post['_embedded']["wp:featuredmedia"] ? post['_embedded']["wp:featuredmedia"][0].source_url : null
        return <Grid.Column key={post.id}
                            className={(post.slug == activeItem ? 'active' : null) + (useIcons ? ' has-icon' : '')}>
            <Button onClick={e => setActive(post.slug)}> {useIcons &&
            <div className="icon" style={{"backgroundImage": 'url(' + iconUrl + ')'}}/>}
                <div className="title" dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
            </Button>
        </Grid.Column>
    }) : null
}

const TabContent = ({posts, activeItem}) => {

    return posts ? posts.filter(p => p.slug === activeItem).map(p => <Content key={p.id} visibility={{
        title: false,
        content: false
    }}
                                                                              post={p}/>) : null


}


const SingleTabbedView = ({posts}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null)

    return (
        <React.Fragment>

            <Menu className="tabbed posts" text>

                <ItemMenu posts={posts} setActive={setActive} activeItem={activeItem}></ItemMenu>


            </Menu>

            <TabContent posts={posts} activeItem={activeItem}></TabContent>

        </React.Fragment>
    )
}


const GridTabbedView = ({posts, useIcons}) => {
    const [activeItem, setActive] = useState(posts ? posts[0].slug : null)

    return (
        <React.Fragment>
            <Grid stackable className="tabbed posts" columns={posts.length}>
                <GriNavigator useIcons={useIcons} posts={posts} activeItem={activeItem}
                              setActive={setActive}></GriNavigator>
                <Grid.Row>
                    <Grid.Column width={16}>
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
        "data-use-feature-images-as-icons": useIcons = "false"
    } = props

    return <Container className={"tcdi tabbed posts"} fluid={true}>
                <PostProvider type={type} taxonomy={taxonomy} categories={categories}
                              store={"tabbedposts"} page={1}
                              perPage={items}>
                    <PostConsumer>
                        {theme == 'light' ? <SingleTabbedView></SingleTabbedView> :
                            <GridTabbedView useIcons={useIcons == 'true' ? true : false}></GridTabbedView>}

                    </PostConsumer>

        </PostProvider>
    </Container>
}

export default Wrapper
