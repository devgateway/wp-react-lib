import React from 'react';
import { CategoriesContext } from '../providers/Context';

export const CategoriesConsumer = ({ children }) => {
    return (
        <React.Fragment>
            <CategoriesContext.Consumer>
                {({ categories, loading, error, meta }) => {
                    if (loading) {
                        return (
                            <React.Fragment>
                                {React.Children.map(children, (child => React.cloneElement(child, { categories: [], loading, error: null, meta })))}
                            </React.Fragment>
                        );
                    }

                    if (error) {
                        return (
                            <React.Fragment>
                                {React.Children.map(children, (child => React.cloneElement(child, { categories: [], loading: false, error, meta })))}
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment>
                            {React.Children.map(children, (child => React.cloneElement(child, { categories: categories || [], loading: false, error: null, meta })))}
                        </React.Fragment>
                    );
                }}
            </CategoriesContext.Consumer>
        </React.Fragment>

    );
};

export default CategoriesConsumer;
