const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const translateVariable = (v) => {
    const vals = v.replace("${", '').replace("}", '')
    return vals.split('|');
}

const replaceValue = (parts, options) => {

    if (options) {
        if (parts.length == 1 && (parts[0].toLowerCase()) == 'total') {
            return options.total;
        }

        const firstValues = options.data.filter(o => o[options.indexBy] == parts[0]);
        if (parts.length == 1) {
            return firstValues[0].total
        }
        const value = options.data.filter(o => o[options.indexBy] == parts[0]).map(o => o[parts[1]]).reduce((a, b) => a + b, 0)
        return value;
    }
}


export const variableReplacer = (post, data, intl, format) => {

    let html = ""
    if (post && data) {
        const matches = [...post.content.rendered.matchAll(/\${[^\}]*}/g)]
        html = post.content.rendered
        matches.forEach(m => {
            const variables = translateVariable(decodeHtml(m));
            const value = replaceValue(variables, data)

            if (variables.length == 1 && variables[0].toLowerCase() == 'total') {
                html = html.replace(m, intl.formatNumber(value, format))

            } else {
                html = html.replace(m, intl.formatNumber(value, format))
            }
        })
    }
    return html;
}

export const pieOptionBuilder = (data, usePercents) => {

    if (data && data.children) {
        const total = data.value
        const values = data.children.map(child => {
            return {
                "id": child.dimension.value,
                "label": child.dimension.value,
                "value": usePercents ? (100 / total) * child.value : child.value,
            }

        })
        return {data: values}
    } else {
        return {data: []}
    }
}


export const stackedOptionBuilder = (data, usePercents) => {
    if (data && data.children) {

        const total = data.value;
        const dd = data.children.filter(d => d.children);

        let values = []
        let keys
        let indexBy

        if (dd.length > 0) {
            values = dd.map(d => {
                const value = {}
                value[d.dimension.type] = d.dimension.value
                value['total'] = usePercents ? (100 / total) * d.value : d.value
                d.children.forEach(child => {
                    value['dimension'] = child.dimension.type
                    value[child.dimension.value] = usePercents ? (100 / total) * child.value : child.value
                })
                return value
            })
            keys = dd && dd.length > 0 ? dd.pop().children.map(d => d.dimension.value) : []
            indexBy = dd && dd.length > 0 ? dd.pop().dimension.type : []
        } else {


            const value = {}
            value['total'] = usePercents ? (100 / total) * data.value : data.value
            data.children.forEach(child => {
                value['dimension'] = child.dimension.type
                value[child.dimension.value] = usePercents ? (100 / data.value) * child.value : child.value
            })

            values.push(value)
            keys = data.children.map(d => d.dimension.value.toString())
        }


        return {
            total: data.value,
            data: values,
            keys,
            indexBy
        }
    } else {
        return null
    }
}
