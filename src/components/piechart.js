import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { setRef } from "@mui/material";
import "../styles/simulate.css";

const Piechart = (props) => {
  const rawData = props.data[0];
  console.log("in piechart: ", rawData);
  const data = [
    { name: "Grain Loss", value: rawData[1].doubleValue },
    { name: "Labor Cost", value: rawData[2].doubleValue },
    { name: "Fuel Cost", value: rawData[3].doubleValue },
    { name: "Depreciation Cost", value: rawData[4].doubleValue },
  ];
  const totalCost = rawData[5].doubleValue;
  console.log("HERE IS DATA: ", data);

  const svgRef = React.useRef(null);
  useEffect(() => {
    createChart();
  });

  function createChart() {
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
        // "#5fed80",
        // "#023d10",
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
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    const arcs = pie(data);

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("transform", `translate(${width - 100}, ${height - 60})`)
      .attr("style", "width: 80%; height: 80%; font: 1px sans-serif;");

    // Add a sector path for each value.
    svg
      .append("g")
      .attr("stroke", "#FFF")
      .attr("stroke-width", "0.25px")
      .selectAll()
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.5);
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).attr("opacity", 1);
      })
      // Make div appear
      .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (event, d) {
        return tooltip
          .style("top", event.pageY + 30 + "px")
          .style("left", event.pageX + 20 + "px")
          .html(d.data.name + ": $" + d.data.value);
      })
      // Make div disappear
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });
  }

  return (
    <div style={{ width: "110%", height: "110%" }}>
      <h2 style={{ marginRight: "10%" }}> Total: ${totalCost}</h2>
      <svg ref={svgRef} />
    </div>
  );
};

export default Piechart;
