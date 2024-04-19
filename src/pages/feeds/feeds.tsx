import { IonAvatar, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { useAuthState } from "../../context/AuthContext";
import "./feeds.css";

interface IFeed {
    id: string;
    title: string;
    description: string;
    category: string;
    location: {
        latitude: number;
        longitude: number;
    };
    image_url?: string;
    user_ref: string;
    created_at: Date;
    updated_at: Date;
}

function FeedsPage() {
    const { user } = useAuthState();
    const [feeds, setFeeds] = React.useState<IFeed[]>([]);

    React.useEffect(() => {
        async function fetchFeeds() {
            try {
                const feedsCollection = collection(db, "reports");
                const feedsSnapshot = await getDocs(feedsCollection);
                const feedsData = feedsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                const feeds: IFeed[] = feedsData.map((feed: any) => {
                    return {
                        id: feed.id,
                        title: feed.title,
                        description: feed.description,
                        category: feed.category,
                        location: feed.location,
                        image_url: feed.image_url,
                        user_ref: feed.user_ref,
                        created_at: feed.created_at,
                        updated_at: feed.updated_at,
                    };
                });
                setFeeds(feeds);
            } catch (error: any) {
                console.error(error);
            }
        }
        fetchFeeds();
    }, []);
    return (
        <IonPage>
            <IonHeader translucent id="header" className="ion-padding">
                <IonToolbar>
                    <IonAvatar slot="start">
                        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                    </IonAvatar>
                    <IonTitle>Hello, {user?.displayName}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Reports</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonTitle className="ion-padding">Reports</IonTitle>
                <IonList>
                    {feeds.map((feed) => (
                        <IonItem key={feed.id} routerLink={`/feed/${feed.id}`} className="feed">
                            <IonLabel>
                                <h3>{feed.title}</h3>
                                <p>{feed.description}</p>
                            </IonLabel>

                            {feed.image_url && (
                                <IonImg
                                    src={feed.image_url}
                                    className="feed__image"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default FeedsPage;
