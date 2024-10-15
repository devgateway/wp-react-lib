import React from 'react'
import ReactDOM from 'react-dom/client';
import { findDOMNode } from 'react-dom'
import { Provider } from "react-redux";
import { IntlProvider, injectIntl } from "react-intl";
import { AppContext } from "../providers/Context"
import { AppContextProvider } from "../../dist";

class EmbeddedGateway extends React.Component {
    constructor(props) {
        super(props);
        this.renderEmbeddedComponents = this.renderEmbeddedComponents.bind(this)
        this.wrapper = React.createRef();
    }

    renderEmbeddedComponents() {
        const { locale, store, getComponent } = this.props

        
        // @ts-ignore
        // const node = findDOMNode(this);
        //const elements = node.getElementsByClassName("viz-component")

        const elements = window.document.querySelectorAll(".viz-component:not(.self-render-component > .viz-component)")

        if (!(elements == null)) {
            Array.from(elements).forEach((element, index) => {

                let container = element;
                const component = element.getAttribute('data-component')
                element.removeAttribute("data-component")
                if (element.nodeName !== "DIV") {
                    const div = document.createElement("div")
                    element.replaceWith(div)

                    div.setAttribute("class", element.getAttribute("class"))
                    div.setAttribute("id", "generated_div")
                    element.getAttributeNames().forEach(a => {
                        div.setAttribute(a, element.getAttribute(a))
                    })
                    container = div
                }

                if (component) {
                    const props = { ...this.props }
                    const attrs = element.attributes
                    for (let i = attrs.length - 1; i >= 0; i--) {
                        props[attrs[i].name] = attrs[i].value;
                    }
                    const C = injectIntl(getComponent(component));
                    if (C) {
                        ReactDOM.createRoot(container)
                            .render(
                                <Provider store={store}>
                                    <IntlProvider locale={locale}>
                                        <AppContextProvider getComponent={getComponent} store={store} locale={locale}>
                                            <C unique={(this.props.parentUnique ? this.props.parentUnique : '') + "_embeddable_" + index + "" + (Math.random() + 1).toString(36).substring(7)} {...props}
                                                childContent={element.innerHTML} />
                                        </AppContextProvider>
                                    </IntlProvider>
                                </Provider>
                            );
                    } else {
                        ReactDOM.createRoot(container).render(
                            <span style={{ "color": "red" }}>{component} not found </span>, 
                        );
                    }


                }
            })
        }
    }


    componentDidMount() {
        this.renderEmbeddedComponents()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { parent } = this.props
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


const WithContext = (props) => {
    return (<AppContext.Consumer>
        {
            (data) => {

                if (data) {
                    return <EmbeddedGateway
                        {...props}
                        locale={data.locale}
                        store={data.store}
                        getComponent={data.getComponent} >
                        {props.children}
                    </EmbeddedGateway>

                } else {
                    return <React.Fragment>{props.children} </React.Fragment>
                }
            }
        }
    </AppContext.Consumer>)

}

export default WithContext;
