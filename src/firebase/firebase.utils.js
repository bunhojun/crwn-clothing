import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBp3pfN58EEbp4xZLTeHFVWaUyGVC7Dl8Q",
    authDomain: "crwn-db-d6274.firebaseapp.com",
    databaseURL: "https://crwn-db-d6274.firebaseio.com",
    projectId: "crwn-db-d6274",
    storageBucket: "crwn-db-d6274.appspot.com",
    messagingSenderId: "392404988874",
    appId: "1:392404988874:web:86f71141b52e714b95d533",
    measurementId: "G-8MKE1N4LKS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
            
        } catch(e) {
            alert(e);
        }
    }
    return userRef;
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;