import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
import Cot from "./pages/cot/Cot";
import Sentiment from "./pages/sentiment/Sentiment";
import { firebaseConfig } from "./utils/helper/FirebaseHelper";
import StrategyListPage from "./pages/strategies/StrategyListPage";

setupIonicReact();
// initializeApp(firebaseConfig);

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="main">
                    <Menu />
                    <IonRouterOutlet id="main">
                        <Route path="/" exact={true}>
                            <Redirect to="/page/cot" />
                        </Route>

                        <Route path="/page/sentiment" exact={true}>
                            <Sentiment name="Retail Sentiment" />
                        </Route>

                        {/* <Route path="/page/sentiment/analysis" exact={true} component={SentimentAnalysis} /> */}

                        <Route path="/page/cot" exact={true}>
                            <Cot name="Commitment of Traders" />
                        </Route>

                        {/* <Route path="/page/strategies" exact={true}>
                            <StrategyListPage name="Strategies" />
                        </Route> */}
                    </IonRouterOutlet>
                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
