import React from "react";

const PrevalenceBarDataframe = (props) => {

    const {data, includeTotal} = props
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
            if (d.children) {
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
            }
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


        const options = {
            maxValue: Math.max(...vals) + 5,
            indexBy,
            keys: Array.from(keys),
            data: series.filter(v => v[data.children[0].type] != 'No Data')
        }

        return React.Children.map(props.children, child => React.cloneElement(child, {options}))
    } else {
        return null
    }


}
export default PrevalenceBarDataframe