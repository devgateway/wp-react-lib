import React, {Component} from 'react';
import GoogleAnalytics from "react-ga";
import {getAnaliticUserCode} from './api/commons'


GoogleAnalytics.initialize(getAnaliticUserCode());

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = page => {
        GoogleAnalytics.set({
            page,
            ...options,
        });

        GoogleAnalytics.pageview(page);
    };

    const HOC = class extends Component {
        componentDidMount() {
            const page = this.props.location.pathname;
            trackPage(page);
        }

        componentDidUpdate = prevPros => {
            const currentPage = prevPros.location.pathname;
            const nextPage = this.props.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        };

        render() {

            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
};

export default withTracker;
