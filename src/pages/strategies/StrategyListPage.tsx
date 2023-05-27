import { FC } from "react";
import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
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

interface Props {
    name: string;
}

const StrategyListPage: FC<Props> = ({ name }) => {
    return (
        <IonPage>
            {/* <IonLoading isOpen={isLoading} message={"Loading..."} /> */}
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
                            <IonList>
                                <IonItem lines="full" detail>
                                    <IonLabel>Swing trade strategy based on COT report</IonLabel>
                                </IonItem>
                                <IonItem lines="full" detail>
                                    <IonLabel>One trade a day strategy</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                        <IonCol class="ion-hide-lg-down"></IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default StrategyListPage;
