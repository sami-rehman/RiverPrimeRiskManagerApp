import React, { useEffect, useRef} from "react";
import * as echarts from "echarts";

const ROOT_PATH = "https://echarts.apache.org/examples";

const ConcentrationChart = ({windowSize}) => {
  const chartRef = useRef(null);
  // const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const chartDom = chartRef.current;
    let myChart;

    const initializeChart = () => {
      if (myChart) {
        myChart.dispose();
      }
      myChart = echarts.init(chartDom);

      const uploadedDataURL = `${ROOT_PATH}/data/asset/data/ec-option-doc-statistics-201604.json`;

      const fetchData = async () => {
        try {
          myChart.showLoading();

          const response = await fetch(uploadedDataURL);
          const rawData = await response.json();

          myChart.hideLoading();

          function convert(source, target, basePath) {
            for (let key in source) {
              let path = basePath ? `${basePath}.${key}` : key;
              if (!key.match(/^\$/)) {
                target.children = target.children || [];
                const child = {
                  name: path,
                };
                target.children.push(child);
                convert(source[key], child, path);
              }
            }
            if (!target.children) {
              target.value = source.$count || 1;
            } else {
              target.children.push({
                name: basePath,
                value: source.$count,
              });
            }
          }

          const data = {
            children: [],
          };

          convert(rawData, data, "");

          const option = {
            tooltip: {},
            series: [
              {
                name: "option",
                type: "treemap",
                visibleMin: 300,
                data: data.children,
                leafDepth: 1,
                levels: [
                  {
                    itemStyle: {
                      borderColor: "#555",
                      borderWidth: 4,
                      gapWidth: 4,
                    },
                  },
                  {
                    colorSaturation: [0.3, 0.6],
                    itemStyle: {
                      borderColorSaturation: 0.7,
                      gapWidth: 2,
                      borderWidth: 2,
                    },
                  },
                  {
                    colorSaturation: [0.3, 0.5],
                    itemStyle: {
                      borderColorSaturation: 0.6,
                      gapWidth: 1,
                    },
                  },
                  {
                    colorSaturation: [0.3, 0.5],
                  },
                ],
              },
            ],
          };

          myChart.setOption(option);
          myChart.resize();
        } catch (error) {
          console.error("Error fetching or processing data:", error);
        }
      };

      fetchData();
    };

    initializeChart();

    const handleResize = () => {
      // setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      myChart && myChart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      myChart && myChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <div
      ref={chartRef}
      className="h-full w-full"
    />
  );
};

export default ConcentrationChart;
