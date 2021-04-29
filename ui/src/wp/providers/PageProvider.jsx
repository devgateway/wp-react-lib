import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {clean, getPages} from '../module'
import {PageContext} from './Context'
import {Container, Loader, Segment} from "semantic-ui-react";
import PropTypes from 'prop-types'

/*
Will load a post base ond passed properties and put in PostContext
*/

class PageProvider extends React.Component {

    static propTypes = {
        store: PropTypes.string,
    };

    static defaultProps = {
        store: 'list'
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {before, perPage, page, fields, parent, slug, store, intl: {locale}} = this.props

        if (prevProps.parent != parent || prevProps.slug != slug || locale != prevProps.intl.locale) {
            if(this.props.debugger){

            }
            this.props.onLoad({before, perPage, page, fields, parent, slug, store, locale})
        }
    }

    componentDidMount() {
        const {before, perPage, page, fields, parent, slug, store, intl: {locale}} = this.props
        if(this.props.debugger){

        }
        this.props.onLoad({before, perPage, page, fields, parent, slug, store, locale})
    }


    componentWillUnmount(){

        const {before, perPage, page, fields, parent, slug, store, intl: {locale}} = this.props
        if(this.props.debugger){

        }
        this.props.onClean({store})
    }
    render() {
        const {pages, loading, error} = this.props
        if (pages && pages.length > 0) {
            return <PageContext.Provider value={pages}>{this.props.children}</PageContext.Provider>
        } else if (error) {
            return <Segment color={"red"}><h1>500</h1>
                <p>The service is not available please try again in a few minutes</p></Segment>
        } else if (loading) {
            return (<Container>
                        <Loader inverted content='Loading'/>
                   </Container>)
        } else if (loading == false) {
            return <Container>
                <Segment color={"red"}>
                    <h1>404</h1>
                    <p>Can't find this page</p>
                </Segment>
            </Container>
        }
        return null
    }
}

const mapStateToProps = (state, ownProps) => {
    const store = ownProps.store

    return {

        error: state.getIn(['wordpress', 'pages', store, 'error']),
        pages: state.getIn(['wordpress', 'pages', store, 'items']),
        loading: state.getIn(['wordpress', 'pages', store, 'loading'])
    }
}


const mapActionCreators = {
    onClean:clean,
    onLoad: getPages
};

export default injectIntl(connect(mapStateToProps, mapActionCreators)(PageProvider));
