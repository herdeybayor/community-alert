import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    return (
        <IonPage>
            <IonHeader translucent id="header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton default-href="#"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email("Invalid email address").required("Email is required"),
                        password: Yup.string().required("Password is required"),
                    })}
                    onSubmit={async (values) => {
                        setIsLoading(true);
                        try {
                            await signInWithEmailAndPassword(auth, values.email, values.password);
                        } catch (error: Error | any) {
                            setError(error.message);
                            setShowToast(true);
                            console.error(error);
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                >
                    {({ setFieldValue, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <IonInput
                                className={`ion-margin-vertical ${!errors.email && "ion-valid"} ${errors.email && "ion-invalid"} ${touched.email && "ion-touched"}`}
                                type="email"
                                fill="outline"
                                label="Email"
                                labelPlacement="floating"
                                errorText={touched.email ? errors.email : ""}
                                placeholder="Email"
                                name="email"
                                onIonInput={(e) => setFieldValue("email", e.detail.value)}
                                onIonBlur={handleBlur}
                                value={values.email}
                            />

                            <IonInput
                                className={`ion-margin-vertical ${!errors.password && "ion-valid"} ${errors.password && "ion-invalid"} ${touched.password && "ion-touched"}`}
                                type="password"
                                fill="outline"
                                label="Password"
                                labelPlacement="floating"
                                errorText={touched.password ? errors.password : ""}
                                placeholder="Password"
                                name="password"
                                onIonInput={(e) => setFieldValue("password", e.detail.value)}
                                onIonBlur={handleBlur}
                                value={values.password}
                            />

                            <IonButton expand="block" type="submit" className="ion-margin-top">
                                Login
                            </IonButton>
                        </form>
                    )}
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
                <IonLoading isOpen={isLoading} onDidDismiss={() => setIsLoading(false)} message="Logging in..."></IonLoading>
            </IonContent>
        </IonPage>
    );
}

export default LoginPage;
