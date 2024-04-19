import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function AccountPage() {
    const handleSignOut = async () => {
        await signOut(auth);
    };
    return (
        <IonPage>
            <IonHeader translucent id="header" className="ion-padding">
                <IonToolbar>
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonButton expand="block" onClick={handleSignOut} className="ion-margin-vertical">
                    Sign out
                </IonButton>
                <IonButton expand="block" routerLink="/account/my-reports" className="ion-margin-vertical">
                    My Reports
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default AccountPage;
