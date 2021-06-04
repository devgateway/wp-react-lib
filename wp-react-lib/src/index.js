import Post from './templates/Post'
import Page from './templates/Page'
import Taxonomy from './templates/Taxonomy'
import Category from "./templates/Category"

import PostProvider from './providers/PostProvider'
import PageProvider from './providers/PageProvider'
import MediaProvider from './providers/MediaProvider'
import MenuProvider from './providers/MenuProvider'
import TaxonomyProvider from './providers/TaxonomyProvider'
import ComponentsProvider from './providers/ComponentsProvider'


import PostConsumer from './consumers/PostConsumer'
import PageConsumer from './consumers/PageConsumer'
import MediaConsumer from './consumers/MediaConsumer'
import TaxonomyConsumer from './consumers/TaxonomyConsumer'
import MenuConsumer from "./consumers/MenuConsumer";


import WPContent from "./WPContent";

import utils from "./util";
import wordpress from "./reducers/wordpress";

export {
    Post,
    Page,
    Category,
    Taxonomy,

    PostProvider,
    PageProvider,
    MediaProvider,
    MenuProvider,
    ComponentsProvider,
    TaxonomyProvider,
    PostConsumer,
    PageConsumer,
    MenuConsumer,
    MediaConsumer,
    TaxonomyConsumer,

    WPContent,

    utils,
    wordpress
}


export default null;
