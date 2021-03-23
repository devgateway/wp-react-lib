import React from 'react'

import {Container} from 'semantic-ui-react'

import {injectIntl} from 'react-intl';
import {withRouter} from 'react-router'
import TaxonomyProvider from '../providers/TaxonomyProvider'
import TaxonomyConsumer from '../consumers/TaxonomyConsumer'
import PostConsumer from '../consumers/PostConsumer'
import PostContent from './Post'
import {PostProvider} from "../index";


const CategoryDetail = ({taxonomies, slug}) => {
    const category = taxonomies ? taxonomies.filter(t => t.slug == slug)[0] : null
    return <React.Fragment>
        {category && <Container>

            <h1>{category.name}</h1>
            <Container className="has-medium-font-size" color="green">{category.description}</Container>

            <h2>Pots</h2>
            <PostProvider fields={['title', 'date', 'link', 'excerpt']} store={"posts"} page={1} perPage={10} categories={[category.id]}>
                <ul className="wp post list">
                    <PostConsumer>
                        <PostContent as={'li'} visibility={{title: true, excerpt: true, link: true, content: true}}/>
                    </PostConsumer>
                </ul>
            </PostProvider>
        </Container>
        }
    </React.Fragment>
}


const Category = injectIntl((props) => {

    return <div>
        <TaxonomyProvider>
            <TaxonomyConsumer>
                <CategoryDetail slug={props.match.params.slug}/>
            </TaxonomyConsumer>
        </TaxonomyProvider>
    </div>
})


export default withRouter(Category)
