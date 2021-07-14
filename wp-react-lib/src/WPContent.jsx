import React from 'react'

/**
 Can Render pages and post selecting the appropriate template
 @Deprecated
 **/
class WPContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            component: null
        }
        this.setTemplate = this.setTemplate.bind(this)
    }

    async setTemplate() {
        const {slug} = this.props.match.params
        const {pages, posts} = this.props
        const items = pages ? pages : posts

        const page = items[0]
        let {template} = page ? page : {}
        const wpTemplate = template ? template.charAt(0).toUpperCase() + template.slice(1).replaceAll(".php", ".jsx") : null
        try {
            //if there is a custom template for this post let's use it
            if (wpTemplate != null && wpTemplate != "") {
                const {default: component} = await require('./templates/' + wpTemplate); //custom template base on slug
                this.setState({component: component})
            } else {
                const {default: component} = await require('./templates/' + slug.charAt(0).toUpperCase() + slug.slice(1)); //custom template base on slug
                this.setState({component: component})
            }

        } catch (e) {
            this.setState({component: this.props.defaultTemplate})
        } finally {
        }
    }

    componentDidMount() {
        this.setTemplate()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.slug != this.props.match.params.slug) {
            this.setTemplate()
        }
    }

    render() {
        const {pages, posts} = this.props
        const items = pages ? pages : posts
        const C = this.state.component
        return <React.Fragment>
            {(C != null) ? <C pages={items} posts={items} {...this.props} /> : null}
        </React.Fragment>
    }
}


export default WPContent
