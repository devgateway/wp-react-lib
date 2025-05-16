import React from 'react'
import {connect} from 'react-redux'
import {getMedia} from '../reducers/actions'
import LocalizedProvider from "./LocalizedProvider"
import type { MediaContextType } from './context-types'
import type { Media } from '../types'
export const MediaContext = React.createContext<MediaContextType>({
    media: null,
    locale: undefined
});

interface MediaProviderProps {
    children: React.ReactNode
    id: string
    locale: string
    onLoad: ({id, locale}: {id: string, locale: string}) => void
    loading: boolean
    media: Media[] | null
}

/*
Will load a post base ond passed properties and put in PostContext
*/
class MediaProvider extends React.Component<MediaProviderProps> {

    componentDidMount() {
        //TODO:pass locale
        const {id, locale} = this.props
        if (id) {
            this.props.onLoad({id, locale})
        }
    }
    componentDidUpdate(prevState: MediaProviderProps) {
        //TODO:pass locale
        const {id, locale} = this.props

        if (id!=prevState.id) {
            this.props.onLoad({id, locale})
        }
    }
    render() {
        const {media, locale} = this.props

        return (<MediaContext.Provider value={{media, locale}}>
                  {this.props.children}
              </MediaContext.Provider>);

    }


}

const mapStateToProps = (state: any, ownProps: MediaProviderProps) => {
    const id = ownProps.id
    return {
        error: state.getIn(['wordpress', 'media', id, 'error']),
        media: state.getIn(['wordpress', 'media', id, 'content']) ? state.getIn(['wordpress', 'media', id, 'content']) : null,
        loading: state.getIn(['wordpress', 'media', id, 'loading'])
    }
}

const mapActionCreators = {
    onLoad: getMedia
};

export default connect(mapStateToProps, mapActionCreators)(LocalizedProvider(MediaProvider))
