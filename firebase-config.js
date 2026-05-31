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

// Initialize Firebase SDK instances globally on window if configuration is provided
window.db = null;
window.auth = null;
window.storage = null;
window.isFirebaseInitialized = false;

try {
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && firebaseConfig.apiKey.trim() !== "") {
        firebase.initializeApp(firebaseConfig);
        window.db = firebase.firestore();
        window.auth = firebase.auth();
        window.storage = firebase.storage();
        window.isFirebaseInitialized = true;
        console.log("Firebase Cloud Backend Initialized Successfully.");
    } else {
        console.warn("Firebase config has placeholders. App running in LOCAL SEED OFFLINE MODE until credentials are configured.");
    }
} catch (error) {
    console.error("Firebase Initialization Failed (falling back to LOCAL SEED OFFLINE MODE):", error);
    window.isFirebaseInitialized = false;
}

