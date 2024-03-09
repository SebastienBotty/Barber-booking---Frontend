import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASd3v9_VbwebEyd76PUzlsSnMmua6PtTI",
    authDomain: "barber-shop-9b4b1.firebaseapp.com",
    projectId: "barber-shop-9b4b1",
    storageBucket: "barber-shop-9b4b1.appspot.com",
    messagingSenderId: "178672977555",
    appId: "1:178672977555:web:11335c5b1c11ef6cf7af66",
    measurementId: "G-N3JRSE4XGG",
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

