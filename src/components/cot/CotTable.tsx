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
          <IonLabel>Currency</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>Total Long</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>Total Short</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>Change Long</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>Change Short</IonLabel>
        </IonCol>
        {/* <IonCol>
          <IonLabel>% Long</IonLabel>
        </IonCol>
        <IonCol>
          <IonLabel>% Short</IonLabel>
        </IonCol> */}
      </IonRow>

      {data.map((x) => {
        return (
          <IonRow key={x.code}>
            <IonCol>
              <IonLabel>{x.code}</IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>
                {numbro(x.totalLong).format({ thousandSeparated: true })}
              </IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>
                {numbro(x.totalShort).format({ thousandSeparated: true })}
              </IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>
                {numbro(x.changeInLong).format({ thousandSeparated: true })}
              </IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>
                {numbro(x.changeInShort).format({ thousandSeparated: true })}
              </IonLabel>
            </IonCol>
            {/* <IonCol>
              <IonLabel>
                {numbro(x.percentOfLong / 100).format({
                  output: "percent",
                  mantissa: 1,
                })}
              </IonLabel>
            </IonCol>
            <IonCol>
              <IonLabel>
                {numbro(x.percentOfShort / 100).format({
                  output: "percent",
                  mantissa: 1,
                })}
              </IonLabel>
            </IonCol> */}
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

export default CotTable;
