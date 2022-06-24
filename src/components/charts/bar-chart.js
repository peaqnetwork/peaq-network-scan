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
    const { hasInvert, chartData, dataProp } = this.props;
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={{
          tooltip: {},
          xAxis: {
            type: "category",
            data: chartData.map((c) => c.timestamp),
            show: false,
          },
          yAxis: {
            type: "value",
            show: false,
          },
          series: [
            {
              data: chartData.map((c) => c[dataProp.regular]),
              type: "bar",
              barWidth: "75%",
              itemStyle: { borderRadius: 5, color: "#A6A3FF" },
              tooltip: { valueFormatter: (value) => value + " tokens" },
              stack: "tx",
            },
            hasInvert
              ? {
                data: chartData.map((c) => -c[dataProp.invert]),
                type: "bar",
                barWidth: "75%",
                itemStyle: { borderRadius: 5, color: "#282C2F" },
                tooltip: { valueFormatter: (value) => -value + " items" },
                stack: "tx",
              }
              : null,
          ],
          grid: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 130,
          },
        }}
        notMerge={true}
        lazyUpdate={true}
      />
    );
  }
}
