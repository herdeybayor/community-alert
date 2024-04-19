import { IonButton, IonPage } from "@ionic/react";
import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

function AccountPage() {
    const handleSignOut = async () => {
        await signOut(auth);
    };
    return (
        <IonPage>
            FeedPage <IonButton onClick={handleSignOut}>Sign out</IonButton>
        </IonPage>
    );
}

export default AccountPage;
