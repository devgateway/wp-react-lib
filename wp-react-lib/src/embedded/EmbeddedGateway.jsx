import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {IntlProvider} from "react-intl";
import {AppContext} from "../providers/Context"
import {AppContextProvider} from "../../dist";

class EmbeddedGateway extends React.Component {

    constructor(props) {
        super(props);
        this.renderEmbeddedComponents = this.renderEmbeddedComponents.bind(this)
    }

    renderEmbeddedComponents() {
        const {locale, store, getComponent} = this.props
        const node = ReactDOM.findDOMNode(this)
        const elements = node.getElementsByClassName("wp-react-lib-component")


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
                    const C = getComponent(component);
                    if (C){
                    ReactDOM.render(
                        <Provider store={store}>
                            <IntlProvider locale={locale}>
                                <AppContextProvider getComponent={getComponent} store={store} locale={locale}>
                                 <C unique={"embeddable_" + index} {...props} childContent={element.innerHTML}/>
                                </AppContextProvider>
                            </IntlProvider>
                        </Provider>, element);
                    }else{
                        ReactDOM.render(
                            <span style={{"color":"red"}}>{component} not found </span>, element);
                    }


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


const WithContext = (props) => {
    return (<AppContext.Consumer>
        {
            (data) => {
                if (data) {
                    return<EmbeddedGateway locale={data.locale} store={data.store} getComponent={data.getComponent} {...props}>
                            {props.children}
                        </EmbeddedGateway>

                } else {
                    return  <React.Fragment>{props.children} </React.Fragment>
                }
            }
        }
    </AppContext.Consumer>)

}

export default WithContext;
