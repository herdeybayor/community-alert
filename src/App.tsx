import { IonApp, IonIcon, IonLabel, IonLoading, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { newspaper, person } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import { useAuthState } from "./context/AuthContext";
import FeedPage from "./pages/feeds/feed";
import IntroPage from "./pages/intro/intro";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import "./theme/variables.css";
import AccountPage from "./pages/account/account";

setupIonicReact();

const App: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthState();
    if (isLoading) {
        return <IonLoading isOpen={true} />;
    }
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/intro">
                            {isAuthenticated ? <Redirect to="/feeds" /> : <IntroPage />}
                        </Route>
                        <Route exact path="/login">
                            {isAuthenticated ? <Redirect to="/feeds" /> : <LoginPage />}
                        </Route>
                        <Route exact path="/register">
                            {isAuthenticated ? <Redirect to="/feeds" /> : <RegisterPage />}
                        </Route>
                        <Route exact path="/feeds">
                            {isAuthenticated ? <FeedPage /> : <Redirect to="/intro" />}
                        </Route>
                        <Route exact path="/account">
                            {isAuthenticated ? <AccountPage /> : <Redirect to="/intro" />}
                        </Route>
                        <Route exact path="/">
                            {isAuthenticated ? <Redirect to="/feeds" /> : <Redirect to="/intro" />}
                        </Route>
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom" className={`${!isAuthenticated && "ion-hide"}`}>
                        <IonTabButton tab="feed" href="/feeds">
                            <IonIcon icon={newspaper} />
                            <IonLabel>Feeds</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="account" href="/account">
                            <IonIcon icon={person} />
                            <IonLabel>Account</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
