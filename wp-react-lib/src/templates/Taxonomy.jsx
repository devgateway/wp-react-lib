import React from 'react'


const Taxonomy = (props) => {
    //use local if passed for link
    return (<div {...props}><a
        href={'#' + props.locale + '/category/' + props.taxonomy.slug}>{props.taxonomy.name}</a></div>)
}

const Iterator = (props) => {
    return <React.Fragment>
        {props.taxonomies && props.taxonomies.map(taxonomy => <Taxonomy key={taxonomy.id}
                                                                        taxonomy={taxonomy} {...props}/>)}

    </React.Fragment>
}

export default Iterator
