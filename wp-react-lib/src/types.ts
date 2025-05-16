export type Options = {
    label: string;
    value: string;
    labels?: Record<string, string>;
}

export interface Dimension {
    label:  string;
    labels: Record<string, any>;
    value:  string;
    type:   string;
    field:  string | null;
}

export interface FileContent {
    id:          string;
    createdDate: Date;
    name:        string;
    contentType: string;
    size:        number;
}


export interface Category {
    id:            number;
    type:          string;
    code:          string;
    value:         string;
    position:      number | null;
    parent:        string | null;
    fileContent?:   FileContent | null;
    labels:        Record<string, any>;
    descriptions:  Record<string, any>;
    categoryStyle: Record<string, any> | null;
    createdDate?:   Date;
    updatedDate?:   Date;
    delegate?:      string | null;
    aClass?:        string | null;
    enabled?:       boolean | null;
    param?:         string | null;
    field?:         string | null;
    fieldType?:     string | null;
    items?:         CategoryItem[];
}

export interface CategoryItem {
    value: string;
    id: any;
    code?: string;
    labels?: Record<string, any>;
    position?: number;
}

export type Categories = {
    type: string;
    items: Category[];
}[]

export interface Measure {
    label:    string;
    labels:   Record<string, any>;
    value:    string;
    group:    Group;
    styles:   Styles;
    position: number;
    enabled:  boolean | null;
}

export interface Group {
    label:  string;
    labels: Record<string, any>;
}


export interface Styles {
    textColor:       string | null;
    backgroundColor: string | null;
    className:       string | null;
    color:           string;
}

export interface Filter {
    label:  string;
    labels: Record<string, any>;
    param:  string;
    type:   string;
    field:  string;
    // TODO: Check the value property in the API response since it is not there
    value:  string[];
    values: string;
}

export interface DgSettings {
    react_ui_url:          string;
    react_api_url:         string | null;
    apache_superset_url:   string | boolean | null;
    react_search_type:     string;
    react_menu_type:       string;
    languages:             Languages;
    landing_page_url:      string;
    google_analytics_code: string;
    name:                  string;
    description:           string;
    site_logo:             number;
    site_icon:             number;
}

export interface Languages {
    [key: string]: Language;
}

export interface Language {
    enable:          number;
    locale:          string;
    name:            string;
    translation:     string;
    date:            string;
    time:            string;
    flag:            string;
    wpseo_og_locale: string;
}

export interface Taxonomy {
    id:             number;
    name:           string;
    slug:           string;
    description:    string;
    types:          string[];
    hierarchical:   boolean;
    rest_base:      string;
    rest_namespace: string;
    _links:         Links;
    taxonomy:       string;
}

export interface Links {
    collection: Collection[];
    "wp:items": Collection[];
    curies:     Cury[];
}

