import React, {useState} from 'react'
import {ResponsiveBar} from '@nivo/bar'
import {injectIntl} from 'react-intl';
import {BoxLegendSvg} from "@nivo/legends";
import {useTheme} from '@nivo/core'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    sequentialColorInterpolators
} from '@nivo/colors'
import * as d3 from 'd3';


const getTextWidth = (text, font) => {
    // re-use canvas object for better performance
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

const lightenDarkenColor = (col, amt) => {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


const Chart = ({
                   legends,
                   itemWidth,
                   options,
                   intl,
                   format,
                   colors,
                   groupMode,
                   height,
                   showLegends,
                   legendPosition,
                   tickRotation,
                   tickColor
               }) => {

    const [filter, setFilter] = useState([])
    const applyFilter = (values) => {
        if (filter) {
            if (colors.colorBy === 'index') {
                return values.filter(d => filter.indexOf(d[options.indexBy]) === -1);
            } else {
                return values.filter(d => filter.indexOf(d) === -1);
            }
        } else {
            return values
        }
    }

    const getColor = (id, d) => {

        if (colors.colorBy == 'id') {
            if (id) {
                return getColorByKey(id)
            }
        } else {
            return getColorByIndex(d[options.indexBy])
        }
    }

    const getColorByPosition = (position) => {
        if (colors.scheme) {

            const color = colorSchemes[colors.scheme]
            if (isSequentialColorScheme(colors.scheme)) {

                const interpolator = sequentialColorInterpolators[colors.scheme]
                const pos = position - (9 * parseInt((position / 9)))

                const scale = d3.scaleSequential(interpolator).domain([0, 8])

                return scale(pos)
            }

            if (isCategoricalColorScheme(colors.scheme)) {
                if (position > color.length - 1) {

                    const pos = position - (color.length * parseInt((position / color.length)))

                    return colorSchemes[colors.scheme][pos]
                } else {
                    return colorSchemes[colors.scheme][position]
                }
            }
        } else {
            return colors.colors[position]
        }
    }

    const getColorByKey = (id) => {
        if (colors && colors.scheme) {
            const index = options.keys.findIndex(k => k == id)
            return getColorByPosition(index)
        } else {

            return colors.colors[options.keys.findIndex(k => k == id)]
        }
    }

    const getColorByIndex = (id) => {

        if (colors && colors.scheme) {
            const index = options.data.findIndex(f => f[options.indexBy] == id)
            return getColorByPosition(index)
        } else {
            return colors.colors[options.data.findIndex(f => f[options.indexBy] == id)]
        }
    }

    const BarLegend = ({height, legends, width}) => (
        <React.Fragment>
            {legends.map(legend => (
                <BoxLegendSvg
                    key={JSON.stringify(legend.data.map(({id}) => id))}
                    {...legend}
                    containerHeight={height}
                    containerWidth={width}
                />
            ))}

        </React.Fragment>
    );

    const CustomTick = tick => {
        const theme = useTheme()

        const width = getTextWidth(tick.value, "12px Roboto") + 15
        return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
            <line stroke={colors.colorBy == 'id' ? tickColor : getColorByIndex(tick.value)} strokeWidth={1.5} y1={-32}
                  y2={-12}/>

            <rect transform={`rotate(${tickRotation})`}
                  x={(-1 * (width) / 2 + 2)}
                  y={-6} rx={3} ry={3}
                  width={(width) + 2} height={22}
                  fill="rgba(0, 0, 0, .03)"/>

            <rect transform={`rotate(${tickRotation})`}
                  x={(-1 * (width) / 2)}
                  y={-12}
                  rx={2}
                  ry={2} width={width} height={22}
                  fill={colors.colorBy == 'id' ? tickColor : getColorByIndex(tick.value)}/>


            <text transform={`rotate(${tickRotation})`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                      ...theme.axis.ticks.text,
                      fill: '#FFF',
                      fontSize: "12px",
                  }}
            >
                {tick.value}
            </text>

        </g>)
    }

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


    let legendsConfig = {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: -120,
        translateY: 100,
        itemsSpacing: 2,
        itemWidth: itemWidth,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
    }

    let margin = {top: 0, right: 25, bottom: 60, left: 50}

    if (legendPosition == 'right' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom-right", translateX: 40 + itemWidth, translateY: 0,})
        margin = {top: 0, right: 20 + itemWidth, bottom: 60, left: 50}
    }
    if (legendPosition == 'bottom' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom"})
        Object.assign(legendsConfig, {direction: "row"})
        Object.assign(legendsConfig, {anchor: "bottom-right", translateX: 0, translateY: 90})
        margin = {top: 0, right: 25, bottom: 100, left: 50}
    }
    if (legendPosition == 'left' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom-left", translateX: (40 + itemWidth) * -1, translateY: 0})
        margin = {top: 0, right: 25, bottom: 60, left: itemWidth + 40}
    }

    return (
        <div style={{height: height}}>
            {options && options.data && <ResponsiveBar
                colorBy={colors.colorBy}
                animate={true}
                enableLabel={true}
                motionStiffness={55}
                motionDamping={11}
                {...options}

                minValue="auto"
                keys={applyFilter(options.keys)}
                data={applyFilter(options.data)}
                groupMode={groupMode ? groupMode : "grouped"}
                margin={margin}
                padding={0.1}
                colors={d => getColor(d.id, d.data)}
                borderColor="#000"
                axisTop={null}
                axisRight={null}


                axisBottom={{renderTick: CustomTick}}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legends.left,
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={40}
                labelSkipHeight={12}
                labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                label={(l) => intl.formatNumber(format.style === 'percent' ? l.value / 100 : l.value, format)}
                layers={["grid", "axes", "bars", "markers", BarLegend, 'annotations']}
                legends={showLegends ? [
                    {
                        data: colors.colorBy === 'index' ? options.data.map((d, index) => {

                            let theColor;
                            if (filter.indexOf(d[options.indexBy]) > -1) {
                                theColor = '#EEE'
                            } else {
                                theColor = getColor(d.id, d)
                            }
                            return {
                                color: theColor,
                                id: d[options.indexBy],
                                label: d[options.indexBy]
                            }
                        }) : options.keys.map((k) => {
                            let theColor;
                            if (filter.indexOf(k) > -1) {
                                theColor = '#EEE'
                            } else {
                                theColor = getColorByKey(k)
                            }
                            return {
                                color: theColor,
                                id: k,
                                label: k
                            }
                        }),
                        ...legendsConfig,
                        onClick: (d) => {
                            toggle(d.id)
                        },
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: .6
                                }
                            }
                        ]
                    }
                ] : []}
                onMouseEnter={(_data, event) => {
                    event.target.style.fill = lightenDarkenColor(getColor(_data.id, _data.data), 30)
                }}
                onMouseLeave={(_data, event) => {
                    event.target.style.fill = getColor(_data.id, _data.data)
                }}
                animate={true}
                motionStiffness={130}
                motionDamping={15}

                tooltip={(d) => {
                    const {color, id, value} = d
                    return (
                        <div className={"chart tooltip"} style={{"backgroundColor": color}}>

                            {id} ({d.data[options.indexBy]})
                            : {intl.formatNumber(format.style === 'percent' ? value / 100 : value, format)}
                        </div>
                    )
                }}

                theme={{
                    tooltip: {
                        basic: {whiteSpace: "pre", display: "flex", alignItems: "center"},
                        container: {
                            background: "transparent",
                            boxShadow: ""
                        },
                        table: {},
                        tableCell: {padding: "3px 5px"},

                    },
                }}
            />}
        </div>
    )
}

export default injectIntl(Chart)
