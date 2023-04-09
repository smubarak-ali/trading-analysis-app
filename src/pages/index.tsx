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
          },
          scales: {
            x: { stacked: true },
            y: { stacked: true, min: 0, max: 100 },
          },
        }}
        data={{
          labels: cotData?.map((x) => x.code),
          datasets: [
            {
              label: "Longs",
              data: cotData?.map((x) => {
                return x.percentOfLong;
              }),
              backgroundColor: "blue",
            },
            {
              label: "Shorts",
              data: cotData?.map((x) => {
                return x.percentOfShort;
              }),
              backgroundColor: "red",
            },
          ],
        }}
      />
      COT Report
    </div>
  );
}
