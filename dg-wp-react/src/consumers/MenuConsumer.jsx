import React from 'react'

import {MenuContext} from '../providers/Context'

const PageConsumer = (props) => {
    return (
        <React.Fragment>
            <MenuContext.Consumer>
                {
                    (menu) => {
                        return menu && <React.Fragment>
                            {React.Children.map(props.children, (child => React.cloneElement(child, {menu})))}
                        </React.Fragment>
                    }
                }
            </MenuContext.Consumer>
        </React.Fragment>)
}


export default PageConsumer
