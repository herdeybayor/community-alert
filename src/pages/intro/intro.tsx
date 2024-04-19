import { IonButton, IonImg } from "@ionic/react";
import "./intro.css";
import { Link, NavLink } from "react-router-dom";

function IntroPage() {
    return (
        <div id="container">
            <div>
                <h1 className="title">Hello</h1>
                <p>Report incident going on around you at a go</p>
            </div>

            <IonImg src="assets/images/home-illustration.png" alt="Home Illustration" className="home-img"></IonImg>

            <div>
                <IonButton expand="block" className="ion-margin-top" routerLink="/register">
                    Get Started
                </IonButton>

                <IonButton expand="block" fill="clear" className="ion-margin-top" routerLink="/login">
                    Login
                </IonButton>
            </div>
        </div>
    );
}

export default IntroPage;
