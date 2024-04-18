import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

function LoginPage() {
    return (
        <>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton default-href="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton default-href="#"></IonBackButton>
                        </IonButtons>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="ion-padding">
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="email" required></IonInput>
                    </IonItem>

                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" required></IonInput>
                    </IonItem>

                    <IonButton expand="block" className="ion-margin-top">
                        Login
                    </IonButton>
                </div>
            </IonContent>
        </>
    );
}

export default LoginPage;
