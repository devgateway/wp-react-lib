import React from 'react'

import { SettingsContext } from '../providers/Context'

interface SettingsConsumerProps {
    children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
}

const SettingsConsumer = (props: SettingsConsumerProps) => {
    return (
        <SettingsContext.Consumer>
            {
                (_obj) => {
                    return _obj?.data && <React.Fragment>
                        {React.Children.map(props.children, (child => React.cloneElement(child as React.ReactElement, { settings: _obj?.data })))}
                    </React.Fragment>
                }
            }
        </SettingsContext.Consumer>
    )
}


export default SettingsConsumer
