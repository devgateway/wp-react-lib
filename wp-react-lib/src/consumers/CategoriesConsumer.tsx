import React from 'react';
import { CategoriesContext } from '../providers/Context';

interface CategoriesConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `CategoriesContext.Consumer` instead if you want type safety.
 * CategoriesConsumer is a component that provides the categories, loading, error, and meta to its children.
 * @param props - The props for the CategoriesConsumer component.
 * @returns The CategoriesConsumer component.
 */
export const CategoriesConsumer = ({ children }: CategoriesConsumerProps) => {
    return (
        <React.Fragment>
            <CategoriesContext.Consumer>
                {({ categories, loading, error, meta }) => {
                    if (loading) {
                        return (
                            <React.Fragment>
                                {React.Children.map(children, (child => React.cloneElement(child as React.ReactElement<any>, { categories: [], loading, error: null, meta })))}
                            </React.Fragment>
                        );
                    }

                    if (error) {
                        return (
                            <React.Fragment>
                                {React.Children.map(children, (child => React.cloneElement(child as React.ReactElement<any>, { categories: [], loading: false, error, meta })))}
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment>
                            {React.Children.map(children, (child => React.cloneElement(child as React.ReactElement<any>, { categories: categories || [], loading: false, error: null, meta })))}
                        </React.Fragment>
                    );
                }}
            </CategoriesContext.Consumer>
        </React.Fragment>

    );
};

export default CategoriesConsumer;
