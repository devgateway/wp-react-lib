import React from 'react'
import type { PostContextType, PageContextType, SearchContextType, SettingsContextType, TaxonomyContextType, CategoriesContextType } from './context-types'

export const PostContext = React.createContext<PostContextType>({
    posts: null,
    meta: null,
    locale: undefined
})
export const PageContext = React.createContext<PageContextType>({
    pages: null,
    meta: null,
    locale: undefined
})
export const TaxonomyContext = React.createContext<TaxonomyContextType>({
    taxonomies: null,
    locale: undefined
})
export const SearchContext = React.createContext<SearchContextType>({
    results: null,
    meta: null,
    locale: undefined
})
export const MenuContext = React.createContext<any>(undefined)
export const AppContext = React.createContext<any>(undefined)
export const SettingsContext = React.createContext<SettingsContextType>({
    data: null,
    locale: undefined
})

export const CategoriesContext = React.createContext<CategoriesContextType>({
    categories: null,
    meta: null,
    locale: undefined,
    loading: false,
    error: undefined
})