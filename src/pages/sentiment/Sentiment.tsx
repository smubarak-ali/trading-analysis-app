import { useCallback, useEffect, useState } from "react";
import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonLabel,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    useIonViewDidLeave,
} from "@ionic/react";
import format from "date-fns/format";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { AppConfig, SentimentModel, SentimentResponseModel, symbols, useCancellableSWR } from "../../utils";
import SentimentChart from "../../components/sentiment/SentimentChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    name: string;
}

const searchDdl = ["USD", "AUD", "CAD", "CHF", "EUR", "JPY", "GBP", "NZD"];

const Sentiment: React.FC<Props> = ({ name }) => {
    const [filteredList, setFilteredList] = useState<SentimentModel[]>([]);
    const [searchFilterList, setSearchFilterList] = useState<SentimentModel[]>([]);
    const [selected, setSelected] = useState(searchDdl[0]);

    const [{ data: sentimentData, isLoading }, cancelFn] = useCancellableSWR<SentimentResponseModel>(() => `${AppConfig.API_URL}/report/sentiment`, {
        shouldRetryOnError: false,
    });

    const updateSearchFilterList = useCallback((list: SentimentModel[]) => {
        setSearchFilterList(list);
    }, []);

    useIonViewDidLeave(() => {
        if (cancelFn) {
            cancelFn.abort();
        }
    });

    useEffect(() => {
        if (!!sentimentData && sentimentData.symbols.length > 0) {
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
            <IonLoading isOpen={isLoading} message={"Loading..."} />
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen={true}>
                <IonGrid>
                    <IonRow>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                        <IonCol size-lg="8" size="12">
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
                        </IonCol>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                        <IonCol size-lg="8" size="12">
                            {!!searchFilterList && searchFilterList.length > 0 && (
                                <>
                                    <div style={{ padding: 8 }}>
                                        <label style={{ fontSize: 12 }}>Fetched at: </label>
                                        <label style={{ fontSize: 12, fontWeight: "bold" }}>
                                            {format(new Date(searchFilterList[0].recordDate), "dd-MM-yyyy hh:mm aaa")}
                                        </label>
                                    </div>

                                    <SentimentChart
                                        labels={searchFilterList.map((x) => x.name)}
                                        plotData={[
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
                                        ]}
                                    />
                                </>
                            )}
                        </IonCol>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Sentiment;
