import React from 'react'

import {MenuContext} from '../providers/Context'

/**
 * @deprecated Use the `MenuContext.Consumer` instead.
 * MenuConsumer is a component that provides the menu and locale to its children.
 * @param props - The props for the MenuConsumer component.
 * @returns The MenuConsumer component.
 */
const MenuConsumer = (props) => {
    return (
        <React.Fragment>
            <MenuContext.Consumer>
                {
                    ({menu, locale}) => {
                        return menu ? <React.Fragment>
                            {React.Children.map(props.children, (child) =>
                                React.isValidElement(child) && 'props' in child && child.props && typeof child.type !== 'string'
                                    ? React.cloneElement(child, { menu, locale })
                                    : child
                            )}
                        </React.Fragment> : null;
                    }
                }
            </MenuContext.Consumer>
        </React.Fragment>)
}

export default MenuConsumer;
