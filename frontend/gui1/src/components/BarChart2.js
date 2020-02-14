import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {

componentDidMount(){
      this.drawchart();
}

drawchart = () =>{
    var margin = {top: 50, right: 20, bottom: 70, left: 70},
    width = 400 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);
          
var svg = d3.select("#svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
  let data = this.props.chartData

  console.log()


    data.forEach(function(d) {
      d.percent = +d.percent;
    });
  var color = d3.scaleOrdinal(d3.schemeDark2);
  x.domain(data.map(function(d) { return d.sentiment; }));
  y.domain([0, 100]);

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .style("fill",function(d){return color(d.percent)})
      .attr("x", function(d) { return x(d.sentiment); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.percent); })
      .attr("height", function(d) { return height - y(d.percent); });
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 5)
      .attr("dx","20")
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)");
      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 10) + ")")
      .style("text-anchor", "middle")
      .style("font-size","16")
      .style("font-weight","bolder")
      .text("Emotion");
  svg.append("g")
      .call(d3.axisLeft(y).tickFormat(function(e){
        if(Math.floor(e) !== e)
        {
            return;
        }
        return e;
    }));
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size","16")
      .style("font-weight","bolder")
      .text("Percentage");      
}
    render() {
        return (
            <div id="barchart">
              <svg id="svg2"></svg>
            </div>
        )
    }
}

export default BarChart