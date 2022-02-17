import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef, useState } from "react";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default function ExtrinsicsHistory({ extrinsics }) {
  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    // title: {
    //   text: "ECharts Getting Started Example",
    // },
    tooltip: {},
    xAxis: {
      data: [
        "shirt",
        "cardigan",
        "chiffon",
        "pants",
        "heels",
        "socks",
        "shirt",
        "cardigan",
        "chiffon",
        "pants",
        "heels",
        "socks",
        "shirt",
        "cardigan",
        "chiffon",
        "pants",
        "heels",
        "socks",
        "shirt",
        "cardigan",
        "chiffon",
        "pants",
        "heels",
        "socks",
      ],
      show: false,
    },
    yAxis: { show: false },
    series: [
      {
        type: "bar",
        data: [
          5, 20, 36, 10, 10, 22, 5, 20, 36, 10, 10, 22, 5, 20, 36, 10, 10, 22,
          5, 20, 36, 10, 10, 22, 5, 20, 36, 10, 10, 22,
        ],
        barWidth: "75%",
        itemStyle: { borderRadius: 5 },
      },
    ],

    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 20,
    },
    color: "#A6A3FF",
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      entries.map(({ target }) => {
        const chartInstance = echarts.getInstanceByDom(target);
        if (chartInstance) {
          chartInstance.resize();
        }
      })
    );
    if (resizeObserver) resizeObserver.observe(chartRef.current);
    const chartInstance = echarts.getInstanceByDom(chartRef.current);
    if (chartInstance) {
      chartInstance.resize();
    } else {
      const chart = echarts.init(chartRef.current);
      chart.setOption(options);
    }
  }, [options]);

  /*
  if (extrinsics.length > 0) {
    const t = extrinsics[0][0].method.args.now;
    const bt = Number(t.replace(/,/g, ""));
    console.log(new Date(bt));
  }
  */

  return (
    <div className="bordered-content-box extrinsics-history">
      <h3 className="text-white">Extrinsics history</h3>
      <div>
        <span className="button tiny active">1H</span>
        <span className="button tiny">6H</span>
        <span className="button tiny">1D</span>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: "50%" }}></div>
    </div>
  );
}
