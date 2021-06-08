import React, {useRef, useState} from "react";
import {Button, Container, Grid, Segment} from "semantic-ui-react";

import {connect} from "react-redux";

import {buildDivergingOptions, buildPieOptions} from './prevalenceBuilder'

import HalfPie from "./HalfPie";
import Bar from "./Bar";
import Line from "./Line";
import PrevalenceBarDataframe from './PrevalenceBarDataFrame'
import PolicyDataFrame from './PolicyDataFrame'
import DataProvider from "../data/DataProvider";
import {PostContent} from "wp-react-lib";
import DataConsumer from "../data/DataConsumer";

const PieChart = (props) => {
    const {data, legends, colors, height} = props
    const options = buildPieOptions(data, true)
    return <HalfPie height={height} legends={legends} colors={colors} options={options}
                    format={{style: "percent"}}></HalfPie>
}

const Diverging = (props) => {
    const {data, legends, colors, height} = props
    const options = buildDivergingOptions(data, true)
    return <Diverging height={height} legends={legends} colors={colors} options={options}
                      format={{style: "percent", currency: "EUR"}}></Diverging>
}


const Chart = (props) => {
    const {filters} = props
    const {
        parent,
        editing = false,
        unique,
        childContent,
        "data-app": app = "prevalence",
        "data-height": height = 500,
        "data-chart-type": type = 'bar',
        'data-source': source = 'gender/smoke',
        'data-color-by': colorBy = 'index',
        'data-color-scheme': scheme = 'nivo',
        'data-group-mode': groupMode = 'grouped',
        'data-legends-left': left = 'Left Legend',
        'data-legends-bottom': bottom = 'Bottom Legend',
        'data-dualmode': dualMode,

        'data-legend-position': legendPosition = "right",
        'data-show-legends': showLegends = "true",

        'data-chart-source-label': dataSourceLabel = "Source",
        'data-chart-data-source': dataSource = "Data Source",

        'data-toggle-info-label': toggleInfoLabel = "Info Graphic",
        'data-toggle-chart-label': toggleChartLabel = "Chart",
        'data-params': params = '{}',
        'data-number-format': format = '{"style":"percent", "minimumFractionDigits": 1, "maximumFractionDigits": 1}',
        'data-tick-rotation': tickRotation = 0,
        'data-tick-color': tickColor = "rgb(92,93,99)",
        'data-keys': keys = null,
        'data-style': style = "decimal",
        "data-decimals": decimals = "2",
        'data-currency': currency = ""

    } = props


    const ref = useRef(null);

    function filter(node) {

        if (node.classList) {
            return !node.classList.contains("ignore")
        }
        return true;
    }


    const numberFormat = {style, minimumFractionDigits: parseInt(decimals), maximumFractionDigits: parseInt(decimals)}

    if (currency != "") {
        numberFormat["currency"] = currency
    }
    const itemWidth = props["data-legends-width"] ? parseInt(props["data-legends-width"]) : 180
    const [mode, setMode] = useState(editing ? "chart" : 'info')

    const legends = {
        left: left,
        bottom: bottom
    }
    const colors = {
        scheme: scheme,
        colorBy: colorBy
    }
    let child = null

    const contentHeight = (editing ? height - 120 : height - 40)

    const chartProps = {
        tickColor: decodeURIComponent(tickColor),
        tickRotation: tickRotation,
        showLegends: showLegends == "true",
        itemWidth: itemWidth,
        height: `${contentHeight}px`,
        legendPosition: legendPosition,
        legends: legends,
        colors: colors,
        groupMode: groupMode,
        format: numberFormat
    }


    if (type === 'bar') {
        const DataFrame = app == "policy" ? PolicyDataFrame : PrevalenceBarDataframe

        child = <DataFrame type={"bar"} includeTotal={true} keys={keys ? keys.split(',') : []}>
            <Bar {...chartProps}></Bar>
        </DataFrame>
    }
    if (type === 'line') {
        if (app === "policy") {

            child = <PolicyDataFrame type={"line"} keys={keys ? keys.split(',') : []}>
                <Line {...chartProps}></Line>
            </PolicyDataFrame>
        } else {
            child = <Segment color={"red"}>Chart type not supported yet</Segment>

        }
    }

    if (type == 'halfPie') {
        child =
            <PieChart {...chartProps}></PieChart>
    }
    if (type == 'diverging1') {
        child = <h1>Soon</h1>
    }
    const dual = (dualMode === 'true')


    return (<div ref={ref}>
            <Container className={"chart container"} style={{"minHeight": height + 'px'}} fluid={true}>

                <DataProvider params={JSON.parse(decodeURIComponent(params))} app={app}
                              store={[unique, ...source.split("/")]} source={source}>

                    {(!dual || (mode == 'chart')) && (
                        <Container style={{"height": `${contentHeight}px`}} className={"body"}
                                   fluid={true}>
                            <DataConsumer>
                                {child}
                            </DataConsumer>
                        </Container>)
                    }
                </DataProvider>

                {dual && childContent && mode == 'info' &&
                <Container fluid={true} style={{"height": contentHeight + 'px'}} className={"body"}>
                    <PostContent post={{content: {rendered: childContent}}}></PostContent>
                </Container>}

                {!editing && <Grid columns={2} className={"footnote"}>

                    <Grid.Column>
                        {dual &&
                        <p className={"ignore"}>
                            <Button className={(mode === 'info') ? "active" : ""}
                                    onClick={e => setMode('info')}>{toggleInfoLabel}</Button>
                            |
                            <Button className={(mode === 'chart') ? "active" : ""}
                                    onClick={e => setMode('chart')}>{toggleChartLabel}
                            </Button>
                        </p>
                        }
                    </Grid.Column>

                    <Grid.Column textAlign={"right"}>
                        <p>{dataSourceLabel} : {dataSource}</p>
                    </Grid.Column>
                </Grid>}
            </Container>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(Chart)
