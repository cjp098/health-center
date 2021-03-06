const admin = require("firebase-admin");
require("dotenv");

/**
 * This will handle all the firebase config
 * it will be necessary
 * reusable
 */

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  }),
});

/**Assigning firestore functions to firebaseDb
 * reusable purposes
 */
const firebaseDb = admin.firestore();
const firebaseAuth = admin.auth();
const firestoreUnion = admin.firestore;
firebaseDb.settings({ timestampsInSnapshots: true });

/**export firebaseDb variable */
module.exports = { firebaseDb, firebaseAuth, firestoreUnion };
