import { FC } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonRow } from "@ionic/react";
import numbro from "numbro";

import { CotModel } from "../../utils";

interface Props {
    cot: CotModel;
}

const CotItemInfo: FC<Props> = ({ cot }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{cot.code}</IonCardTitle>
                <IonCardSubtitle>{cot.instrument}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Total Long
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.totalLong).format({ thousandSeparated: true })}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Total Short
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.totalShort).format({ thousandSeparated: true })}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Change Long
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.changeInLong).format({ thousandSeparated: true })}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Change Short
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.changeInShort).format({ thousandSeparated: true })}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Total Long %
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.totalLong / (cot.totalLong + cot.totalShort)).format({ mantissa: 2, output: "percent" })}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol sizeMd="4" size="6">
                        Total Short %
                    </IonCol>
                    <IonCol sizeMd="8" size="6">
                        {numbro(cot.totalShort / (cot.totalLong + cot.totalShort)).format({ mantissa: 2, output: "percent" })}
                    </IonCol>
                </IonRow>
            </IonCardContent>
        </IonCard>
    );
};

export default CotItemInfo;
