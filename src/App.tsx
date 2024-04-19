import { Redirect, Route } from "react-router-dom";
import { IonApp, IonLoading, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import "./theme/variables.css";
import IntroPage from "./pages/intro/intro";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import HomePage from "./pages/home/home";
import { useAuthState } from "./context/AuthContext";

setupIonicReact();

// const AuthenticatedRoute = ({ component: C, ...props }) => {
//     const { isAuthenticated } = useAuthState();
//     console.log(`AuthenticatedRoute: ${isAuthenticated}`);
//     return <Route {...props} render={(routeProps) => (isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />)} />;
// };

// const UnauthenticatedRoute = ({ component: C, ...props }) => {
//     const { isAuthenticated } = useAuthState();
//     console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
//     return <Route {...props} render={(routeProps) => (!isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />)} />;
// };

const App: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthState();
    if (isLoading) {
        return <IonLoading isOpen={true} />;
    }
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    {/* use authenticate for intro*/}
                    <Route exact path="/intro">
                        {isAuthenticated ? <Redirect to="/home" /> : <IntroPage />}
                    </Route>
                    <Route exact path="/login">
                        {isAuthenticated ? <Redirect to="/home" /> : <LoginPage />}
                    </Route>
                    <Route exact path="/register">
                        {isAuthenticated ? <Redirect to="/home" /> : <RegisterPage />}
                    </Route>
                    <Route exact path="/home">
                        {isAuthenticated ? <HomePage /> : <Redirect to="/intro" />}
                    </Route>
                    <Route exact path="/">
                        {isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/intro" />}
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
