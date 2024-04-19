import { IonAvatar, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { useAuthState } from "../../context/AuthContext";
import "./feeds.css";
import { add } from "ionicons/icons";

function FeedsPage() {
    const { user } = useAuthState();
    const [feeds, setFeeds] = React.useState<IFeed[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // React.useEffect(() => {
    //     async function fetchFeeds() {
    //         try {
    //             setIsLoading(true);
    //             const feedsCollection = collection(db, "reports");
    //             const feedsSnapshot = await getDocs(feedsCollection);
    //             const feedsData = feedsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //             const feeds: IFeed[] = feedsData.map((feed: any) => {
    //                 return {
    //                     id: feed.id,
    //                     title: feed.title,
    //                     description: feed.description,
    //                     category: feed.category,
    //                     location: feed.location,
    //                     image_url: feed.image_url,
    //                     user_ref: feed.user_ref,
    //                     created_at: feed.created_at,
    //                     updated_at: feed.updated_at,
    //                 };
    //             });
    //             setFeeds(feeds);
    //         } catch (error: any) {
    //             console.error(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchFeeds();
    // }, []);

    React.useEffect(() => {
        const feedsCollection = collection(db, "reports");
        const unsubscribe = onSnapshot(feedsCollection, (snapshot) => {
            const feedsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const feeds: IFeed[] = feedsData.map((feed: any) => {
                return {
                    id: feed.id,
                    title: feed.title,
                    description: feed.description,
                    category: feed.category,
                    location: feed.location,
                    image_url: feed.image_url,
                    user_ref: feed.user_ref,
                };
            });
            setFeeds(feeds);
            setIsLoading(false);
        });

        return unsubscribe;
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

            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Feeds</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonTitle className="ion-padding">Feeds</IonTitle>
                <IonItem routerLink="/new-feed" className="feed">
                    <IonIcon icon={add} />
                    <IonLabel>
                        <h3>Add a new feed</h3>
                    </IonLabel>
                </IonItem>
                <IonList>
                    {feeds.map((feed) => (
                        <IonItem key={feed.id} routerLink={`/feeds/${feed.id}`} className="feed">
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

                <IonLoading isOpen={isLoading} onDidDismiss={() => setIsLoading(false)} message="Loading feeds.." />
            </IonContent>
        </IonPage>
    );
}

export default FeedsPage;
