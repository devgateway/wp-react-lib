import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {IntlProvider} from "react-intl";
import {ComponentsContext} from "../providers/Context";

const components = {

}

class EmbeddedGateway extends React.Component {

    constructor(props) {
        super(props);
        this.renderEmbeddedComponents = this.renderEmbeddedComponents.bind(this)
    }

    renderEmbeddedComponents() {
        const {locale, store, messages} = this.props

        console.log(ComponentsContext.data)

        const node = ReactDOM.findDOMNode(this)

        const elements = node.getElementsByClassName("tcdi-component")

        if (!(elements == null)) {
            Array.from(elements).forEach((element, index) => {
                const component = element.getAttribute('data-component')
                element.removeAttribute("data-component")
                if (component) {
                    const props = {...this.props}
                    const attrs = element.attributes
                    for (let i = attrs.length - 1; i >= 0; i--) {
                        props[attrs[i].name] = attrs[i].value;
                    }
                    const C = components[component];
                    ReactDOM.render(
                        <Provider store={store}>
                            <IntlProvider locale={locale} messages={messages[locale]}>
                                <C unique={"embeddable_" + index} {...props} childContent={element.innerHTML}/>
                            </IntlProvider>
                        </Provider>, element);


                }
            })
        }
    }


    componentDidMount() {
        this.renderEmbeddedComponents()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {parent} = this.props
        if (parent != prevProps.parent) {
            this.renderEmbeddedComponents()
        }
    }


    render() {
        return <React.Fragment>
            {this.props.children}
        </React.Fragment>
    }
}

export default EmbeddedGateway
