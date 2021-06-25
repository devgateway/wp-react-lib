import React from "react";


const LineData = ({children, data, keys}) => {


    const keyLabels = {
        rate: 'Excise rate',
        price: 'Retail price',
        consumption: 'Official Consumption',
        total: 'Total Consumption'
    }

    const vals = []
    const chartData = Object.keys(data)
        .filter(k => keys.indexOf(k) > -1)
        .map(k => {

            return {
                id: keyLabels [k],
                data: data && data.children ? data.children.map(d => {
                    vals.push([d[k]])
                    return {x: d.value, y: d[k]}
                }) : []
            }
        })


    const options = {
        maxValue: Math.max(...vals) + Math.max(...vals) * .1,
        data: chartData
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
}

const BarData = ({children, data, keys}) => {
    const keyLabels = {
        rate: 'Excise rate',
        price: 'Retail price',
        consumption: 'Official Consumption',
        total: 'Total Consumption'
    }
    const vals = []

    const chartData = data && data.children ? data.children.map(d => {
        const row = new Object();
        row[d.type] = d.value;
        keys.forEach(k => {
            vals.push(d[k])
            row[keyLabels[k]] = d[k]
        })
        return row;
    }) : [];


    const options = {
        maxValue: Math.max(...vals) + Math.max(...vals) * .1,
        indexBy: "year",
        keys: keys.map(k => keyLabels[k]),
        data: chartData
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
}


const PolicyDataframe = ({children, data, keys, type}) => {

    if (type == 'bar') {
        return <BarData data={data} keys={keys}>{children}</BarData>
    }
    if (type == 'line') {
        return <LineData data={data} keys={keys}>{children}</LineData>
    }

}

export default PolicyDataframe;