export interface Collection {
    href: string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface Taxonomies {
    [key: string]: Taxonomy;
};

export interface Wp_Types {
    description:     string;
    hierarchical:    boolean;
    has_archive:     boolean;
    name:            string;
    slug:            string;
    icon:            string;
    taxonomies:      string[];
    rest_base:       string;
    rest_namespace:  string;
    template:        any[];
    template_lock:   boolean;
    yoast_head:      string | null;
    yoast_head_json: Record<string, any> | null;
    _links:          Links;
}

export interface Links {
    collection: Collection[];
    "wp:items": Collection[];
    curies:     Cury[];
}

export interface Collection {
    href: string;
}

export interface EurekaResponse {
    applications: ApplicationsClass;
}

export interface ApplicationsClass {
    versions__delta: string;
    apps__hashcode:  string;
    application:     Application[];
}


export interface Application {
    name:     string;
    instance: Instance[];
}

export interface Instance {
    instanceId:                    string;
    hostName:                      string;
    app:                           string;
    ipAddr:                        string;
    status:                        string;
    overriddenStatus:              string;
    port:                          Port;
    securePort:                    Port;
    countryId:                     number;
    dataCenterInfo:                DataCenterInfo;
    leaseInfo:                     LeaseInfo;
    metadata:                      Metadata;
    homePageUrl:                   string;
    statusPageUrl:                 string;
    healthCheckUrl:                string;
    vipAddress:                    string;
    secureVipAddress:              string;
    isCoordinatingDiscoveryServer: string;
    lastUpdatedTimestamp:          string;
    lastDirtyTimestamp:            string;
    actionType:                    string;
}

export interface DataCenterInfo {
    "@class": string;
    name:     string;
}

export interface LeaseInfo {
    renewalIntervalInSecs: number;
    durationInSecs:        number;
    registrationTimestamp: number;
    lastRenewalTimestamp:  number;
    evictionTimestamp:     number;
    serviceUpTimestamp:    number;
}

export interface Metadata {
    "management.port": string;
    tetsim?:             string;
    label?:              string;
    "dataset.required"?: string;
    type?:               string;
}

export interface Port {
    $:          number;
    "@enabled": string;
}

export interface Media {
    id:             number;
    date:           Date;
    date_gmt:       Date;
    guid:           Caption;
    modified:       Date;
    modified_gmt:   Date;
    slug:           string;
    status:         Status;
    type:           Type;
    link:           string;
    title:          Caption;
    author:         number;
    featured_media: number;
    comment_status: CommentStatus;
    ping_status:    PingStatus;
    template:       string;
    meta:           Meta;
    bread_crumbs:   any[];
    class_list:     string[];
    acf:            any[];
    meta_fields:    MetaFields;
    description:    Caption;
    caption:        Caption;
    alt_text:       string;
    media_type:     MediaType;
    mime_type:      MIMEType;
    media_details:  MediaDetails;
    post:           null;
    source_url:     string;
    _links:         Links;
}

export interface Links {
    self:       Self[];
    collection: About[];
    about:      About[];
    author:     Author[];
    replies:    Author[];
    "wp:term":  WpTerm[];
    curies:     Cury[];
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href:       string;
}

export interface Cury {
    name:      string;
    href:      string;
    templated: boolean;
}

export interface Self {
    href:        string;
    targetHints: TargetHints;
}

export interface TargetHints {
    allow: Allow[];
}

export enum Allow {
    Get = "GET",
}

export interface WpTerm {
    taxonomy:   Taxonomy;
    embeddable: boolean;
    href:       string;
}

export enum MediaTaxonomy {
    BreadCrumbs = "bread_crumbs",
}

export interface Caption {
    rendered: string;
}


export enum CommentStatus {
    Open = "open",
}

export interface MediaDetails {
    filesize: number;
    sizes:    Sizes;
}

export interface Sizes {
}

export enum MediaType {
    File = "file",
}

export interface Meta {
    _acf_changed:             boolean;
    inline_featured_image:    boolean;
    redirect_url:             string;
    myguten_meta_block_field: string;
}

export interface MetaFields {
    _wp_attached_file:       string[];
    _wp_attachment_metadata: string[];
    _edit_lock?:             string[];
}

export enum MIMEType {
    ApplicationJSON = "application/json",
}

export enum PingStatus {
    Closed = "closed",
}

export enum Status {
    Inherit = "inherit",
}

export enum Type {
    Attachment = "attachment",
}

export interface Menu {
    term_id:          number;
    name:             string;
    slug:             string;
    term_group:       number;
    term_taxonomy_id: number;
    taxonomy:         string;
    description:      string;
    parent:           number;
    count:            number;
    filter:           string;
    term_order:       string;
    icon_media_id?:    number;
}

export interface SearchResult {
    id:      number;
    title:   string;
    url:     string;
    type:    string;
    subtype: string;
    _links:  Links;
    value:   string;
}

export type SearchResults = SearchResult[];