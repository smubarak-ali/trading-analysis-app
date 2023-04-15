import {
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    SelectChangeEventDetail,
} from "@ionic/react";
import useSWR from "swr";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import numbro from "numbro";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { AppConfig, CotModel, fetcher, SentimentModel, SentimentResponseModel, symbols } from "../../utils";
import { useCallback, useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    name: string;
}

interface Props {
    name: string;
}

const searchDdl = ["USD", "AUD", "CAD", "CHF", "EUR", "JPY", "GBP", "NZD"];

const Sentiment: React.FC<Props> = ({ name }) => {
    const [filteredList, setFilteredList] = useState<SentimentModel[]>([]);
    const [searchFilterList, setSearchFilterList] = useState<SentimentModel[]>([]);
    const [selected, setSelected] = useState(searchDdl[0]);

    const { data: sentimentData } = useSWR<SentimentResponseModel>(`${AppConfig.API_URL}/report/sentiment`, fetcher);

    const updateSearchFilterList = useCallback((list: SentimentModel[]) => {
        setSearchFilterList(list);
    }, []);

    useEffect(() => {
        if (!!sentimentData && sentimentData.symbols.length > 0) {
            console.log(" COT useEffect called.... ");
            const list: SentimentModel[] = [];
            for (const symb of sentimentData.symbols) {
                if (symbols.includes(symb.name)) {
                    list.push(symb);
                }
            }
            setFilteredList(list);

            const filteredList: SentimentModel[] = [];
            list.forEach((x) => {
                if (x.name.match(searchDdl[0])) {
                    filteredList.push(x);
                }
            });
            updateSearchFilterList(filteredList);
        }
    }, [sentimentData, updateSearchFilterList]);

    const searchCurrencyChanged = (name: string) => {
        setSelected(name);
        const list: SentimentModel[] = [];
        filteredList.forEach((x) => {
            if (x.name.match(name)) {
                list.push(x);
            }
        });
        setSearchFilterList(list);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen={true}>
                <IonSelect
                    className="ion-padding"
                    justify="space-between"
                    label="Select instrument"
                    placeholder="Select Instrument"
                    value={selected}
                    onIonChange={(e) => searchCurrencyChanged(e.target.value)}
                >
                    {searchDdl.map((x) => (
                        <IonSelectOption key={x} value={x}>
                            {x}
                        </IonSelectOption>
                    ))}
                </IonSelect>

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
                        labels: searchFilterList.map((x) => x.name),
                        datasets: [
                            {
                                label: "Longs",
                                data: searchFilterList?.map((x) => {
                                    return x.longPercentage;
                                }),
                                backgroundColor: "#0EA293",
                            },
                            {
                                label: "Shorts",
                                data: searchFilterList?.map((x) => {
                                    return x.shortPercentage;
                                }),
                                backgroundColor: "#B6354A",
                            },
                        ],
                    }}
                    style={{
                        padding: 10,
                    }}
                />
            </IonContent>
        </IonPage>
    );
};

export default Sentiment;
