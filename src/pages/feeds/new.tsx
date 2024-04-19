import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLoading,
    IonToast,
    IonButtons,
    IonImg,
} from "@ionic/react";
import { Formik } from "formik";
import { useCallback, useState } from "react";
import * as Yup from "yup";
import { db, storage } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { Geolocation } from "@capacitor/geolocation";
import { Camera, CameraResultType } from "@capacitor/camera";
import { useAuthState } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

function NewFeedPage() {
    const { user } = useAuthState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");

    const useCurrentLocation = useCallback(async () => {
        try {
            const location = await Geolocation.getCurrentPosition();
            setLatitude(location.coords.latitude.toString());
            setLongitude(location.coords.longitude.toString());
        } catch (error) {
            console.error("Error getting location:", error);
        }
    }, []);

    const history = useHistory();

    return (
        <IonPage>
            <IonHeader translucent id="header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton default-href="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle>New Report</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        category: "",
                        location: { latitude: latitude, longitude: longitude },
                        image_url: "",
                    }}
                    enableReinitialize
                    validationSchema={Yup.object({
                        title: Yup.string().required("Title is required"),
                        description: Yup.string().required("Description is required"),
                        category: Yup.string().required("Category is required"),
                        location: Yup.object().shape({
                            latitude: Yup.number(),
                            longitude: Yup.number(),
                        }),
                        image_url: Yup.string(),
                    })}
                    onSubmit={async (values) => {
                        setIsLoading(true);
                        try {
                            const payload: Partial<IFeed> = {
                                title: values.title,
                                description: values.description,
                                category: values.category,
                                image_url: values.image_url,
                                location: {
                                    latitude: parseFloat(values.location.latitude),
                                    longitude: parseFloat(values.location.longitude),
                                },
                                user_ref: user?.uid,
                            };
                            if (!payload.image_url) {
                                delete payload.image_url;
                            }

                            if (!payload.location?.latitude || !payload.location?.longitude) {
                                delete payload.location;
                            }

                            await addDoc(collection(db, "reports"), payload);

                            history.push("/feeds");
                        } catch (error: any) {
                            setError(error.message);
                            setShowToast(true);
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    {({ setFieldValue, handleBlur, handleSubmit, values, errors }) => {
                        console.log({ values, errors });
                        return (
                            <form onSubmit={handleSubmit}>
                                <IonItem>
                                    <IonLabel position="floating">Title</IonLabel>
                                    <IonInput name="title" type="text" onIonChange={(e) => setFieldValue("title", e.detail.value)} onIonBlur={handleBlur("title")} value={values.title} />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="floating">Description</IonLabel>
                                    <IonTextarea
                                        name="description"
                                        onIonChange={(e) => setFieldValue("description", e.detail.value)}
                                        onIonBlur={handleBlur("description")}
                                        value={values.description}
                                    />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="floating">Category</IonLabel>
                                    <IonSelect name="category" interface="popover" onIonChange={(e) => setFieldValue("category", e.detail.value)} value={values.category}>
                                        <IonSelectOption value="incident">Incident</IonSelectOption>
                                        <IonSelectOption value="accident">Accident</IonSelectOption>
                                        <IonSelectOption value="event">Event</IonSelectOption>
                                        <IonSelectOption value="other">Other</IonSelectOption>
                                    </IonSelect>
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="floating">Longitude</IonLabel>
                                    <IonInput name="location.longitude" type="number" readonly value={values.location?.longitude} />
                                </IonItem>

                                <IonItem>
                                    <IonLabel position="floating">Latitude</IonLabel>
                                    <IonInput name="location.latitude" type="number" readonly value={values.location?.latitude} />
                                </IonItem>

                                <IonButton onClick={useCurrentLocation}>Use Current Location</IonButton>

                                <IonButton
                                    onClick={async () => {
                                        try {
                                            const photo = await Camera.getPhoto({
                                                resultType: CameraResultType.DataUrl,
                                            });
                                            if (photo.dataUrl) {
                                                setIsUploading(true);
                                                const storageRef = ref(storage, `images/${photo.path}`);
                                                await uploadString(storageRef, photo.dataUrl, "data_url");
                                                const url = await getDownloadURL(storageRef);
                                                setImage(url);
                                                setFieldValue("image_url", url);
                                            }
                                        } catch (error) {
                                            console.error("Error taking photo:", error);
                                        } finally {
                                            setIsUploading(false);
                                        }
                                    }}
                                >
                                    Take Photo
                                </IonButton>

                                {image && <IonImg src={image} />}

                                <IonButton expand="block" type="submit" className="ion-margin-top">
                                    Submit Report
                                </IonButton>
                            </form>
                        );
                    }}
                </Formik>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => {
                        setShowToast(false);
                        setError("");
                    }}
                    message={error}
                    duration={5000}
                    swipeGesture="vertical"
                    position="top"
                    positionAnchor="header"
                ></IonToast>
                <IonLoading isOpen={isLoading} onDidDismiss={() => setIsLoading(false)} message="Submitting report..." />
                {isUploading && <IonLoading isOpen={true} message="Uploading image..." />}
            </IonContent>
        </IonPage>
    );
}

export default NewFeedPage;
