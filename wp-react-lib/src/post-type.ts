import type { About, Cury, Meta, Self, WpTerm } from "./types";

export interface Post {
    id:              number;
    date:            Date;
    date_gmt:        Date;
    guid:            PostGUID;
    modified:        Date;
    modified_gmt:    Date;
    slug:            string;
    status:          string;
    type:            string;
    link:            string;
    title:           PostGUID;
    content:         PostContent;
    excerpt:         PostContent;
    author:          number;
    featured_media:  number;
    comment_status:  string;
    ping_status:     string;
    sticky:          boolean;
    template:        string;
    format:          string;
    meta:            Meta;
    categories:      number[];
    tags:            any[];
    bread_crumbs:    any[];
    class_list:      string[];
    acf:             any[];
    yoast_head:      string;
    yoast_head_json: PostYoastHeadJSON;
    meta_fields:     { [key: string]: string[] };
    meta_fields_2:   { [key: string]: string[] };
    _links:          PostLinks;
}

export interface PostLinks {
    self:                  Self[];
    collection:            About[];
    about:                 About[];
    author:                PostAuthorElement[];
    replies:               PostAuthorElement[];
    "version-history":     PostVersionHistory[];
    "predecessor-version": PostPredecessorVersion[];
    "wp:attachment":       About[];
    "wp:term":             WpTerm[];
    curies:                Cury[];
}


export interface PostAuthorElement {
    embeddable: boolean;
    href:       string;
}


export interface PostPredecessorVersion {
    id:   number;
    href: string;
}


export interface PostVersionHistory {
    count: number;
    href:  string;
}


export enum PostTaxonomy {
    BreadCrumbs = "bread_crumbs",
    Category = "category",
    PostTag = "post_tag",
}

export interface PostContent {
    rendered:  string;
    protected: boolean;
}

export interface PostGUID {
    rendered: string;
}

export interface PostMeta {
    _acf_changed:             boolean;
    inline_featured_image:    boolean;
    redirect_url:             string;
    myguten_meta_block_field: string;
    footnotes:                string;
}

export interface PostYoastHeadJSON {
    title?:                  string;
    robots?:                 PostRobots;
    canonical?:              string;
    og_locale?:              string;
    og_type?:                string;
    og_title?:               string;
    og_url?:                 string;
    og_site_name?:           string;
    article_published_time?: Date;
    article_modified_time?:  Date;
    og_image?:               PostOgImage[];
    author?:                 string;
    twitter_card?:           string;
    twitter_creator?:        string;
    twitter_site?:           string;
    twitter_misc?:           PostTwitterMisc;
    schema?:                 PostSchema;
    og_description?:        string;
}


export interface PostOgImage {
    width:  number | string;
    height: number | string;
    url:    string;
    type:   string;
}

export interface PostRobots {
    index:               string;
    follow:              string;
    "max-snippet":       string;
    "max-image-preview": string;
    "max-video-preview": string;
}

export interface PostSchema {
    "@context": string;
    "@graph":   PostGraph[];
}

export interface PostGraph {
    "@type":             string;
    "@id":               string;
    isPartOf?:           Breadcrumb;
    author?:             GraphAuthorClass;
    headline?:           string;
    datePublished?:      Date;
    dateModified?:       Date;
    mainEntityOfPage?:   Breadcrumb;
    wordCount?:          number;
    commentCount?:       number;
    publisher?:          Breadcrumb;
    inLanguage?:         string;
    potentialAction?:    PotentialAction[];
    url?:                string;
    name?:               string;
    description?:        string;
    alternateName?:      string;
    logo?:               PostImage;
    image?:              PostImage;
    sameAs?:             string[];
    articleSection?:     string[];
    breadcrumb?:         Breadcrumb;
    itemListElement?:    ItemListElement[];
    thumbnailUrl?:       string;
    primaryImageOfPage?: Breadcrumb;
    contentUrl?:         string;
}

export interface GraphAuthorClass {
    name:  string;
    "@id": string;
}

export interface Breadcrumb {
    "@id": string;
}

export interface PostImage {
    "@id":       string;
    "@type"?:    string;
    inLanguage?: string;
    url?:        string;
    contentUrl?: string;
    caption?:    string;
    width?:      number;
    height?:     number;
}


export interface ItemListElement {
    "@type":  string;
    position: number;
    name:     string;
    item?:    string;
}


export interface PotentialAction {
    "@type":        PotentialActionType;
    name?:          string;
    target:         string[] | TargetClass;
    "query-input"?: QueryInput;
}

export enum PotentialActionType {
    CommentAction = "CommentAction",
    ReadAction = "ReadAction",
    SearchAction = "SearchAction",
}

export interface QueryInput {
    "@type":       string;
    valueRequired: boolean;
    valueName:     string;
}

export interface TargetClass {
    "@type":     string;
    urlTemplate: string;
}

export interface PostTwitterMisc {
    "Written by":         string;
    "Est. reading time"?: string;
}