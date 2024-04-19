import { IonBackButton, IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../config/firebase";

function FeedPage() {
    const { id } = useParams<{ id: string }>(); // Get feed ID from the URL
    const [feed, setFeed] = useState<IFeed | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const docRef = doc(db, "reports", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFeed({ id: docSnap.id, ...(docSnap.data() as Omit<IFeed, "id">) });
                } else {
                    console.error("Feed not found");
                }
            } catch (error) {
                console.error("Error fetching feed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeed();
    }, [id]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#" />
                    </IonButtons>
                    <IonTitle>Feed Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" fullscreen>
                {isLoading ? (
                    <IonLoading isOpen={true} message="Loading feed..." />
                ) : feed ? (
                    <div>
                        <h2>{feed.title}</h2>
                        <p>{feed.description}</p>
                        {feed.image_url && <img src={feed.image_url} alt={feed.title} />}
                    </div>
                ) : (
                    <p>Feed not found.</p>
                )}
            </IonContent>
        </IonPage>
    );
}

export default FeedPage;
