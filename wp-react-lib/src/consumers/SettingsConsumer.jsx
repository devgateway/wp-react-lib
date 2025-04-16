import React from 'react'

import {SettingsContext} from '../providers/Context'

const SettingsConsumer = (props) => {
    return (
        <React.Fragment>
            <SettingsContext.Consumer>
                {
                    (_obj) => {
                        return _obj?.data && <React.Fragment>
                            {React.Children.map(props.children, (child => React.cloneElement(child, {settings: _obj?.data})))}
                        </React.Fragment>
                    }
                }
            </SettingsContext.Consumer>
        </React.Fragment>)
}


export default SettingsConsumer
