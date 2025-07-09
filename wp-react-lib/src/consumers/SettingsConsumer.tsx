import React from 'react'
import { SettingsContext } from '../providers/Context'

interface SettingsConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

/**
 * @deprecated Use the `SettingsContext.Consumer` instead.
 * SettingsConsumer is a component that provides the settings to its children.
 * @param props - The props for the SettingsConsumer component.
 * @returns The SettingsConsumer component.
 */
const SettingsConsumer = (props: SettingsConsumerProps) => {
    return (
        <SettingsContext.Consumer>
            {(_obj) => {
                return _obj?.data && (
                    <React.Fragment>
                        {React.Children.map(props.children, (child) =>
                            React.isValidElement(child) && 'props' in child && child.props && typeof child.type !== 'string'
                                ? React.cloneElement(child as React.ReactElement<any>, { settings: _obj?.data })
                                : child
                        )}
                    </React.Fragment>
                );
            }}
        </SettingsContext.Consumer>
    );
}

export default SettingsConsumer;
