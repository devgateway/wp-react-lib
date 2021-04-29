import React from 'react'
import queryString from 'query-string';
import {withRouter} from 'react-router' // react-router v4/v5
import asyncComponent from "../AsyncComponent";
import {injectIntl} from "react-intl";
import {Container} from "semantic-ui-react";

const uIComponent = (name) => asyncComponent(() => import("./"+name));

const Infographic = (props) => {
    let params = queryString.parse(props.location.search)
    debugger;
    const UIComponent=uIComponent(props.match.params.name)
    return (<Container fluid={true}>
                <UIComponent {...params}></UIComponent>
            </Container>)
}

export default injectIntl(withRouter(Infographic))