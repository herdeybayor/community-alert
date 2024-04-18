import { IonButton, IonImg } from "@ionic/react";
import "./intro.css";

function IntroPage() {
    return (
        <div id="container">
            <div>
                <h1 className="title">Hello</h1>
                <p>Report incident going on around you at a go</p>
            </div>

            <IonImg src="assets/images/home-illustration.png" alt="Home Illustration"></IonImg>

            <div>
                <IonButton expand="block" className="ion-margin-top">
                    Get Started
                </IonButton>
                <IonButton expand="block" fill="clear" className="ion-margin-top">
                    Login
                </IonButton>
            </div>
        </div>
    );
}

export default IntroPage;
