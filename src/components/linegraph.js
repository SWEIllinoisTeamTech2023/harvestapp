import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as d3Fetch from "d3-fetch";

const Linegraph = () => {
  const data = [
    { feedrate: 10, totalCost: 30, machineCost: 30, harvestLoss: 0.1 },
    { feedrate: 20, totalCost: 25, machineCost: 30, harvestLoss: 0.2 },
    { feedrate: 30, totalCost: 15, machineCost: 30, harvestLoss: 0.25 },
    { feedrate: 40, totalCost: 10, machineCost: 30, harvestLoss: 0.35 },
    { feedrate: 50, totalCost: 9, machineCost: 30, harvestLoss: 0.5 },
    { feedrate: 60, totalCost: 8, machineCost: 30, harvestLoss: 0.75 },
    { feedrate: 70, totalCost: 7, machineCost: 30, harvestLoss: 1 },
    { feedrate: 80, totalCost: 8, machineCost: 30, harvestLoss: 2 },
    { feedrate: 90, totalCost: 9, machineCost: 30, harvestLoss: 2.5 },
    { feedrate: 100, totalCost: 10, machineCost: 30, harvestLoss: 3.0 },
  ];

  const svgRef = React.useRef(null);
  useEffect(() => {
    createChart();
  });

  function createChart2() {
    var margin = { top: 20, right: 40, bottom: 30, left: 50 },
      width = 200,
      height = 100;

    // set the ranges
    var x = d3.scaleLinear().range([0, 110]);
    var y0 = d3.scaleLinear().range([0, height]);
    var y1 = d3.scaleLinear().range([height, 0]);

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
        return y1(d.harvestLoss);
      });

    const svg = d3
      .select(svgRef.current)
      .attr("width", width * 2)
      .attr("height", height * 2)
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
        return Math.max(d.harvestLoss);
      }),
    ]);

    // // Add the valueline path.
    svg.join("path").data([data]).attr("class", "line").attr("d", valueline);
    // svg.join("path").attr("class", "line").attr("d", valueline);

    // // Add the valueline2 path.
    // svg
    //   .join("path")
    //   .data([data])
    //   .attr("class", "line")
    //   .style("stroke", "red")
    //   .attr("d", valueline2);

    // // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // // Add the Y0 Axis
    svg
      .append("g")
      .attr("class", "green")
      .attr("transform", "translate( " + 0 + ", 0 )")
      .call(d3.axisLeft(y0));

    // // Add the Y1 Axis
    svg
      .append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1));
  }

  function createChart() {
    var margin = { top: 20, right: 40, bottom: 30, left: 40 },
      width = 980 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var x0 = d3.scaleLinear().range([0, width]);

    var y0 = d3.scaleLinear().range([height, 0]);
    var y1 = d3.scaleLinear().range([height, 0]);

    var color = d3.scaleOrdinal().range(["steelblue", "red"]);

    var xAxis = d3.axisBottom(x0).ticks(5);

    var yAxisLeft = d3.axisLeft(y0).ticks(6);

    var yAxisRight = d3.axisRight(y1).ticks(6);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x0.domain([
      0,
      d3.max(data, function (d) {
        return d.feedrate;
      }),
    ]);

    y0.domain([
      0,
      d3.max(data, function (d) {
        return d.totalCost;
      }),
    ]);
    y1.domain([
      0,
      d3.max(data, function (d) {
        return d.harvestLoss;
      }),
    ]);

    // Ticks on x-axis and y-axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y0 axis")
      .call(yAxisLeft)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#98abc5")
      .text("Total Cost");

    svg.select(".y0.axis").selectAll(".tick").style("fill", "#98abc5");

    svg
      .append("g")
      .attr("class", "y1 axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxisRight)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -16)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#d0743c")
      .text("Losses");

    svg.select(".y1.axis").selectAll(".tick").style("fill", "#d0743c");
    // End ticks

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x0(d.feedrate);
          })
          .y(function (d) {
            return y0(d.totalCost);
          })
      );

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x0(d.feedrate);
          })
          .y(function (d) {
            return y1(d.harvestLoss);
          })
      );

    // Legend
    var legend = svg
      .selectAll(".legend")
      .data(["Total Cost", "Harvest Loss"].slice())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend
      .append("rect")
      .attr("x", width - 48)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend
      .append("text")
      .attr("x", width - 54)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) {
        return d;
      });
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default Linegraph;
