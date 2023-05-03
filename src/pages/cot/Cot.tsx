import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLoading,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonViewDidLeave,
} from "@ionic/react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { AppConfig, CotModel, useCancellableSWR } from "../../utils";
import CotChart from "../../components/cot/CotChart";
import CotTable from "../../components/cot/CotTable";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    name: string;
}

const Cot: React.FC<Props> = ({ name }) => {
    const [{ data: cotData, isLoading }, cancelFn] = useCancellableSWR<CotModel[]>(() => `${AppConfig.API_URL}/report/cot`, {
        shouldRetryOnError: false,
    });

    useIonViewDidLeave(() => {
        if (cancelFn) {
            cancelFn.abort();
        }
    });

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
                            {!!cotData && cotData.length > 0 && (
                                <CotChart
                                    labels={cotData.map((x) => x.code) || []}
                                    plotData={[
                                        {
                                            label: "Longs",
                                            data: cotData.map((x) => {
                                                return (x.totalLong / (x.totalLong + x.totalShort)) * 100;
                                            }),
                                            backgroundColor: "#0EA293",
                                            datalabels: {
                                                color: "white",
                                            },
                                        },
                                        {
                                            label: "Shorts",
                                            data: cotData.map((x) => {
                                                return (x.totalShort / (x.totalLong + x.totalShort)) * 100;
                                            }),
                                            backgroundColor: "#B6354A",
                                            datalabels: {
                                                color: "white",
                                            },
                                        },
                                    ]}
                                />
                            )}

                            {!!cotData && (
                                <IonItem>
                                    <CotTable data={cotData} />
                                </IonItem>
                            )}
                        </IonCol>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Cot;
