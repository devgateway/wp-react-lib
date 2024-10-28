import React, { useLayoutEffect } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import {getSettings} from '../reducers/actions'

import {SettingsContext} from './Context'

/*
WP-REST-API V2 Menus plugin is required
Will load a post base ond passed properties and put in PostContext
*/
// class SettingProvider extends React.Component {

//     componentDidMount() {
//         const {onLoad, locale, changeUUID} = this.props
//         console.log("int====>", this.props);
//         if (locale) {
//             this.props.onLoad({locale,changeUUID})
//         }
//     }

//     render() {
//         const {data} = this.props
//         console.log("data====>", data);
//         return (
//             <div>Settings</div>
//         )
//         // return (<SettingsContext.Provider value={{data}}>
//         //     {this.props.children}
//         // </SettingsContext.Provider>);

//     }
// }

// const mapStateToProps = (state, ownProps) => {
//     return {
//         error: state.getIn(['wordpress', 'settings', 'error']),
//         data: state.getIn(['wordpress', 'settings', 'data']),
//         loading: state.getIn(['wordpress', 'settings', 'loading'])
//     }
// }
// const mapActionCreators = {
//     onLoad: getSettings
// };

// export default connect(mapStateToProps, mapActionCreators)(SettingProvider);

const SettingProvider = (props) => {
    const {children, locale, changeUUID } = props;
    const dispatch = useDispatch();

    const error = useSelector(state => state.getIn(['wordpress', 'settings', 'error']));
    const data = useSelector(state => state.getIn(['wordpress', 'settings', 'data']));
    const loading = useSelector(state => state.getIn(['wordpress', 'settings', 'loading']));

    console.log("data====>", data);
    console.log("props====>", props);

    useLayoutEffect(() => {
        dispatch(getSettings({
            locale,
            changeUUID
        }));

        return () => {
            // cleanup
        }
    }, [locale, changeUUID]);

    return (
        <SettingsContext.Provider value={{ data }}>
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingProvider;