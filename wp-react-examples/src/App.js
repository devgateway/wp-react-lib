import './App.scss';
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable'
import thunk from 'redux-thunk'
import {Page, PageConsumer, PageProvider, Post, PostConsumer, PostProvider, wordpress} from "wp-react-lib";

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

//Load List of Posts
function Posts() {
    return (
        <Provider store={store}>
            <div className="App">
                <PostProvider store={"posts"}>
                    <PostConsumer>
                        <Post showTilte></Post>
                    </PostConsumer>
                </PostProvider>
            </div>
        </Provider>
    );
}

const List = ({posts}) => {
    return <ul>{posts.map(post => <li><h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/></li>)}</ul>
}

//Load List of Posts with custom list
function PostsList() {
    return (
        <Provider store={store}>
            <div className="App">
                <PostProvider store={"posts"}>
                    <PostConsumer>
                        <List></List>
                    </PostConsumer>
                </PostProvider>
            </div>
        </Provider>
    );
}

export default PostsList;
