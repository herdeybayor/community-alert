import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { add } from "ionicons/icons";
import React from "react";
import { db } from "../../config/firebase";
import { useAuthState } from "../../context/AuthContext";

function MyReportsPage() {
    const { user } = useAuthState();
    const [myReports, setMyReports] = React.useState<IFeed[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!user) return; // Protect if user is not logged in

        const reportsCollection = collection(db, "reports");
        const filteredQuery = query(reportsCollection, where("user_ref", "==", user.uid));

        const unsubscribe = onSnapshot(filteredQuery, (snapshot) => {
            const reportsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const myReports: IFeed[] = reportsData.map((report: any) => {
                return {
                    id: report.id,
                    title: report.title,
                    description: report.description,
                    category: report.category,
                    location: report.location,
                    image_url: report.image_url,
                    user_ref: report.user_ref,
                };
            });
            setMyReports(myReports);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);
    return (
        <IonPage>
            <IonHeader translucent id="header" className="ion-padding">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#" />
                    </IonButtons>
                    <IonTitle>My Reports</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <IonItem routerLink="/new-feed" className="feed">
                    <IonIcon icon={add} />
                    <IonLabel>
                        <h3>Add a new report</h3>
                    </IonLabel>
                </IonItem>
                <IonList>
                    {myReports.map((report) => (
                        <IonItem key={report.id} routerLink={`/feeds/${report.id}`} className="feed">
                            <IonLabel>
                                <h3>{report.title}</h3>
                                <p>{report.description}</p>
                            </IonLabel>

                            {report.image_url && (
                                <IonImg
                                    src={report.image_url}
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

export default MyReportsPage;
