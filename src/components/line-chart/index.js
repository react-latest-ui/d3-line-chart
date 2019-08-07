import React, { Component } from 'react';
import * as d3 from 'd3';
export default class LineChartComponent extends Component {
    state = {
        data: null,
        line: null,
        xAxis: null,
        yAxis: null
    }
    static defaultProps = {
        width: "100%",
        height: 400,
        margin: { top: 30, right: 20, bottom: 60, left: 50 }
    }
    constructor() {
        super();
    }
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        const data = [{
            "name": "Jon",
            "age": 30,
            "location": "The Wall"
        },
        {
            "name": "Arya",
            "age": 12,
            "location": "Braavos"
        },
        {
            "name": "Cersei",
            "age": 42,
            "location": "Kings Landing"
        },
        {
            "name": "Tyrion",
            "age": 40,
            "location": "Kings Landing "
        }];
        let { margin } = this.props;
        // create svg element
        const svg = d3.select(this.refs.svg);
        const element = svg.node();
        const elementRect = element.getBoundingClientRect();
        const width = elementRect.width;
        const height = elementRect.height;

        // Create the scale
        const x = d3.scaleBand().domain(data.map(d=>d.name)).range([0, width - margin.left - margin.right ]);

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},${height-margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", 20)
            .style("fill", "#69a3b2");
        // Add Y axis
        const y = d3.scaleLinear().domain([d3.min(data, d => d.age ), d3.max(data, d => d.age )]).range([ height - margin.bottom - margin.top, 0]);
        svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .call(d3.axisLeft(y));

            // define the line
        const valueline = d3.line().x(function(d) { return x(d.name); }).y(function(d) { return y(d.age); }).curve(d3.curveMonotoneX);
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("stroke", "steelblue")
            .attr("fill", "none")
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .attr("d", valueline);

    }
    render() {
        let { width, height } = this.props;
        return <svg width={width} height={height} ref='svg'></svg>
    }
}