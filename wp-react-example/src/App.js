import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router' // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router/immutable'
import getStore, {history} from './redux/store'
import messages_en from "./translations/en.json";
import {updateIntl} from 'react-intl-redux'
import {injectIntl, IntlProvider} from "react-intl";
import smoothscroll from 'smoothscroll-polyfill';
import ResponsiveContainer from './layout'
import {components} from "./embeddable";



import {ComponentsProvider,Category, Page, PageConsumer, PageProvider, Post, PostConsumer, PostProvider, WPContent} from "dg-wp-react/src/index";

//import {ComponentsProvider,Category, Page, PageConsumer, PageProvider, Post, PostConsumer, PostProvider, WPContent} from "dg-wp-react/src/index";


// kick off the polyfill!
smoothscroll.polyfill();

const messages = {
    'en': messages_en
};


const InjectTitle = injectIntl(({intl}) => {
    document.title = intl.formatMessage({id: 'app.title', defaultMessage: process.env.REACT_APP_TITLE})
    return null
})

class IntlRoutes extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[this.props.match.params.lan]}))

    }

    componentDidUpdate() {
        const locale = this.props.match.params.lan
        store.dispatch(updateIntl({locale, messages: messages[locale]}))

    }

    render() {
        const self = this;
        const props = this.props;
        const locale = this.props.match.params.lan
        return (<IntlProvider key={locale} locale={locale} messages={messages[locale]}>

            <Switch>

                {
                    //Category Route
                }
                <Route path="/:lan/category/:slug/">
                    <ResponsiveContainer>
                        <Category/>
                    </ResponsiveContainer>
                </Route>

                {
                    //default route (home)
                }
                <Route path="/:lan" exact render={props => (
                    <PageProvider slug={"home"} locale={locale} store={"home"}>
                        <ResponsiveContainer>
                            <PageConsumer>
                                <WPContent locale={locale} showContent={true} {...props} defaultTemplate={Page}></WPContent>
                            </PageConsumer>
                        </ResponsiveContainer>
                    </PageProvider>

                )}>
                </Route>
                <Route exact={true} path="/:lan/embeddable/:name">

                </Route>

                {
                    //page route
                }
                <Route path="/:lan/:slug/" exact render={props => {

                    return (

                        <PageProvider slug={props.match.params.slug} store={props.match.params.slug}>
                            <ResponsiveContainer>
                                <PageConsumer>
                                    <WPContent locale={locale} showContent={true} {...props} defaultTemplate={Page}></WPContent>
                                </PageConsumer>
                            </ResponsiveContainer>
                        </PageProvider>
                    )
                }}>
                </Route>
                {
                    //child route
                }
                <Route path="/:lan/:parent/:slug/" exact render={props => (
                    <PageProvider slug={props.match.params.slug} store={props.match.params.slug}>
                        <ResponsiveContainer>
                            <PageConsumer>
                                <WPContent locale={locale} showContent={true} {...props} defaultTemplate={Page}></WPContent>
                            </PageConsumer>
                        </ResponsiveContainer>
                    </PageProvider>

                )}>


                </Route>

                {
                    //post route
                }
                <Route path="/:lan/:parent/:year/:month/:day/:slug/" exact render={props => (

                    <PostProvider type={props.match.params.parent}
                                  slug={props.match.params.slug}
                                  store={props.match.params.slug}
                                  locale={locale}>
                        <ResponsiveContainer>
                            <PostConsumer>
                                <WPContent visibility={{link: false, intro: false, title: true, date: true}} {...props}
                                           defaultTemplate={Post}/>
                            </PostConsumer>
                        </ResponsiveContainer>
                    </PostProvider>

                )}>
                </Route>

                <Route path="/:lan/:year/:month/:day/:slug/" exact render={props => (
                    <ResponsiveContainer>
                        <PostProvider
                            slug={props.match.params.slug}
                            store={props.match.params.slug}
                            locale={locale}
                        >
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
            <Route path="/:lan" render={(props) => <IntlRoutes {...props}/>}></Route>
            <Redirect to="/en"></Redirect>
        </Switch>

    </ConnectedRouter>)
}

const store = getStore()

class AppWrapper
    extends Component {
    render() {
        return (<Provider store={store}>
            <MainRoutes/>
        </Provider>);
    }
}

export default AppWrapper;
