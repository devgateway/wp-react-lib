import type { Post } from "../post-type"
import type { Category, DgSettings, Media, SearchResult, Taxonomy } from "../types"

export interface PostContextType {
    posts: Post[] | null
    meta: any
    locale: string | undefined
}

export interface PageContextType {
    pages: Post[] | null
    meta: any
    locale: string | undefined
}

export interface MediaContextType {
    media: Media | null
    locale: string | undefined
}

export interface SearchContextType {
    results: SearchResult[] | null
    meta: any
    locale: string | undefined
}

export interface SettingsContextType {
    data : DgSettings | null
    locale: string | undefined
}

export interface TaxonomyContextType {
    taxonomies: Taxonomy[] | null
    locale: string | undefined
}

export interface CategoriesContextType {
    categories: Category[] | null
    meta: any
    locale: string | undefined
    loading: boolean
    error: any
}