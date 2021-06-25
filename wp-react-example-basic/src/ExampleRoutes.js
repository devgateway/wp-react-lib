import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './App.scss';
import {applyMiddleware, compose, createStore} from 'redux'
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable'
import thunk from 'redux-thunk'
import {Page, PageConsumer, PageProvider, wordpress} from "@devgateway/wp-react-lib";
import {Provider} from "react-redux";
import {Redirect} from "react-router";

const initialState = Map()
const getRootReducer = () => combineReducers({
    wordpress,
})
const store = createStore(
    getRootReducer(), // root reducer with router state
    initialState,
    compose(
        applyMiddleware(
            thunk // for dispatching history actions
        )
    )
)

export default function BasicExample() {
    return (
        <Provider store={store}>

            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/sample-page">Sample Page</Link>
                        </li>
                    </ul>

                    <hr/>

                    <Switch>
                        <Route exact path={"/"}>
                            <Redirect to={"/home"}></Redirect>
                        </Route>
                        <Route exact path="/:slug" render={(props) => {
                            return <div className="App">
                                <PageProvider slug={props.match.params.slug}>
                                    <PageConsumer>
                                        <Page></Page>
                                    </PageConsumer>
                                </PageProvider>
                            </div>
                        }}>

                        </Route>

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

// You can think of these components as "pages"
// in your app.


