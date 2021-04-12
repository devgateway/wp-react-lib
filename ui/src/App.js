import React, {Component} from 'react';
import './App.scss';
import './wp/wp.scss';
import './scss/green.scss'

import {mediaStyle} from './AppMedia'
import {Provider} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router' // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router/immutable'
import getStore, {history} from './redux/store'
import messages_en from "./translations/en.json";
import {updateIntl} from 'react-intl-redux'
import {injectIntl, IntlProvider} from "react-intl";
import smoothscroll from 'smoothscroll-polyfill';
import asyncComponent from "./AsyncComponent";
import ResponsiveContainer from './layout'
import Category from './wp/templates/Category'

import PostProvider from "./wp/providers/PostProvider";
import {Page, Post, PostConsumer} from "./wp";

import WPContent from "./wp/WPContent";
import PageProvider from "./wp/providers/PageProvider";
import PageConsumer from "./wp/consumers/PageConsumer";


const Embeddables = asyncComponent(() => import("./embeddable/"));
// kick off the polyfill!
smoothscroll.polyfill();

const messages = {
    'en': messages_en
};


const InjectTitle = injectIntl(({intl}) => {
    document.title = intl.formatMessage({id: 'app.title', defaultMessage: "Tobacco"})
    return null
})

class IntlRoutes extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const locale=this.props.match.params.lan

        store.dispatch(updateIntl({locale, messages: messages[this.props.match.params.lan]}))

    }

    componentDidUpdate() {
        const locale=this.props.match.params.lan

        store.dispatch(updateIntl({locale, messages: messages[locale]}))

    }

    render() {
        const self = this;
        const props = this.props;
        const locale=this.props.match.params.lan

        return (<IntlProvider key={locale} locale={locale} messages={messages[locale]}>
            <style type="text/css">${mediaStyle}</style>
            <InjectTitle/>
            <Switch>
                <Route path="/:lan/category/:slug/">
                    <ResponsiveContainer>
                        <Category/>
                    </ResponsiveContainer>
                </Route>
                <Route path="/:lan" exact render={props => (<ResponsiveContainer>

                    <PageProvider slug={"home"} store={"home"}>
                        <PageConsumer>
                            <WPContent {...props} defaultTemplate={Page}></WPContent>
                        </PageConsumer>
                    </PageProvider>
                </ResponsiveContainer>)}>
                </Route>

                <Route exact={true} path="/:lan/embeddable/:name">
                    <Embeddables/>
                </Route>


                <Route path="/:lan/:slug/" exact render={props => {
                    return (<ResponsiveContainer>
                        <PageProvider slug={props.match.params.slug} store={props.match.params.slug}>
                            <PageConsumer>
                                <WPContent visibility={{intro: false}} {...props} defaultTemplate={Page}></WPContent>
                            </PageConsumer>
                        </PageProvider>
                    </ResponsiveContainer>)
                }}>

                </Route>
                <Route path="/:lan/:parent/:slug/" exact render={props => (
                    <ResponsiveContainer>

                        <PostProvider type={props.match.params.parent}  slug={props.match.params.slug} store={props.match.params.slug}>

                            <PostConsumer>
                                <WPContent visibility={{link: false, intro: false, title: true, date: true}} {...props}
                                           defaultTemplate={Post}/>
                            </PostConsumer>
                        </PostProvider>

                    </ResponsiveContainer>
                )}>


                </Route>
                <Route path="/:lan/:year/:month/:day/:slug/" exact render={props => (
                    <ResponsiveContainer>

                        <PostProvider slug={props.match.params.slug} store={props.match.params.slug}>

                            <PostConsumer>
                                <WPContent visibility={{link: false, intro: false, title: true, date: true}} {...props}
                                           defaultTemplate={Post}/>
                            </PostConsumer>
                        </PostProvider>

                    </ResponsiveContainer>
                )}>
                </Route>
            </Switch>
        </IntlProvider>)
    }
}

const MainRoutes = (props) => {
    return (<ConnectedRouter history={history}>
        <Switch>
            <Route path="/:lan" render={(props) =>
                <IntlRoutes {...props}/>}>
            </Route>
            <Redirect to="/en"></Redirect>
        </Switch>
    </ConnectedRouter>)
}

const store = getStore()

class AppWrapper extends Component {
    render() {
        return (<Provider store={store}>
            <MainRoutes/>
        </Provider>);
    }
}

export default AppWrapper;
