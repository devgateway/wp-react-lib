import React from 'react';
import {withRouter} from "react-router";


class ScrollToTopOnMount extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.setTimeout(e => window.scrollTo(0, 0), 200)
        }
    }


    render() {
        return null;
    }
}

export default withRouter(ScrollToTopOnMount);