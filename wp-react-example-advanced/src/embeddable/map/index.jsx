import {FormattedMessage, injectIntl, IntlProvider} from 'react-intl'
import * as d3 from 'd3' // d3 plugin
import * as topojson from 'topojson'
import {Icon, Popup} from 'semantic-ui-react'
import React from 'react'
import {renderToString} from 'react-dom/server'

import './map.scss'

import messages_en from "../../translations/en.json";

const messages_locales = {
    'en': messages_en
};


class Map extends React.Component {

    constructor(props) {
        super(props)

        this.state = {topology: null}

        this.classColor = this.classColor.bind(this)
        this.setColors = this.setColors.bind(this)

        this.onFeatureClick = this.onFeatureClick.bind(this)
        this.featuresZoom = this.featuresZoom.bind(this)
        this.regionView = this.regionView.bind(this)
        this.fullView = this.fullView.bind(this)

        this.onZoomIn = this.onZoomIn.bind(this)
        this.onZoomOut = this.onZoomOut.bind(this)
        this.onReset = this.onReset.bind(this)

        this.onClick = this.onClick.bind(this)
        this.mouseover = this.mouseover.bind(this)
        this.mousemove = this.mousemove.bind(this)
        this.mouseout = this.mouseout.bind(this)

        this.showDetail = this.showDetail.bind(this)
        this.createTooltipContent = this.createTooltipContent.bind(this)
        this.hideDetail = this.hideDetail.bind(this)
        this.updateFeatures = this.updateFeatures.bind(this)
        this.handler = this.handler.bind(this)
        this.d3Map = this.d3Map.bind(this)
        this.getFeatures = this.getFeatures.bind(this)
        this.boundingExtent = this.boundingExtent.bind(this)
        this.getFeatureByCountryId = this.getFeatureByCountryId.bind(this)
        this.getCountryByFeature = this.getCountryByFeature.bind(this)

        this.createTitle = this.createTitle.bind(this)
        this.createLabels = this.createLabels.bind(this)
        //map variables
        this.width = 960
        this.height = 600
        this.zooming = false
        this.projection = d3.geoMercator().scale(2000).center(props.center)  // centers map at given coordinates
            .translate([this.width / 2, this.height / 2])
        this.path = d3.geoPath().projection(this.projection)
        this.zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", this.zoomed)

        this.centered = null
        this.onresize = this.onresize.bind(this)


    }

    boundingExtent(features) {
        var x0, x1, y0, y1;
        for (var x in features) {
            const [
                [xx0, yy0],
                [xx1, yy1]
            ] = this.path.bounds(features[x]);
            if (xx0 < x0 || x0 == null) {
                x0 = xx0
            }

            if (xx1 > x1 || x1 == null) {
                x1 = xx1
            }

            if (yy0 < y0 || y0 == null) {
                y0 = yy0
            }

            if (yy1 > y1 || y1 == null) {
                y1 = yy1
            }

        }
        return [
            [x0, y0],
            [x1, y1]
        ];
    }

    onReset() {
        this.fullView()
    }

    zoomed() {
        const group = d3.select('.map.wrapper').select('svg').select("g")
        group.attr("transform", d3.event.transform)
        group.select(".nation").style("stroke-width", 0.5 / d3.event.scale + "px")
        group.select(".state-border").style("stroke-width", 0.5 / d3.event.scale + "px")
        group.select(".country-border").style("stroke-width", 0.1 / d3.event.scale + "px")
    }

    classColor(d) {
        const {measure, data} = this.props
        return 'active'
    }

    setValues() {
        const features = this.getFeatures()
        const group = d3.select('.map.wrapper').select('svg').select("g")
        group.selectAll("path").data(features)
            .join('path')
            .attr("d", this.path)
        this.createLabels(features)
    }

    updateFeatures(features) {
        const colorScale = this.colorScale
        const cssScale = this.cssScale

        const group = d3.select('.map.wrapper').select('svg').select("g")
        group.selectAll("path").data(features)
            .join('path')
            .attr("d", this.path)
            .attr("fill", (f) => colorScale(f.properties.value))
            .attr("class", (f) => cssScale(f.properties.value) + ' active')
    }

    setColors() {
    }

