import Post from './templates/Post'
import Page from './templates/Page'
import Taxonomy from './templates/Taxonomy'
import Category from "./templates/Category"

import PostProvider from './providers/PostProvider'
import PageProvider from './providers/PageProvider'
import MediaProvider from './providers/MediaProvider'
import MenuProvider from './providers/MenuProvider'
import TaxonomyProvider from './providers/TaxonomyProvider'
import AppContextProvider from './providers/AppContextProvider'


import PostConsumer from './consumers/PostConsumer'
import PageConsumer from './consumers/PageConsumer'
import MediaConsumer from './consumers/MediaConsumer'
import TaxonomyConsumer from './consumers/TaxonomyConsumer'
import MenuConsumer from "./consumers/MenuConsumer";

import PostContent from "./template-parts/PostContent";
import PostDate from "./template-parts/PostDate";
import PostIntro from "./template-parts/PostIntro";
import PostLabel from "./template-parts/PostLabel";
import PostTitle from "./template-parts/PostTitle";
import PostIcon from "./template-parts/PostIcon";


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
    AppContextProvider,
    TaxonomyProvider,
    PostConsumer,
    PageConsumer,
    MenuConsumer,
    MediaConsumer,
    TaxonomyConsumer,
    utils,
    wordpress,
    PostContent,
    PostDate,
    PostIntro,
    PostLabel,
    PostTitle,
    PostIcon

}


export default null;
