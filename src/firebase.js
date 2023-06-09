import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_API_KEY,
	authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
	appId: import.meta.env.VITE_APP_APP_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();

export const database = {
	folders: projectFirestore.collection("folders"),
	files: projectFirestore.collection("files"),
	timestamp: timestamp,
	formatDoc: (doc) => {
		return { id: doc.id, ...doc.data() };
	},
};

export { app, projectFirestore, projectStorage, timestamp, auth };
