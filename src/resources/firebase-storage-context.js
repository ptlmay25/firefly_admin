import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrDWs1FcOwtIu3rWPbwtYECN9WhLJLOus",
  projectId: "salersclub",
  storageBucket: "gs://salersclub.appspot.com",
  messagingSenderId: "298566181044",
};

export default firebase.initializeApp(firebaseConfig).storage();