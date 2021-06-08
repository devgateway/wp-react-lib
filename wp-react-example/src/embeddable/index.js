import React from 'react'
import asyncComponent from "../AsyncComponent";

//TODO async reducers
import data from './reducers/data'

const TabbedPosts = asyncComponent(() => import("./tabbedposts/"));
const PostsCarousel = asyncComponent(() => import("./postscarousel/"));
//const PageGallery = asyncComponent(() => import("./pagegallery/"));
//const PageModules = asyncComponent(() => import("./pagemodules/"));
const FeaturedTabs = asyncComponent(() => import("./featuredtabs/"));
//const InlineList = asyncComponent(() => import("./inlinelist/"));
const Chart = asyncComponent(() => import("./chart/"));
//const Filter = asyncComponent(() => import("./filter/"));


//const Filter = asyncComponent(() => import("./filter/"));

export const reducers = {
    data
}


export const components = {
    //   pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
//    filter: Filter,
    tabbedPosts: TabbedPosts,
    //pageModules: PageModules,
    featuredTabs: FeaturedTabs,
    //inlineList: InlineList
}

export const getComponentByNameIgnoreCase = (name) => {
    const k = Object.keys(components).filter(value => value.toLowerCase() == name.toLowerCase())
    return components[k]
}


