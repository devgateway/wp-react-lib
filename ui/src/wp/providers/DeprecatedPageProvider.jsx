import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {getPage} from '../module'
import {Container} from 'semantic-ui-react'
import {withRouter} from 'react-router' // react-router v4/v5
import {PageContext} from './Context'

/*
Will load a post base ond passed properties and put in PostContext
*/

class DeprecatedPageProvider extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.slug && !this.props.page && (prevProps.slug != this.props.slug)) {
            this.props.onLoad(this.props.slug)
        }
    }

    componentDidMount() {
        const {onLoad, loading, slug} = this.props
        if (slug) {
            this.props.onLoad(slug)
        }
    }

    render() {

        const {slug, pages} = this.props
        if (this.props.location.search.indexOf("debugger") > -1) {
            return (<PageContext.Provider value={null}>
                <Container>
                    <blocklquote>
                        <h2>{slug}</h2>
                    </blocklquote>
                </Container>
                {this.props.children}
            </PageContext.Provider>)
        } else {


            return (<PageContext.Provider value={pages}>
                <div>
                    {this.props.children}
                </div>
            </PageContext.Provider>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    const slug = ownProps.slug ? ownProps.slug : ownProps.match.params.slug
    return {
        slug,
        error: state.getIn(['wordpress', 'page', slug, 'error']),
        pages: state.getIn(['wordpress', 'page', slug, 'content']) ? state.getIn(['wordpress', 'page', slug, 'content']) : null,
        loading: state.getIn(['wordpress', 'page', slug, 'loading'])
    }
}

const mapActionCreators = {
    onLoad: getPage
};

export default  injectIntl(withRouter(connect(mapStateToProps, mapActionCreators)(DeprecatedPageProvider)));
