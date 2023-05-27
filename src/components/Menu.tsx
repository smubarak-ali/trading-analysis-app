import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from "@ionic/react";

import { useLocation } from "react-router-dom";
import { bookmarkOutline } from "ionicons/icons";
import "./Menu.css";

interface AppPage {
    url: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: "COT Report",
        url: "/page/cot",
    },
    {
        title: "Sentiment",
        url: "/page/sentiment",
    },
    // {
    //     title: "Strategies",
    //     url: "/page/strategies",
    // },
];

const Menu: React.FC = () => {
    const location = useLocation();

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Abdali Trading</IonListHeader>
                    {/* <IonNote>hi@ionicframework.com</IonNote> */}
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    className={location.pathname === appPage.url ? "selected" : ""}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>

                {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
