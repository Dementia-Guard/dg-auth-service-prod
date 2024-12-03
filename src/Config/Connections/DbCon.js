import admin from 'firebase-admin';
import { config } from '../Env/EnvConfig.js';

let db = null;

// Initialize Firebase Admin SDK
export const initializeDb = () => {
    try {
        if (!admin.apps.length) {  // Ensures the SDK is not initialized multiple times
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(config.firebase.serviceCred)),
                databaseURL: config.firebase.databaseUrl
            });
            db = admin.firestore();
            console.log("Firebase Admin SDK initialized and database connected successfully.");
        } else {
            console.log("Firebase Admin SDK already initialized.");
        }
    } catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error.message);
    }
};

// Export the database instance
export const connectDB = () => {
    if (!db) {
        console.log("Initializing Database Connection .......");
        initializeDb()
    }
    return db;
};