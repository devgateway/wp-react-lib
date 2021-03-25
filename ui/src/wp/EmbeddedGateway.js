import React from 'react'
import ReactDOM from 'react-dom'


import asyncComponent from "../AsyncComponent";
import {Provider} from "react-redux";
import getStore from "../redux/store";
import {injectIntl, IntlProvider} from "react-intl";
import messages_en from "../translations/en.json";
import Chart from "../embeddable/chart/index";
import Filter from "../embeddable/filter";

const TabbedPosts = asyncComponent(() => import("../embeddable/tabbedposts/"));
const PostsCarousel = asyncComponent(() => import("../embeddable/postscarousel/"));
const PageGallery = asyncComponent(() => import("../embeddable/pagegallery/"));
const messages = {
    'en': messages_en
};

const components = {
    pageGallery: PageGallery,
    postsCarousel: PostsCarousel,
    chart: Chart,
    filter: Filter,
    tabbedPosts: TabbedPosts,

}

const store = getStore();

class EmbeddedGateway extends React.Component {

    constructor() {
        super();
        this.renderEmbeddedComponents = this.renderEmbeddedComponents.bind(this)
    }


    renderEmbeddedComponents() {
        const {intl: {locale}} = this.props
        if (this.props.parent === 2596) {
            debugger
        }
        const node = ReactDOM.findDOMNode(this)

        const elements = node.getElementsByClassName("tcdi-component")
        if (elements != null) {


            Array.from(elements).forEach(element => {

                const component = element.getAttribute('data-component')
                element.removeAttribute("data-component")
                if (component) {
                    const props = {...this.props}
                    const attrs = element.attributes
                    for (var i = attrs.length - 1; i >= 0; i--) {
                        props[attrs[i].name] = attrs[i].value;
                    }
                    const C = components[component];

                    ReactDOM.render(
                        <Provider store={store}>
                            <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
                                <C {...props} childContent={element.innerHTML}/>
                            </IntlProvider>
                        </Provider>, element);


                }
            })
        }
    }


    componentDidMount() {
        this.renderEmbeddedComponents()
    }


    componentWillUnmount() {
        //ReactDOM.unmountComponentAtNode(contenedor)
    }


    render() {
        const {parent, intl: {locale}} = this.props
        return <React.Fragment>
            <div>
                {this.props.children}
            </div>
        </React.Fragment>
    }
};

export default injectIntl(EmbeddedGateway)
