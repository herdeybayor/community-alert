import { IonButton, IonImg } from "@ionic/react";
import "./intro.css";
import { Link, NavLink } from "react-router-dom";

function IntroPage() {
    console.log(process.env.VITE_SOME_KEY);
    return (
        <div id="container">
            <div>
                <h1 className="title">Hello</h1>
                <p>Report incident going on around you at a go</p>
            </div>

            <IonImg src="assets/images/home-illustration.png" alt="Home Illustration"></IonImg>

            <div>
                <Link to="/register">
                    <IonButton expand="block" className="ion-margin-top">
                        Get Started
                    </IonButton>
                </Link>

                <NavLink to="/login">
                    <IonButton expand="block" fill="clear" className="ion-margin-top">
                        Login
                    </IonButton>
                </NavLink>
            </div>
        </div>
    );
}

export default IntroPage;
