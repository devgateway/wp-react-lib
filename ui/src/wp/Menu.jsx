import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {getMenu} from './module'
import {withRouter} from 'react-router' // react-router v4/v5
import {Icon, Menu,} from 'semantic-ui-react'


const getLink = (o, locale) => {
    switch (o.type_label.toUpperCase()) {
        case 'POST':
            return `#${locale}/posts/${o.slug}`;
        case 'PAGE':
            return `#${locale}/${o.slug}`;
        default:
            return `#${locale}${o.url}`;
    }
}

const getLabel = (e, locale) => {
    if (e.url == '/') {
        return (<a href="/"><Icon name="home"/></a>)
    } else {
        return <a href={getLink(e, locale)}>
            <div dangerouslySetInnerHTML={{__html: e.title}}/>
        </a>
    }
}


function ItemsWalker({items, locale}) {
    return (
        <div>
            <Menu.Menu position="right">{items && items.sort((a, b) => a.menu_order - b.menu_order).map(e =>
                <Menu.Item active={false}>

                    {e.child_items ? getLabel(e, locale) : getLabel(e, locale)}
                </Menu.Item>
            )}

                <Menu.Item>

                </Menu.Item>
            </Menu.Menu>

        </div>
    )
}


const MenuWrapper = (props) => {
    const {onLoad, loading, location, slug, intl, fixed, mobile, items} = props
    const activeItem = null
    useEffect(() => {
        onLoad(slug)
    }, [onLoad, slug]);


    return <ItemsWalker items={items ? items.items : null} locale={intl.locale}/>
}

const mapStateToProps = (state, ownProps) => {
    const slug = ownProps.slug
    return {
        error: state.getIn(['wordpress', 'menu', slug, 'error']),
        items: state.getIn(['wordpress', 'menu', slug, 'items']),
        loading: state.getIn(['wordpress', 'menu', slug, 'loading'])
    }
}

const mapActionCreators = {
    onLoad: getMenu
};

export default injectIntl(withRouter(connect(mapStateToProps, mapActionCreators)((MenuWrapper))));
