import React from 'react'

import {SettingsContext} from '../providers/Context'

const SettingsConsumer = (props) => {
    return (
        <React.Fragment>
            <SettingsContext.Consumer>
                {
                    ({data}) => {
                        return data && <React.Fragment>
                            {React.Children.map(props.children, (child => React.cloneElement(child, {settings:data})))}
                        </React.Fragment>
                    }
                }
            </SettingsContext.Consumer>
        </React.Fragment>)
}


export default SettingsConsumer
