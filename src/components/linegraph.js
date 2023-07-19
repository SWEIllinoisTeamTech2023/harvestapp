import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as d3Fetch from "d3-fetch";

const Linegraph = () => {
  const data = [
    { feedrate: 10, totalCost: 30, machineCost: 30 },
    { feedrate: 20, totalCost: 25, machineCost: 30 },
    { feedrate: 30, totalCost: 15, machineCost: 30 },
    { feedrate: 40, totalCost: 10, machineCost: 30 },
    { feedrate: 50, totalCost: 9, machineCost: 30 },
    { feedrate: 60, totalCost: 8, machineCost: 30 },
    { feedrate: 70, totalCost: 7, machineCost: 30 },
    { feedrate: 80, totalCost: 8, machineCost: 30 },
    { feedrate: 90, totalCost: 9, machineCost: 30 },
    { feedrate: 100, totalCost: 10, machineCost: 30 },
  ];

  const svgRef = React.useRef(null);
  useEffect(() => {
    createChart();
  });

  function createChart() {
    var margin = { top: 20, right: 40, bottom: 30, left: 50 },
      width = "100%",
      height = "100%";

    // set the ranges
    var x = d3.scaleLinear().range([0, 200]);
    var y0 = d3.scaleLinear().range([0, 200]);
    var y1 = d3.scaleLinear().range([0, 200]);

    // define the 1st line
    var valueline = d3
      .line()
      .x(function (d) {
        return x(d.feedrate);
      })
      .y(function (d) {
        return y0(d.totalCost);
      });

    // // define the 2nd line
    var valueline2 = d3
      .line()
      .x(function (d) {
        return x(d.feedrate);
      })
      .y(function (d) {
        return y1(d.machineCost);
      });

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + -100 + "," + 10 + ")");

    // // Scale the range of the data
    x.domain(
      d3.extent(data, function (d) {
        return d.feedrate;
      })
    );
    y0.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(d.totalCost);
      }),
    ]);
    y1.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(d.machineCost);
      }),
    ]);

    // // Add the valueline path.
    svg.join("path").data([data]).attr("class", "line").attr("d", valueline);
    // svg.join("path").attr("class", "line").attr("d", valueline);

    // // Add the valueline2 path.
    svg
      .join("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

    // // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // // Add the Y0 Axis
    svg
      .append("g")
      .attr("class", "axisSteelBlue")
      //   .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisLeft(y0));

    // // Add the Y1 Axis
    svg
      .append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1));
  }
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default Linegraph;
