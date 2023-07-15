import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { setRef } from "@mui/material";

const Piechart = () => {
  const data = [
    { name: "Grain Dockage", value: 4000 },
    { name: "Grain Loss", value: 80000 },
    { name: "Fleet Labor", value: 30000 },
    { name: "Fleet Fuel and Lubrication", value: 93840 },
    { name: "Fleet Repair Cost", value: 19420 },
    { name: "Fleet Tax Insurance Housing", value: 24472 },
    { name: "Fleet Interest and Depreciation", value: 415760 },
  ];

  const svgRef = React.useRef(null);
  useEffect(() => {
    createChart();
  });

  function createChart() {
    console.log("in chreat");

    // Specify the chart’s dimensions.

    const width = 50;
    const height = 50;

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range([
        "#f5d858",
        "#f0cc2e",
        "#9cd95b",
        "#48800d",
        "#6b6e68",
        "#5fed80",
        " #023d10",
      ]);

    // Create the pie layout and arc generator.
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.75;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("transform", `translate(${width / 10}, ${height * 1.5})`)
      .attr("style", "width: 80%; height: 80%; font: 1px sans-serif;");

    // Add a sector path for each value.
    svg
      .append("g")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.25px")
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
  }

  return (
    <div style={{ width: "110%", height: "110%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default Piechart;
