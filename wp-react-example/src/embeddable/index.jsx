import React from 'react'
import queryString from 'query-string';
import {withRouter} from 'react-router' // react-router v4/v5
import asyncComponent from "../AsyncComponent";
import {injectIntl} from "react-intl";
import {Container} from "semantic-ui-react";
import Chart from "../../../_ui/src/embeddable/chart";
import Filter from "../../../_ui/src/embeddable/filter";


const TabbedPosts = asyncComponent(() => import("./tabbedposts/"));
const PostsCarousel = asyncComponent(() => import("./postscarousel/"));
const PageGallery = asyncComponent(() => import("./pagegallery/"));
const PageModules = asyncComponent(() => import("./pagemodules/"));
const FeaturedTabs = asyncComponent(() => import("./featuredtabs/"));
const InlineList = asyncComponent(() => import("./inlinelist/"));


export const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
    filter: Filter,
    tabbedPosts: TabbedPosts,
    pageModules: PageModules,
    featuredTabs: FeaturedTabs,
    inlineList: InlineList
}


const Infographic = (props) => {
    let params = queryString.parse(props.location.search)
    //TODO:validate component
    const UIComponent = components[props.match.params.name]
    return (<Container fluid={true}>
        <UIComponent {...params}></UIComponent>
    </Container>)
}

export default injectIntl(withRouter(Infographic))