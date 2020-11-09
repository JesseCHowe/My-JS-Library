import React, { Component } from "react";
import * as d3 from "d3";

class BookProgress extends Component {
  updateChart() {
    const svg = d3.select("#bookProg");
    const g = svg.append("svg");
    const width = 500,
      height = 500,
      twoPi = 2 * Math.PI;

    const arc = d3.arc().startAngle(0).innerRadius(180).outerRadius(250);

    g.attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + 250 + "," + 250 + ")");

    const meter = g
      .append("g")
      .attr("class", "progress-meter")
      .attr("transform", "translate(" + 250 + "," + 250 + ")");

    meter
      .append("text")
      .text(`${(this.props.pct * 100).toFixed(0)}%`)
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("fill", `#333`)
      .attr("y", 20)
      .style("font-size", "60px");
    meter
      .append("path")
      .attr("class", "background")
      .attr("d", arc.endAngle(twoPi));

    const foreground = meter
      .append("path")
      .attr("class", "foreground")
      .style("fill", `var(--highlight-${this.props.color})`);

    foreground.attr("d", arc.endAngle(twoPi * 0));

    foreground
      .transition()
      .duration(1500)
      .attrTween("d", () => arcTween(this.props.pct));

    function arcTween(pct) {
      const i = d3.interpolate(0, twoPi * pct);
      return function (t) {
        return arc.endAngle(i(t))();
      };
    }
  }
  
  componentDidMount() {
    this.updateChart();
  }

  render() {
    return (
      <svg
        id="bookProg"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    );
  }
}

export default BookProgress;
