import React, { Component } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  DatasetComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TooltipComponent,
  BarChart,
  CanvasRenderer,
  DatasetComponent,
  GridComponent,
]);

export default class Chart extends Component {
  render() {
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={{
          tooltip: {},
          xAxis: {
            type: "category",
            data: this.props.chartData.map(
              (c) =>
                `${new Date(c.timestamp)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ")} (+UTC)`
            ),
            show: false,
          },
          yAxis: {
            type: "value",
            show: false,
          },
          series: [
            {
              data: this.props.chartData.map((c) => c.total),
              type: "bar",
              barWidth: "75%",
              itemStyle: { borderRadius: 5 },
              tooltip: { valueFormatter: (value) => value + " times" },
            },
          ],
          grid: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 130,
          },
          color: "#A6A3FF",
        }}
        notMerge={true}
        lazyUpdate={true}
      />
    );
  }
}
