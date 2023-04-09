import useSWR from "swr";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { CotModel } from "../helper/models";
import { useEffect, useState } from "react";
import numbro from "numbro";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [chartData, setChartData] = useState<CotModel[]>([]);

  const { data: cotData, data: cotError } = useSWR<CotModel[]>(
    "http://localhost:8080/api/report/cot",
    fetcher
  );

  useEffect(() => {
    if (!!cotData) {
    }
  }, [cotData]);

  return (
    <div className="p-3">
      <Bar
        options={{
          plugins: {
            title: { display: false },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += numbro(context.parsed.y / 100).format({
                      output: "percent",
                      mantissa: 2,
                    });
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true, min: 0, max: 100 },
          },
          responsive: true,
        }}
        data={{
          labels: cotData?.map((x) => x.code),
          datasets: [
            {
              label: "Longs",
              data: cotData?.map((x) => {
                return (x.totalLong / (x.totalLong + x.totalShort)) * 100;
              }),
              backgroundColor: "#7DB9B6",
            },
            {
              label: "Shorts",
              data: cotData?.map((x) => {
                return (x.totalShort / (x.totalLong + x.totalShort)) * 100;
              }),
              backgroundColor: "#F15A59",
            },
          ],
        }}
      />
    </div>
  );
}
