import React from 'react'
import {Container} from 'semantic-ui-react'

import Background from './Background'
import Stomach from './Stomach'
import Liver from './Liver'
import Bounds from './Bounds'
import Blood from './Blood'
import Lungs from './Lungs'
import Head from './Head'
import Eyes from './Eyes'
import Brain from './Brain'
import Heart from './Heart'
import * as d3 from 'd3' // d3 plugin
import './body.scss'


class Body extends React.Component {


    constructor(props) {
        super(props);
        // No llames this.setState() aquí!
        this.state = {counter: 0};
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
    }

    onMouseOut() {
        d3.select('.body.parts').selectAll('g.system').transition().duration(0).delay(200).style('opacity', 1);
        d3.select('.body.parts').selectAll('circle').remove()
        d3.select('.body.parts').selectAll('line').remove()
    }


    onMouseOver(selector, source, target) {

        const root = d3.select('.body.parts')

        const element = root.select(selector)
        if (selector) {
            root.selectAll('g.system').transition().duration(200).style('opacity', 0);
            element.transition().style('opacity', 1);
        }
        var bbox = source.node().getBBox();

        let x1, y1, x2, y2;
        if (bbox.x < 100) {
            x1 = bbox.x + bbox.width + 10
            x2 = -40;
            y1 = bbox.y + (bbox.height / 2)
            y2 = bbox.y + (bbox.height / 2)

        } else {
            x1 = bbox.x - 10
            x2 = 140
            y1 = bbox.y + (bbox.height / 2);
            y2 = bbox.y + (bbox.height / 2)
        }


        root.select('svg')
            .append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x1)
            .attr('y2', y1)
            .transition()
            .duration(100)
            .attr('x2', x2)
            .attr('y2', y2)

        root.select('svg')
            .append('line')
            .attr('x1', x2)
            .attr('y1', bbox.y + (bbox.height / 2))
            .attr('x2', x2)
            .attr('y2', bbox.y + (bbox.height / 2))
            .transition()
            .duration(100)
            .delay(100)
            .attr('x2', target.tx)
            .attr('y2', target.ty)

        root.select('svg')
            .append('circle')
            .attr('r', 0)
            .attr('cx', target.tx)
            .attr('cy', target.ty)
            .attr('opacity', .6)
            .attr('fill', '#000').transition().delay(200).duration(30).attr('r', 6)


//  <line stroke="#000" x1="" y1="153.25657745748686" x2="-57.0522107618267" y2="110.24777579617485"/>

    }

    componentDidMount() {

        const left = [
            {label: 'Oropharynx cancer', selector: '.stomach', tx: 90, ty: 60},
            {label: 'Larynx cancer', selector: '.larynx', tx: 80, ty: 90},
            {label: 'Esophagus cancer', selector: '.stomach', tx: 77, ty: 95},
            {label: 'Trachea, bronchus and lung cancer', selector: '.larynx', tx: 80, ty: 120},
            {label: 'Acute myeloid leukemia', selector: '.blood', tx: 90, ty: 200},
            {label: 'Stomach cancer', selector: '.stomach', tx: 80, ty: 150},
            {label: 'Liver cancer', selector: '.stomach', tx: 80, ty: 150},
            {label: 'Pancreas cancer', selector: '.stomach', tx: 105, ty: 160},
            {label: 'Colorectal cancer', selector: '.stomach', tx: 85, ty: 250},
            {label: 'Kidney cancer', selector: '.stomach', tx: 65, ty: 185},
            {label: 'Bladder cancer', selector: '.stomach', tx: 65, ty: 185},
            {label: 'Cervix cancer (women only)', selector: '.stomach', tx: 90, ty: 220}]

        const right = [
            {label: 'Stroke', selector: '.brain', tx: 97, ty: 39},
            {label: 'Blindness, decreased eyesight', selector: '.eyes', tx: 97, ty: 39},
            {label: 'Periodontitis (gum disease)', selector: '.stomach', tx: 90, ty: 60},
            {label: 'Aortic aneurysm', selector: '.blood', tx: 90, ty: 120},
            {label: 'Heart disease', selector: '.heart', tx: 90, ty: 140},
            {label: 'Pneumonia', selector: '.lungs', tx: 85, ty: 130},
            {label: 'Atherosclerotic peripheral vascular disease', selector: '.blood', tx: 90, ty: 380},
            {label: 'Chronic obstructive pulmonary disease (COPD)', selector: '.lungs', tx: 85, ty: 130},
            {label: 'Tuberculosis', selector: '.lungs', tx: 85, ty: 130},
            {label: 'Asthma', selector: '.lungs', tx: 85, ty: 130},
            {label: 'Diabetes', selector: '.stomach', tx: 105, ty: 160},
            {label: 'Hip fractures', selector: '.bounds', tx: 90, ty: 230},
            {label: 'Rheumatoid arthritis', selector: '.bounds', tx: 134, ty: 275},
            {label: 'Immune function', selector: null, tx: 85, ty: 130},
            {label: 'Erectile dysfunction (men only)', selector: null, tx: 85, ty: 250},
            {label: 'Ectopic pregnancy (women only)', selector: null, tx: 85, ty: 250},
            {label: 'Reduced fertility (women only)', selector: null, tx: 85, ty: 250},


        ]
        let sy = 90;
        const root = d3.select('.body.parts')

        root.select('svg').selectAll('text.left')
            .data(left).enter().append("text")
            .attr('class', 'label')
            .attr('x', (d, i) => -250)
            .attr('y', (d, i) => {
                return sy + (i * 25)
            }).text(d => d.label);

        root.select('svg').selectAll('text.rigth')
            .data(right).enter().append("text")
            .attr('class', 'label')
            .attr('x', (d, i) => 200)
            .attr('y', (d, i) => {
                return sy + (i * 25)
            }).text(d => d.label)


        root.select('svg').selectAll('text.label')
            .on('mouseover', (d, i, s) => {
                this.onMouseOver(d.selector, d3.select(s[i]), d, {tx: d.tx, ty: d.ty})
            })
            .on('mouseout', (d, i, s) => {
                this.onMouseOut()
            })


    }

    render() {
        return (


            <Container className="body parts">
                <svg className="body root" viewBox="-300 0 800 500" xmlns="http://www.w3.org/2000/svg">
                    <Background className="backGround"/>
                    <Bounds className="system bounds"/>
                    <Head className="system head"/>

                    <Lungs className="system larynx"/>
                    <Lungs className="system lungs"/>
                    <Stomach className="system stomach"/>
                    <Liver className="system liver"/>
                    <Brain className="system brain"/>
                    <Eyes className="system eyes"/>
                    <Blood className="system blood"/>
                    <Heart className="system heart"/>
                    <text x="-250" y="60" className="title">Cancers</text>
                    <text x="200" y="60" className="title">Other conditions</text>

                </svg>


            </Container>
        )
    }
}

export default Body
