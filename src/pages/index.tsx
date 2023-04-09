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

import { CotResponseModel } from "../helper/models";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

interface cotData {}

export default function Home() {
  const { data: cotData, data: cotError } = useSWR<CotResponseModel[]>(
    "http://localhost:8080/api/report/cot",
    fetcher
  );

  // useEffect(() => {
  //   if (!!cotData) {

  //   }
  // }, [cotData]);

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
          // labels: cotData?.filter((x) => x.key),
          labels: ["XAU", "JPY"],
          datasets: [
            {
              data: [85, 0],
              backgroundColor: "blue",
            },
            {
              data: [13, 30],
              backgroundColor: "red",
              // stack: "Stack 0",
            },
          ],
        }}
      />
      COT Report
    </div>
  );
}
