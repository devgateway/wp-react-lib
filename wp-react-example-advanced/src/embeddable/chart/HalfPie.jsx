import React, {useState} from 'react'
import {injectIntl} from 'react-intl';
import {ResponsivePie} from '@nivo/pie'


const Chart = ({colors, height, options, intl, format}) => {


    const [filter, setFilter] = useState([])

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
            return values.filter(d => filter.indexOf(d.child) === -1);

        } else {
            return values
        }
    }

    if (!options || !options.data) {
        return null
    }


    return (
        <div className="has-interactive-panel">
            <div style={{height: height}}>
                {options && options.data &&
                <ResponsivePie
                    data={applyFilter(options.data)}
                    margin={{top: 0, right: 195, bottom: 50, left: 0}}
                    startAngle={70}
                    endAngle={190}
                    sortByValue={true}
                    innerRadius={0.7}
                    padAngle={0.9}
                    cornerRadius={3}
                    colors={colors.scheme ? colors : colors.colors}
                    borderWidth={1}
                    borderColor={{from: 'color', modifiers: [['brighter', '2']]}}
                    sliceLabel={d => intl.formatNumber(Math.abs(d.value) / 100, format)}


                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={8}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={1}

                    radialLabelsLinkDiagonalLength={5}
                    radialLabelsLinkHorizontalLength={16}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{from: 'color'}}

                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[]}
                />}
            </div>
            <div className="interactive panel">

                <div className="item active"> Show/Hidden :</div>
                {
                    [...new Set(options.data.map(d => d.child))].map(d =>
                        <div className={filter.indexOf(d) > -1 ? 'item' : 'item active'}
                             onClick={e => toggle(d)}>{d}</div>)}
            </div>
        </div>


    )
}

export default injectIntl(Chart)
