import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataset } from "chart.js";
import { Bar } from "react-chartjs-2";
import numbro from "numbro";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    labels: string[];
    plotData: ChartDataset<"bar", number[]>[];
    onBarClick: (dataItemIndex: number) => void;
}

const CotChart: React.FC<Props> = ({ labels, plotData, onBarClick }) => {
    return (
        <Bar
            options={{
                onClick: (evt, elements) => {
                    if (elements.length > 0) {
                        const itemIndex = elements[0].index;
                        // console.log("  itemIndex: ", itemIndex);
                        onBarClick(itemIndex);
                    }
                },
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
                    datalabels: {
                        color: "white",
                        formatter: function (value, context) {
                            return numbro(value / 100).format({
                                output: "percent",
                                mantissa: 0,
                            });
                        },
                        font: {
                            size: 10,
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
                            font: {
                                weight: "bold",
                            },
                            color: "white",
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
                            display: false,
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
                paddingBottom: 20,
            }}
        />
    );
};

export default CotChart;
