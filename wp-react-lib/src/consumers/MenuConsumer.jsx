import React from 'react'

import {MenuContext} from '../providers/Context'

const PageConsumer = (props) => {
    return (
        <React.Fragment>
            <MenuContext.Consumer>
                {
                    ({menu, locale}) => {
                        return menu && <React.Fragment>
                            {React.Children.map(props.children, (child => React.cloneElement(child, {menu, locale})))}
                        </React.Fragment>
                    }
                }
            </MenuContext.Consumer>
        </React.Fragment>)
}


export default PageConsumer
