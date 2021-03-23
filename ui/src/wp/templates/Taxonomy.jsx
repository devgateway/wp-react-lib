import React from 'react'
import {injectIntl} from 'react-intl';


const Taxonomy = injectIntl((props) => {

    return (<div {...props}><a
        href={'#' + props.intl.locale + '/category/' + props.taxonomy.slug}>{props.taxonomy.name}</a> </div>)
})

const Iterator = (props) => {
    return <React.Fragment>
        {props.taxonomies && props.taxonomies.map(taxonomy => <Taxonomy key={taxonomy.id}
                                                                        taxonomy={taxonomy} {...props}/>)}

    </React.Fragment>
}

export default injectIntl(Iterator)
