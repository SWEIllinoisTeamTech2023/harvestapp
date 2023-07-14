import React, { useEffect } from "react";
import * as d3 from "d3";

const Piechart = () => {
  //   const data = [
  //     { name: 4000, value: 4000 },
  //     { name: 8000, value: 8000 },
  //     { name: 30000, value: 30000 },
  //     { name: 93840, value: 93840 },
  //     { name: 19420, value: 19420 },
  //     { name: 24472, value: 24472 },
  //   ];

  const data = [
    { name: 100, value: 100 },
    { name: 8000, value: 200 },
    { name: 30000, value: 300 },
    { name: 93840, value: 400 },
    { name: 19420, value: 500 },
    { name: 24472, value: 600 },
  ];

  useEffect(() => {
    createChart();
  });

  function createChart() {
    console.log("in chreat");
    // Specify the chart’s dimensions.
    const width = 500;
    const height = Math.min(width, 500);

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    // Create the pie layout and arc generator.
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // Create the SVG container.
    const svg = d3
      .create("pie")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Add a sector path for each value.
    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString("en-us")}`);

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => d.data.value.toLocaleString("en-us"))
      );

    // return svg.node();
  }

  return <div id="pie" />;
};

export default Piechart;
