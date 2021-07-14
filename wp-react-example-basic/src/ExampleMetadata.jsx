import './App.scss';
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux-immutable';
import {Map} from 'immutable'
import thunk from 'redux-thunk'
import {PostConsumer, PostProvider, wordpress} from "@devgateway/wp-react-lib";

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


const List = ({posts, meta}) => {

    return <div>
        <div>Total records: {meta["x-wp-total"]}</div>
        <div>Pages: {meta["x-wp-totalpages"]}</div>
        <ul>{posts.map(post => <li><h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/></li>)}</ul>
    </div>
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
