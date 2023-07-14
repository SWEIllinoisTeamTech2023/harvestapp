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

  function createChart2() {
    console.log("in chreat");
    // Specify the chart’s dimensions.
    const width = 500;
    const height = 500;

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
      .attr("style", "width: 100%; height: 100%; font: 10px sans-serif;");

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

  function createChart() {
    var data = [9, 20, 30, 8, 12];

    var width = 415;
    var height = 415;

    var svg = d3.select("pie"),
      //   width = svg.attr("width"),
      //   height = svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg
        .append("g")
        // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        .attr("transform", `translate(${width / 3.5}, ${height / 3.5})`);

    var color = d3.scaleOrdinal([
      "#4daf4a",
      "#377eb8",
      "#ff7f00",
      "#984ea3",
      "#e41a1c",
    ]);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc().innerRadius(0).outerRadius(radius);

    //Generate groups
    var arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return color(i);
      })
      .attr("d", arc);
  }

  return <div id="pie" />;
};

const Piechart2 = () => {
  const svgRef = React.useRef(null);
  useEffect(() => {
    draw();
  }, []);
  // set the dimensions and margins of the graph
  const width = 415,
    height = 415,
    margin = 40;
  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin;
  // set the color scale
  const color = d3
    .scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f"])
    .range(d3.schemeDark2);
  // create 2 data_set
  const data1 = { a: 9, b: 20, c: 30, d: 8, e: 12 };
  const svg = d3.select(svgRef.current);
  svg.attr("width", width).attr("height", height);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 3.5}, ${height / 3.5})`);

  // A function that create / update the plot for a given variable:
  const update = (data) => {
    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .value(function (d) {
        return d[1];
      })
      .sort(function (a, b) {
        return d3.ascending(a.key, b.key);
      }); // This make sure that group order remains the same in the pie chart
    const data_ready = pie(Object.entries(data));
    console.log(data_ready);

    // map to data
    const u = g.selectAll("path").data(data_ready);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u.join("path")
      .transition()
      .duration(1000)
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", function (d) {
        return color(d.data[0]);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1);

    u.exit().remove();
  };

  const draw = () => {
    // Initialize the plot with the first dataset
    update(data1);
  };

  return (
    <div>
      {/* <button onClick={() => update(data1)}>Data 1</button>
      <button onClick={() => update(data2)}>Data 2</button> */}
      <svg ref={svgRef} />
    </div>
  );
};

export default Piechart;
