import React from 'react';
import {Dropdown, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {toPng} from 'html-to-image';
import download from 'downloadjs'

const delay = (time) => {
    return new Promise((resolve => window.setTimeout(resolve, time)))
}

const getItems = (categories, type) => {
    if (categories) {
        const items = categories.find(i => i.get('type') == type);
        return items ? items.get('items').toJS() : null
    }
    return [];
}

const toOptions = (items) => items ? items.sort((a, b) => a.position - b.position).map(i => ({
    key: i.id,
    value: i.id,
    text: i.value,
    icon: i.value.toLocaleLowerCase(),

})) : []

const connected = (fn) => {

    const mapStateToProps = (state, ownProps) => {
        return {
            categories: state.getIn(['ecigarettes', 'categories', 'items']),
        }
    }

    const mapActionCreators = {};

    return connect(mapStateToProps, mapActionCreators)(injectIntl(fn))
}


export const DropDownFilter = ({
                                   categories,
                                   type,
                                   options,
                                   placeholder,
                                   selected,
                                   icon = 'filter',
                                   onChange
                               }) => {

    return <Dropdown
        fluid
        placeholder={placeholder}
        icon={icon}
        onChange={onChange}
        header={<Dropdown.Header content={<div>All / None</div>}/>}
        floating
        labeled
        button
        multiple
        className='icon'
        options={toOptions(getItems(categories, type))}
    >

    </Dropdown>
}


export const SingleDropDown = (({options, placeholder, selected, icon = 'filter', onChange}) => {

    return <Dropdown
        fluid
        placeholder={placeholder}
        icon={icon}
        onChange={onChange}
        header={<Dropdown.Header content={<div>All / None</div>}/>}
        floating
        labeled
        button
        multiple
        className='icon'
        options={options}
    >

    </Dropdown>
})


export const PngExport = ({id, icon, name, filters = [], includes = [], size}) => {

    return (<Icon name={icon} size={size} onClick={e => {

        var node = document.getElementById(id);

        var exportable = id ? node.getElementsByClassName("png exportable")[0] : node

        const doFilter = (node) => {
            node.srcset = ''
            if (node.classList && ([...node.classList].map(l => filters.indexOf(l) > -1).filter(n => n).length > 0) && !([...node.classList].map(l => includes.indexOf(l) > -1).filter(n => n).length > 0)) {
                return false
            }
            return true
        }
        //  exportable=exportable.cloneNode()
        var imgs = exportable.getElementsByTagName('img')
        for (let item of imgs) {
            item.srcset_back = item.srcset
            item.srcset = ''
        }

        toPng(exportable, {backgroundColor: "#FFF", filter: doFilter, style: {'border': '0px !important'}})
            .then(delay(1))
            .then(function (dataUrl) {
                download(dataUrl, name + '.png');
                for (let item of imgs) {
                    item.srcset = item.srcset_back
                }
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }}></Icon>)
}

export const getLocaleText = (translations, locale) => {
    const tr = translations ? translations[locale.toUpperCase()] : null;
    if (tr) {
        return tr
    } else {
        return null;
    }
}


export const ordinalSort = (a, b) => (a.position - b.position)


export const code2Slug = (code) => {
    return code.toLowerCase().replace(/__/gi, "_")
}

export const code2ClassName = (code) => {
    return code.toLowerCase().split('_').join('-')
}
export const code2Key = (prefix, code) => {
    console.log("check this key " + prefix + '.' + code.toLowerCase().split('_').join('.'))
    return prefix + '.' + code.toLowerCase().split('_').join('.')
}


export const LocaleSpan = injectIntl((props) => {
    const {translations, intl, className} = props
    return (
        <span {...props}>{getLocaleText(translations, intl.locale)}</span>
    )
})
