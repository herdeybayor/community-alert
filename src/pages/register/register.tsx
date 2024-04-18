import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

function RegisterPage() {
    return (
        <>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton default-href="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Create an account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton default-href="#"></IonBackButton>
                        </IonButtons>
                        <IonTitle size="large">Create an account</IonTitle>
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

                    <IonItem>
                        <IonLabel position="floating">Confirm Password</IonLabel>
                        <IonInput type="password" required></IonInput>
                    </IonItem>

                    <IonButton expand="block" className="ion-margin-top">
                        Create Account
                    </IonButton>
                </div>
            </IonContent>
        </>
    );
}

export default RegisterPage;
