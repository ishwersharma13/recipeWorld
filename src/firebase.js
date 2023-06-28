
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCBHIhFzp8lmj83ce8BVYfzadot_Z4-AFI",
    authDomain: "recipe-clone.firebaseapp.com",
    projectId: "recipe-clone",
    storageBucket: "recipe-clone.appspot.com",
    messagingSenderId: "1012398113233",
    appId: "1:1012398113233:web:bad36bba7565e22830a0f0",
    measurementId: "G-RLE4TQPP5Q"
  };

  
  //This special line of code here connects everything
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //gets the firestore database
  const db = firebaseApp.firestore();

  //we want to use firebase authentication
  const auth = firebase.auth();
  export { db, auth}