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
import SettingProvider from './providers/SettingProvider'


import PostConsumer from './consumers/PostConsumer'
import PageConsumer from './consumers/PageConsumer'
import MediaConsumer from './consumers/MediaConsumer'
import TaxonomyConsumer from './consumers/TaxonomyConsumer'
import MenuConsumer from "./consumers/MenuConsumer";

import SettingsConsumer from "./consumers/SettingsConsumer";

import PostContent from "./template-parts/PostContent";
import PostDate from "./template-parts/PostDate";
import PostIntro from "./template-parts/PostIntro";
import PostLabel from "./template-parts/PostLabel";
import PostTitle from "./template-parts/PostTitle";
import PostIcon from "./template-parts/PostIcon";

import SearchConsumer from "./consumers/SearchConsumer";
import SearchProvider from "./providers/SearchProvider";

import CategoriesProvider from "./providers/CategoriesProvider";
import CategoriesConsumer from "./consumers/CategoriesConsumer";

import utils from "./util";
import wordpress from "./reducers/wordpress";

import { SettingsContext, PageContext, AppContext, PostContext } from './providers/Context'

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
    SettingProvider,
    PostConsumer,
    PageConsumer,
    MenuConsumer,
    MediaConsumer,
    TaxonomyConsumer,
    SettingsConsumer,
    wordpress,
    utils,
    PostContent,
    PostDate,
    PostIntro,
    PostLabel,
    PostTitle,
    PostIcon,
    SearchConsumer,
    SearchProvider,
    SettingsContext,
    PageContext,
    AppContext,
    PostContext,
    CategoriesProvider,
    CategoriesConsumer
}

export * from './types';
export * from './post-type';
export * from './api';