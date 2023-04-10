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
import numbro from "numbro";

import { CotModel } from "../helper/models";
import { fetcher } from "../helper/fetcher";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const { data: cotData, data: cotError } = useSWR<CotModel[]>(
    "http://localhost:8080/api/report/cot",
    fetcher
  );

  return (
    <div
      className="p-5"
      style={{
        width: "75%",
      }}
    >
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
            x: {
              stacked: true,
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              grid: {
                display: false,
              },
            },
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
              backgroundColor: "#0EA293",
            },
            {
              label: "Shorts",
              data: cotData?.map((x) => {
                return (x.totalShort / (x.totalLong + x.totalShort)) * 100;
              }),
              backgroundColor: "#ED2B2A",
            },
          ],
        }}
      />
    </div>
  );
}