    getCountryByFeature(d) {
        const {data} = this.props;
        const items = data.filter(f => d.properties.adm0_a3 == f.country.code || d.properties.iso_a3 == f.country.code)
        if (items.length > 0) {
            return items[0]
        }
        return null;
    }

    getFeatureByCountryId(id) {
        const svg = d3.select('.map.wrapper').select('svg')
        const paths = svg.select("g").selectAll(".active")
        const d = paths.data().filter(d => d.properties ? d.properties.country.id === id : false)[0]
        return d
    }

    regionView(r, center) {
        const svg = d3.select('.map.wrapper').select('svg')
        const g = svg.select("g")
        const paths = svg.select("g").selectAll(".active")
        //send to background countries that doesn't belong to this region
        this.toBackGround(paths.filter(d => d.properties.country.parent.id != r))
        //send to foreground countries that belong to this region
        this.toForeGround(paths.filter(d => d.properties.country.parent.id == r))
        //create labels just in case they aren't
        this.createLabels(paths.filter(d => d.properties.country.parent.id == r).data())
        //zoom in
        if (center !== false) {
            this.featuresZoom(paths.data().filter(d => d.properties.country.parent.id == r))
        }

    }

    featuresZoom(fs, inmediate, callback) {
        const svg = d3.select('.map.wrapper').select('svg')
        const g = svg.select("g")
        const paths = svg.select("g").selectAll(".active")
        var bounds = this.boundingExtent(fs);
        const [
            [x0, y0],
            [x1, y1]
        ] = bounds;

        if (inmediate) {
            svg.call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.width / 2, this.height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2));
        } else {

            svg.transition().on("end", callback).duration(450).call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.width / 2, this.height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2));
        }
    }

    fullView() {
        const {onResetEnd} = this.props
        this.centered = null
        this.zooming = false
        const svg = d3.select('.map.wrapper').select('svg')
        const paths = svg.select("g").selectAll(".active")
        this.createLabels(paths.data())
        paths.attr("class", (d1, b, c) => {
            const p = d3.select(c[b])
            return p.attr("class").replace(/background/gi, "")
        })
        svg.transition()
            .duration(300)
            .on('end', () => onResetEnd)
            .call(this.zoom.transform, d3.zoomIdentity
                .translate(this.width / 2, this.height / 2)
                .scale(1)
                .translate((this.width / 2) * -1, (this.height / 2) * -1))
    }

    mouseover(d) {
        const svg = d3.select('.map.wrapper').select('svg')
        const elements = svg.select("g").selectAll(".active")
        const {intl} = this.props;
        elements.attr("class", p => {
            if (p.properties.adm1_code === d.properties.adm1_code) {
                return 'focus'
            } else {
                return 'active'
            }
        })


        //d3.select(d).attr("fill","#000")
        this.tooltip.attr("class", "tooltip")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("visibility", "visible")
            .html((e) => {
                return `
              <div class="header">${d.properties.name} <span  class="value">${intl.formatNumber(d.properties.value / 100, {style: 'percent'})}</span></div>
              <div class="footer">The Confidence Interval<br><span class="confidence"> ${d.properties.level}</span></div>
              `;
            })


    }

    mousemove(d) {
        this.tooltip.style("top", (d3.event.pageY) + "px").style("left", (d3.event.pageX + 5) + "px");
    }

    mouseout(d) {
        const svg = d3.select('.map.wrapper').select('svg')
        const paths = svg.select("g").selectAll(".focus")
        paths.attr("class", "active")
        this.tooltip.style("visibility", "hidden")
    }

    onClick(d) {
        if (d.properties) {
            this.onFeatureClick(d)
            this.tooltip.style("visibility", "visible")
            this.tooltip.style("top", (d3.event.pageY) + "px").style("left", (d3.event.pageX + 5) + "px");


        }
        d3.event.stopPropagation()
        d3.event.preventDefault()
    }

    toBackGround(paths) {
        paths.attr("class", (d1, b, c) => {
            const p = d3.select(c[b])
            return p.attr('class') + " background"
        })
    }

    toForeGround(paths) {
        paths.attr("class", (d1, b, c) => {
            const p = d3.select(c[b])
            return p.attr("class").replace(/background/gi, "")
        })
    }

    onFeatureClick(d, inmediate) {
        let flag
        const svg = d3.select('.map.wrapper').select('svg')
        const paths = svg.select("g").selectAll(".active")
        const circles = svg.select("g").selectAll("circle")
        const labels = svg.select("g").selectAll(".label")

        if (d && (this.centered == null || this.centered.properties.adm1_code_ !== d.properties.adm1_code_)) {
            paths.attr("class", (d1, b, c) => {
                const p = d3.select(c[b])
                if (d1.properties.adm1_code_ != d.properties.adm1_code_) {
                    return p.attr("class").replace(/focus/gi, "") + " background"
                } else {
                    return p.attr("class").replace(/background/gi, "") + " focus"
                }
            })

            circles.attr("class", (d1, b, c) => {
                const p = d3.select(c[b])
                if (d1.properties.adm1_code_ != d.properties.adm1_code_) {
                    return p.attr("class").replace(/focus/gi, "") + " background"
                } else {
                    return p.attr("class").replace(/background/gi, "") + " focus"
                }
            })

            labels.attr("class", (d1, b, c) => {
                const p = d3.select(c[b])
                if (d1.properties.adm1_code_ != d.properties.adm1_code_) {
                    return p.attr("class").replace(/focus/gi, "") + " background"
                } else {
                    return p.attr("class").replace(/background/gi, "") + " focus"
                }
            })

            this.centered = d

            this.zooming = true
            this.hideDetail()
        } else {
            paths.attr("class", (d1, b, c) => d3.select(c[b]).attr("class").replace(/background/gi, "").replace(/focus/gi, ""))
            this.centered = null
            this.createLabels(paths.data())
            this.fullView()
        }
    }

    onZoomIn(e) {
        const svg = d3.select('.map.wrapper').select('svg')
        svg.transition().call(this.zoom.scaleBy, 2)
    }

    onZoomOut() {
        const svg = d3.select('.map.wrapper').select('svg')
        svg.transition().call(this.zoom.scaleBy, 0.5)
    }

    showDetail(event, d) {
        if (d) {
            if (d3.select(d).classed("active") || d3.select(d).classed("label") && !this.zooming) {

                d3.selectAll(".tooltip").remove()

                this.tooltip = d3.select("body")
                    .append("div")
                    .style("position", "absolute")
                    .style("z-index", "10").style("visibility", "hidden")
                    .attr("class", "tooltip")

                // show tooltip with information from the __data__ property of the element
                let x_hover = 0;
                let y_hover = 0;
                let tooltipWidth = parseInt(this.tooltip.style('width'));
                let classed, notClassed;

                if (event.pageX > document.body.clientWidth / 2) {
                    x_hover = tooltipWidth + 30;
                    classed = 'right';
                    notClassed = 'left';
                } else {
                    x_hover = -30;
                    classed = 'left';
                    notClassed = 'right';
                }


                this.tooltip
                    .classed(classed, true)
                    .classed(notClassed, false)
                    .style("visibility", "visible")
                    .style("left", (event.pageX - x_hover) + "px")
                    .html(renderToString(this.createTooltipContent(d3.select(d).data()[0])));

                let tooltipHeight = parseInt(this.tooltip.style('height'));
                y_hover = event.pageY - tooltipHeight / 2;
                this.tooltip
                    .style("top", y_hover + "px")
            } else {
                this.hideDetail()
            }
        }
    }

    hideDetail() {
        if (this.tooltip) {
            this.tooltip.style("visibility", "hidden");
        }
    }

    handler(e) {
        if (!this.props.country && !this.zooming) {
            if (e.target.nodeName == 'path') {
                this.showDetail(e, e.target)
            } else if (e.target.nodeName == 'text') {
                this.showDetail(e, e.target)
            } else {
                this.hideDetail()
            }
        } else {
            this.hideDetail()
        }

    }

    createTooltipContent(data) {

        try {
            const {intl, measure} = this.props;
            const {} = data.properties;
            return (
                <IntlProvider key="other-provider" locale={intl.locale} messages={intl.messages}>
                    <div>
                        POPUP
                    </div>
                </IntlProvider>
            )
        } catch (e) {

        }
    }

    componentDidMount() {
        const {source} = this.props
        d3.json(source).then((data) => {
            this.setState({'topology': data})
        })

        window.onresize = this.onresize
        this.tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
    }

    onresize() {
    }

    componentWillUnmount() {
        document.body.removeEventListener('mousemove', this.handler)
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {topology} = this.state
        const {
            measure,
            data,
            intl
        } = this.props

        if (topology && prevState.topology == null) {
            this.d3Map(this.getFeatures())

        }

        if (topology && data && measure && (data != prevProps.data || topology != prevState.topology)) {
            const values = data.map(d => d[measure])
            const domain = [d3.min(values), d3.max(values)]
            this.cssScale = d3.scaleQuantize().domain(domain).range(d3.range(9).map(function (i) {
                return "q" + i;
            }));
            this.colorScale = d3.scaleLinear()
                .domain(domain)
                .range(['#c7e3da'])
                .interpolate(d3.interpolateHcl)

            this.updateFeatures(this.getFeatures())
            this.createLabels(this.getFeatures())
        }


    }

    createTitle(feature) {
        const {intl, measure} = this.props
        var text = feature.properties.name
        var textLength = text.length;

        const svg = d3.select('.map.wrapper').select('svg')
        const group = svg.select(".level1")
        group.select('.label').remove();
        svg.selectAll("text").remove()
        svg.selectAll("rect").remove()


        var svgText = svg.append("text")
            .attr("x", 40)
            .attr("y", 54)
            .style("text-anchor", "start")
            .attr("class", "big label")
            .text(text)

        var bbox = svgText.node().getBBox();
        var rect = svg.append("rect")
            .attr("x", bbox.x)
            .attr("y", bbox.y)
            .attr("class", "country-map-label")
            .attr("width", bbox.width + 50)
            .attr("height", bbox.height)


        var svgText = svg.append("text")
            .attr("x", bbox.x + 25)
            .attr("y", 54)
            .style("text-anchor", "start")
            .attr("class", "country-map-label big label")
            .text("")
            .transition()
            .delay(100)
            .duration(300)
            .tween("text", function (d) {
                return function (t) {
                    this.textContent = text.substr(0, Math.round(t * textLength));
                };
            });

        var text2 = intl.formatNumber(feature.properties.value / 100, {style: 'percent'})
        var text2Length = text2.length;

        var svgTextNumber = svg.append("text")

        var svgTextNumber = svg.append("text")
        svgTextNumber
            .attr("class", "big numeric label")
            .text(text2).on("click", f => this.onClick(feature))

        var bbox = svgTextNumber.node().getBBox();
        svgTextNumber
            .attr("x", this.width / 2 - bbox.width / 2)
            .attr("y", this.height / 2 + bbox.height / 2).transition()
            .duration(450)
            .attr('opacity', 1)
    }

    createLabels(features) {

        const {intl} = this.props

        function getSize(d) {
            var bbox = this.getBBox(),
                cbbox = this.parentNode.getBBox(),
                scale = Math.min(cbbox.width / bbox.width, cbbox.height / bbox.height);
            d.scale = scale;
        }

        function fontSize(d) {
            const b = self.path.bounds(d)
            var space = b[1][0] - b[0][0];
            var length = this.getComputedTextLength()
            const size = (space / this.innerHTML.length) * 0.3;
            return size + "px"
        }

        const self = this
        const svg = d3.select('.map.wrapper').select('svg')
        svg.selectAll("text").remove()
        svg.selectAll("rect").remove()

        const group = svg.select(".level1")
        svg.select('.labels').remove();
        svg.select('.circles').remove();

        let circles = group.append("g").attr("class", "circles");
        let labels = group.append("g").attr("class", "labels");

        circles.selectAll(".circle")
            .data(features).enter()
            .append("circle")
            .attr("class", 'active')
            .attr("cx", d => this.path.centroid(d)[0])
            .attr("cy", d => this.path.centroid(d)[1])
            .attr("r", 30)
            .on('mouseover', f => this.mouseover(f))
            .on('mouseout', f => this.mouseout(f))
            .on('mousemove', f => this.mousemove(f))


        labels.selectAll("text").data(features)
            .enter()
            .append("svg:text")
            .attr("x", (d) => this.path.centroid(d)[0] + 2)
            .attr("y", (d) => this.path.centroid(d)[1] + 5)
            .attr("class", "label active")
            .attr('font-size', '18px')
            .attr("text-anchor", "middle")
            .append("tspan")
            .attr("class", "label")
            .text((d) => intl.formatNumber(d.properties.value / 100, {style: 'percent'}))
            .on('mouseover', f => this.mouseover(f))
            .on('mouseout', f => this.mouseout(f))
            .on('mousemove', f => this.mousemove(f))

    }

    getFeatures() {

        const {topology} = this.state
        const {field, data} = this.props
        const features = topojson.feature(topology, topology.objects[field]).features

        if (data) {
            const valuedFeatures = features.map((f) => {
                const val = data.find(d => d.name === f.properties.name);
                if (val) {
                    f.properties.value = val.value
                    f.properties.level = val.level
                } else {
                    console.log('no value for ' + f.properties.name)
                }
                return f;
            })
            return valuedFeatures
        } else {
            return features
        }
    }

    d3Map(features) {
        console.log("D3 map called")
        const {intl} = this.props

        const container = d3.select('.map.wrapper')
        container.selectAll("svg").remove()
        const indicatorClass = "has-blue-color"
        const svg = d3.select('.map.wrapper').append('svg')
        const group = svg.append("g").attr("class", "map root")
        group.attr("class", `map level1`) //set className from measure selected
        svg.attr("width", this.width)
        svg.attr("height", this.height)
        svg.call(this.zoom)
        svg.on("dblclick.zoom", null);


        const filteredFeatures = features.filter(d => d.properties != null);

        let countryPath = group.selectAll("path")
            .data(features)
            .enter()
            .append('path')
            .attr("id", d => d.properties.adm1_code_)
            .attr("d", this.path)
            .attr("fill", '#FFF')
            .attr("class", d => this.classColor(d))
            .on("mouseover", this.mouseover)
            .on("mousemove", this.mousemove)
            .on("mouseout", this.mouseout)
            .on("click", this.onClick)
        svg.attr('class', 'scaling-svg')
            .attr('preserveAspectRatio', 'xMinYMin')
            .attr('viewBox', [0, 0, this.width, this.height])
            .attr('width', null)
            .attr('height', null)


        //this.createLabels(filteredFeatures)


    }

    render() {
        const {
            onSelectCountry,
            shapes,
            intl
        } = this.props


        return (


            <div className="map component">
                <div class="map wrapper scaling-svg-container"/>
                <div className="control panel">
                    <div class="zoom plus" onClick={this.onZoomIn}><Icon name='plus' size='large'/></div>
                    <div class="zoom minus" onClick={this.onZoomOut}><Icon name='minus' size='large'/></div>
                    <Popup content={<FormattedMessage id="map.reset.tooltip" defaultMessage="Revert to country view"/>}
                           trigger={<div class="reset" onClick={this.onReset}>
                               <Icon name='repeat' size='large'/></div>}/>
                </div>
            </div>)
    }
}


export function Wrapper({intl}) {

    return <Map intl={intl} source='/za_admin1.json' field="admin1" center={[24, -28.5]} data={
        [{
            "name": "Western Cape",
            "value": 24.70,
            "level": "21.7 - 27.7"
        }, {
            "name": "Eastern Cape",
            "value": 24.90,
            "level": "20.3 - 29.5"

        }, {
            "name": "Northern Cape",
            "value": 37.90,
            "level": "33.7 - 42.1"
        }, {
            "name": "Free State",
            "value": 27.00,
            "level": "20.7 - 33.4"
        }, {
            "name": "KwaZulu-Natal",
            "value": 22.80,
            "level": "19.3 - 26.3"
        }, {
            "name": "North West",
            "value": 25.40,
            "level": "19.5 - 31.4"
        }, {
            "name": "Gauteng",
            "value": 29.10,
            "level": " 25.2 - 32.9"
        }, {
            "name": "Mpumalanga",
            "value": 27.50,
            "level": "21.5 - 33.5"
        }, {
            "name": "Limpopo",
            "value": 27.50,
            "level": "20.3 - 34.7"
        }]} measure="value"/>

}


export default injectIntl(Wrapper)
