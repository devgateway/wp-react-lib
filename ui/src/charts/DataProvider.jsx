import React, {useEffect} from 'react'


import prevalence from '../_factsheets/static/prevalence/module'
import ecigarettes from '../_factsheets/static/ecigarettes/module'

const modules = {
    prevalence,
    ecigarettes
}


/*
"Gender": "Male", _> indexBy
  "African": 136 -> keys,
  "Indian": 200,
*/

export const DataContext = React.createContext()


const noDataFilter = (c) => c.value != 'No Data'

const pieBuilder = (data, includeTotal) => {
    if (data && data.children) {
        const values = []
        let row;
        data.children.filter(noDataFilter)
            .forEach(d => {
                //first level example gender

                d.children.filter(noDataFilter).forEach(d1 => {
                    //second level
                    row = {}
                    if (d1.children) {


                        row.id = d.value + ' - ' + d1.value //Male /African ect (dimension value)
                        row.parent = d.value
                        row.child = d1.value

                        row.label = d.value + ' - ' + d1.value  //Male /African ect (dimension value)
                        d1.children.filter(c => c.value === true).forEach(d2 => {
                            row.value = (d2.sum / d1.sum) * 100
                        })
                    } else {
                        row = {}
                        //no next level thi is smoke
                        row.id = d.value //Male - fmale
                        row.label = d.value //Male - fmale
                        row.parent = d.value
                        row.child = d.value
                        if (d1.value == true) {
                            row.value = (d1.sum / d.sum) * 100
                        }
                    }
                    values.push(row)

                })


            })


        return {
            data: values.sort((d1, d2) => d2.value - d1.value)
        }
    }

}
const divergingBuilder = (data, includeTotal) => {
    const options = barBuider(data, false)
    if (options) {
        const keys = options.keys;
        const divergingData = options.data.map(d => {
            d[keys[0]] = d[keys[0]] * -1
            d[keys[1]] = d[keys[1]]
            return d
        })
        return {...options, data: divergingData}
    } else {
        return null;
    }
}


const barBuider = (data, includeTotal) => {
    const usePercents = true

    if (data && data.children) {
        const series = []
        const vals = []
        const totalCount = data.count;
        const totalSum = data.sum;
        const indexBy = data.children[0].type
        const keys = new Set();
        var total = 0;

        data.children.forEach(d => {
            const row = {}
            row[d.type] = d.value //Male /African ect (dimension value)
            //row[d.value + '_count'] = d.count // count
            //row[d.value + '_sum'] = d.sum

            d.children.forEach(d1 => {
                if (d1.children) {
                    if (d1.value != 'No Data') {

                        keys.add(d1.value)
                        row[d.type] = d.value //Male /African ect (dimension value)
                        //row[d.value + '_count'] = d.count // count
                        //row[d.value + '_sum'] = d.sum

                        d1.children.forEach(d2 => {
                            if (d2.value != 'No Data') {

                                if (d2.value == true) {
                                    row[d1.value] = (d2.sum / d1.sum) * 100;
                                    vals.push((d2.sum / d1.sum) * 100)
                                }
                                row[d1.value + '_' + d2.value] = (d2.sum / d1.sum) * 100

                                //row[d1.value + '_' + d2.value + '_count'] = d2.count
                                //row[d1.value + '_' + d2.value + '_sum'] = d2.count
                            }

                        })
                    }
                } else {
                    if (d1.value == true) {
                        keys.add("Yes")
                        total += d1.sum
                        vals.push((d1.sum / d.sum) * 100)
                    }
                    row[d1.value == true ? 'Yes' : 'No'] = (d1.sum / d.sum) * 100

                    //row[d1.value+'_sum']=d1.sum
                    //row[d1.value+'_count']=d1.count
                }
            })
            series.push(row)

        })

        if (includeTotal) {
            if (total > 0) {
                const tot = {}
                tot[indexBy] = 'Total'
                tot['Yes'] = (total / data.sum) * 100
                vals.push((total / data.sum) * 100)
                series.push(tot)
            }
        }


        return {
            maxValue: Math.max(...vals) + 5,
            indexBy,
            keys: Array.from(keys),
            data: series.filter(v => v[data.children[0].type] != 'No Data')
        }

    } else {
        return null
    }
}


const DataProvider = ({
                          data,
                          source,
                          includeTotal,
                          keys,
                          type,
                          onLoadData,
                          children
                      }) => {


    useEffect(() => {
        onLoadData(source)
    }, [onLoadData, source]);

    let options

    switch (type) {
        case 'bar':
            options = barBuider(data, includeTotal)
            break;
        case 'diverging':
            options = divergingBuilder(data, includeTotal)
            break;
        case 'halfPie':
        case 'pie':
            options = pieBuilder(data, includeTotal)
            break;
        default:
    }


    return (<DataContext.Provider value={options}> {children}</DataContext.Provider>)

}


export default DataProvider
