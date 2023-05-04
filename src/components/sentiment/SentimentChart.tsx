import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataset } from "chart.js";
import { Bar } from "react-chartjs-2";
import numbro from "numbro";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    labels: string[];
    plotData: ChartDataset<"bar", number[]>[];
}

const SentimentChart: React.FC<Props> = ({ labels, plotData }) => {
    return (
        <Bar
            options={{
                indexAxis: "y",
                plugins: {
                    title: { display: false },
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += numbro(context.parsed.x / 100).format({
                                        output: "percent",
                                        mantissa: 0,
                                    });
                                }
                                return label;
                            },
                        },
                    },
                    datalabels: {
                        color: "white",
                        formatter: function (value, context) {
                            return numbro(value / 100).format({
                                output: "percent",
                                mantissa: 0,
                            });
                        },
                        font: {
                            size: 11,
                            weight: "bold",
                        },
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false,
                        },
                        ticks: {
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
                        ticks: {
                            display: true,
                            font: {
                                weight: "bold",
                                size: 12,
                            },
                            color: "white",
                        },
                    },
                },
                responsive: true,
            }}
            data={{
                labels,
                datasets: plotData,
            }}
            style={{
                padding: 5,
            }}
        />
    );
};

export default SentimentChart;
