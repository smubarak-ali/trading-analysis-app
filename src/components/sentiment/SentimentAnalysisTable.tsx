import React, { FC, useEffect, useState } from "react";
import { IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import numbro from "numbro";
import { arrowUp, arrowDown } from "ionicons/icons";

import { SentimentModel } from "../../utils";
import "./SentimentAnalysisTable.css";

interface Props {
    list: SentimentModel[];
}

const SentimentAnalysisTable: FC<Props> = ({ list }) => {
    const [data, setData] = useState<SentimentModel[]>([]);

    useEffect(() => {
        if (list.length > 0) {
            const longList = list.filter((x) => x.longPercentage > 64);
            const shortList = list.filter((x) => x.shortPercentage > 64);
            const combinedList = [...longList, ...shortList];
            setData(combinedList);
        }
    }, [list]);

    const getLabel = (x: SentimentModel) => {
        if (x.longPercentage >= 64) {
            return (
                <IonLabel>
                    Look for <span style={{ color: "red" }}>Short</span>
                </IonLabel>
            );
        } else if (x.shortPercentage >= 64) {
            return (
                <IonLabel>
                    Look for <span style={{ color: "green" }}>Long</span>
                </IonLabel>
            );
        } else {
            return <IonLabel>-</IonLabel>;
        }
    };

    const getArrow = (x: SentimentModel) => {
        if (x.longPercentage >= 64) {
            return <IonIcon icon={arrowDown} size="20" />;
        } else if (x.shortPercentage >= 64) {
            return <IonIcon icon={arrowUp} size="20" />;
        } else {
            return "";
        }
    };

    return (
        <IonGrid>
            {data.length > 0 && (
                <>
                    <IonRow>
                        <IonCol sizeMd="3" size="3">
                            <IonLabel class="ion-text-uppercase">Name</IonLabel>
                        </IonCol>
                        <IonCol sizeMd="2" size="2">
                            <IonLabel class="ion-text-uppercase">Short %</IonLabel>
                        </IonCol>
                        <IonCol sizeMd="2" size="2">
                            <IonLabel class="ion-text-uppercase">Long %</IonLabel>
                        </IonCol>
                        <IonCol sizeMd="5" size="5">
                            <IonLabel class="ion-text-uppercase">Contrarian Suggestion</IonLabel>
                        </IonCol>
                    </IonRow>
                    {data.map((x) => {
                        return (
                            <IonRow key={x.name}>
                                <IonCol sizeMd="3" size="3">
                                    <IonLabel>
                                        {x.name} {getArrow(x)}
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeMd="2" size="2">
                                    <IonLabel>{numbro(x.shortPercentage / 100).format({ output: "percent", mantissa: 0 })}</IonLabel>
                                </IonCol>
                                <IonCol sizeMd="2" size="2">
                                    <IonLabel>{numbro(x.longPercentage / 100).format({ output: "percent", mantissa: 0 })}</IonLabel>
                                </IonCol>
                                <IonCol sizeMd="5" size="5">
                                    {getLabel(x)}
                                </IonCol>
                            </IonRow>
                        );
                    })}
                </>
            )}
        </IonGrid>
    );
};

export default SentimentAnalysisTable;
