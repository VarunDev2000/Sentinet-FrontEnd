import React from "react";
import * as d3 from "d3";

const Arc = ({ data, index, createArc, colors, format }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="laft"
      alignmentBaseline="middle"
      fill="black"
      fontSize="15"
      fontWeight="bold"
      fontFamily = "Comic Sans MS, Comic Sans, cursive"
    >
      {format(data.value) <= 0 ? ("") : (format(data.value)+"% ("+data.data.type[0]+")")}
    </text>
  </g>
);

const PieChart = props => {
  var margin = {top: 50, right: 20, bottom: 70, left: 70};
  const createPie = d3
    .pie()
    .value(d => d.percent)
    .sort(null)

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".0f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height} className="pie-svg">
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
            format={format}
          />
        ))}
      </g>
    </svg>
  );
};

export default PieChart;
