import { IonButtons, IonContent, IonHeader, IonLabel, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import useSWR from "swr";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import numbro from "numbro";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { AppConfig, CotModel, fetcher } from "../../utils";
import CotChart from "../../components/cot/CotChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
    name: string;
}

const Cot: React.FC<Props> = ({ name }) => {
    const { data: cotData, data: cotError, isLoading } = useSWR<CotModel[]>(`${AppConfig.API_URL}/report/cot`, fetcher);

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
                <>
                    <IonLoading isOpen={isLoading} message={"Loading..."} />
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
                </>
            </IonContent>
        </IonPage>
    );
};

export default Cot;
