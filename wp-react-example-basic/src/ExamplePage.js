import './App.scss';
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable'
import thunk from 'redux-thunk'

import {Page, PageConsumer, PageProvider, Post, PostConsumer, PostProvider, wordpress} from "@devgateway/wp-react-lib";

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

//Load Home Page
function Home() {
    return (
        <Provider store={store}>
            <div className="App">
                <PageProvider slug={"home"}>
                    <PageConsumer>
                        <Page></Page>
                    </PageConsumer>
                </PageProvider>
            </div>
        </Provider>
    );
}

export default Home;
