import { Geolocation } from "@capacitor/geolocation";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import * as Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
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

        const initializeMap = async () => {
            const hasPermission = await Geolocation.checkPermissions();
            if (!hasPermission.location) {
                await Geolocation.requestPermissions();
            }
        };

        fetchFeed();
        initializeMap();
    }, [id]);

    // Initialize the map after feed data is loaded
    useEffect(() => {
        if (isLoading || !feed || !feed.location) return;

        const map = Leaflet.map("map").setView([feed.location.latitude, feed.location.longitude], 13);

        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        Leaflet.marker([feed.location.latitude, feed.location.longitude]).addTo(map);
    }, [isLoading, feed]);

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
                        {feed.location && (
                            <div>
                                <h3>Location:</h3>
                                <div id="map" style={{ height: "200px" }}></div>
                            </div>
                        )}
                        {feed.category && (
                            <div>
                                <h3>Category:</h3>
                                <p>{feed.category}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Feed not found.</p>
                )}
            </IonContent>
        </IonPage>
    );
}

export default FeedPage;
