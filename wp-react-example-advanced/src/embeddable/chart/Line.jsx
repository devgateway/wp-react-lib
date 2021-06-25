import React, {useState} from 'react'
import {injectIntl} from 'react-intl';
import {ResponsiveLine} from '@nivo/line'
import {
    colorSchemes,
    isCategoricalColorScheme,
    isSequentialColorScheme,
    sequentialColorInterpolators
} from "@nivo/colors";
import * as d3 from "d3";
import {useTheme} from "@nivo/core";

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

            return values.filter(v => filter.indexOf(v.id) === -1);
        }
        return values
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


    const CustomTick = tick => {
        const theme = useTheme()

        const width = getTextWidth(tick.value, "12px Roboto") + 15
        return (<g transform={`translate(${tick.x},${tick.y + 30})`}>
            <line stroke={tickColor} strokeWidth={1.5} y1={-32} y2={-12}/>
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
                  fill={tickColor}/>


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

    const getColor = (id) => {
        if (filter.indexOf(id) > -1) {
            return "#EEE"
        } else {
            return getColorByPosition(options.data.map(d => d.id).indexOf(id))
        }
    }
    let legendsConfig = {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: -100,
        translateY: 100,
        itemsSpacing: 2,
        itemWidth: itemWidth,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        onClick: (d) => {
            toggle(d.id);
        }
    }

    let margin = {top: 10, right: 25, bottom: 60, left: 80}

    if (legendPosition == 'right' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom-right", translateX: 40 + itemWidth, translateY: 0,})
        margin = Object.assign(margin, {right: 20 + itemWidth, bottom: 60})
    }
    if (legendPosition == 'bottom' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom"})
        Object.assign(legendsConfig, {direction: "row"})
        Object.assign(legendsConfig, {anchor: "bottom-right", translateX: 0, translateY: 90})
        margin = Object.assign(margin, {bottom: 90})
    }
    if (legendPosition == 'left' && showLegends) {
        Object.assign(legendsConfig, {anchor: "bottom-left", translateX: (40 + itemWidth) * -1, translateY: 0})
        margin = Object.assign(margin, {left: itemWidth + 40})

    }


    return (
        <div style={{height: height}}>

            {options && options.data && <ResponsiveLine
                data={applyFilter(options.data)}

                margin={margin}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: options.maxValue,
                    stacked: groupMode == "stacked",
                    reverse: false
                }}
                axisTop={null}
                axisRight={null}
                lineWidth={3}
                colors={d => getColor(d.id)}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: tickRotation,
                    legend: legends.bottom,
                    legendOffset: 100,
                    legendPosition: 'middle'
                }}
                axisBottom={{renderTick: CustomTick}}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: legends.left,
                    legendPosition: 'middle',
                    legendOffset: -60
                }}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={showLegends ? [
                    {
                        data: options.data.map(d => ({id: d.id, label: d.id, color: getColor(d.id)})),
                        ...legendsConfig
                    }
                ] : []}

                animate={true}
                motionStiffness={130}
                motionDamping={15}
                tooltip={(d) => {
                    return (
                        <div className={"chart tooltip"} style={{"backgroundColor": d.point.serieColor}}>
                            {d.point.serieId} ({d.point.data.x})
                            : {intl.formatNumber(format.style === 'percent' ? d.point.data.y / 100 : d.point.data.y, format)}
                        </div>
                    )
                }}


            />}
        </div>
    )
}

export default injectIntl(Chart)
