import React, {useEffect, useState} from 'react'
import {injectIntl} from 'react-intl';
import {ResponsiveSunburst} from '@nivo/sunburst'

const Chart = ({colors, options, intl, format}) => {


    const [filter, setFilter] = useState([])
    const [data, setData] = useState([])


    const toggle = (id) => {
        const newFilter = filter.slice();
        if (newFilter.indexOf(id) > -1) {
            const index = newFilter.indexOf(id);
            newFilter.splice(index, 1);
        } else {
            newFilter.push(id)
        }
        setFilter(newFilter)
    }

    const applyFilter = (values) => {
        if (filter) {
            setData(values.filter(d => filter.indexOf(d.id) === -1));
        } else {
            setData(values)
        }
    }

    useEffect(e => {
        applyFilter(options.data)
    }, [options.data, filter])


    return (
        <div className="chart container">
            {options.data && <ResponsiveSunburst
                data={data}
                margin={{top: 40, right: 20, bottom: 20, left: 20}}
                identity="name"
                value="loc"
                cornerRadius={2}
                borderWidth={1}
                borderColor="white"
                colors={{scheme: 'nivo'}}
                childColor={{from: 'color'}}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                isInteractive={true}
            />}


        </div>
    )
}

export default injectIntl(Chart)
