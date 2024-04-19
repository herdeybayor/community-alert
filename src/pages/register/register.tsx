import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { auth } from "../../config/firebase";
import { Link } from "react-router-dom";

function RegisterPage() {
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
                    <IonTitle>Create an account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <Formik
                    initialValues={{
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={Yup.object({
                        fullName: Yup.string().required("Full name is required"),
                        email: Yup.string().email("Invalid email address").required("Email is required"),
                        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref("password")], "Passwords must match")
                            .nullable()
                            .required("Confirm password is required"),
                    })}
                    onSubmit={async (values) => {
                        setIsLoading(true);
                        try {
                            const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password);
                            updateProfile(userCred.user, { displayName: values.fullName });
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
                                className={`ion-margin-vertical ${!errors.fullName && "ion-valid"} ${errors.fullName && "ion-invalid"} ${touched.fullName && "ion-touched"}`}
                                type="text"
                                fill="outline"
                                label="Full Name"
                                labelPlacement="floating"
                                errorText={errors.fullName}
                                placeholder="Full Name"
                                name="fullName"
                                onIonInput={(e) => setFieldValue("fullName", e.detail.value)}
                                onIonBlur={handleBlur}
                                value={values.fullName}
                            />

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

                            <IonInput
                                className={`ion-margin-vertical ${!errors.confirmPassword && "ion-valid"} ${errors.confirmPassword && "ion-invalid"} ${touched.confirmPassword && "ion-touched"}`}
                                type="password"
                                fill="outline"
                                label="Confirm Password"
                                labelPlacement="floating"
                                errorText={touched.confirmPassword ? errors.confirmPassword : ""}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onIonInput={(e) => setFieldValue("confirmPassword", e.detail.value)}
                                onIonBlur={handleBlur}
                                value={values.confirmPassword}
                            />

                            <IonButton expand="block" type="submit" className="ion-margin-top">
                                Create Account
                            </IonButton>

                            <IonItem lines="none" className="ion-text-center">
                                <IonLabel>
                                    <IonText>
                                        Already have an account? <Link to="/login">Login</Link>
                                    </IonText>
                                </IonLabel>
                            </IonItem>
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
                <IonLoading isOpen={isLoading} onDidDismiss={() => setIsLoading(false)} message="Creating account...">
                    {" "}
                </IonLoading>
            </IonContent>
        </IonPage>
    );
}

export default RegisterPage;
