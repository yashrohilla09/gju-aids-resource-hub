/* ==========================================================================
   GJU AI&DS Resource Hub - Firebase Cloud Configuration
   ========================================================================== */

// PLACEHOLDER: Replace this configuration object with your exact credentials
// from your Google Firebase Console (Project Settings -> Web App Setup).
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// Initialize Firebase SDK instances if configuration is provided
let db = null;
let auth = null;
let storage = null;
let isFirebaseInitialized = false;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY_HERE") {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
        isFirebaseInitialized = true;
        console.log("Firebase Cloud Backend Initialized Successfully.");
    } catch (error) {
        console.error("Firebase Initialization Failed:", error);
    }
} else {
    console.warn("Firebase config has placeholders. App running in LOCAL SEED OFFLINE MODE until credentials are configured.");
}
