import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";
import numbro from "numbro";

import { CotModel } from "../../utils";

import "./CotTable.css";

interface Props {
    data: CotModel[];
}

const CotTable: React.FC<Props> = ({ data }) => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonLabel class="ion-label-wrap">Currency</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel class="ion-label-wrap">Total Long</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel class="ion-label-wrap">Total Short</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel class="ion-label-wrap">Change Long</IonLabel>
                </IonCol>
                <IonCol>
                    <IonLabel class="ion-label-wrap">Change Short</IonLabel>
                </IonCol>
            </IonRow>

            {data.map((x) => {
                return (
                    <IonRow key={x.code}>
                        <IonCol>
                            <IonLabel>{x.code}</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonLabel>{numbro(x.totalLong).format({ thousandSeparated: true })}</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonLabel>{numbro(x.totalShort).format({ thousandSeparated: true })}</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonLabel>{numbro(x.changeInLong).format({ thousandSeparated: true })}</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonLabel>{numbro(x.changeInShort).format({ thousandSeparated: true })}</IonLabel>
                        </IonCol>
                    </IonRow>
                );
            })}
        </IonGrid>
    );
};

export default CotTable;
