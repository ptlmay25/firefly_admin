import firebase from 'firebase/app'
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvv_Nf4EwyTrppZeODCGfuXz2eOT6RHoo",
  projectId: "admintool25",
  messagingSenderId: "964700755501",
};

export default 
  !firebase.apps.length
    ? { FireBaseContext : firebase.initializeApp(firebaseConfig).firestore(), Token: localStorage.getItem('token') }
    : { FireBaseContext : firebase.app().firestore(), Token: localStorage.getItem('token') }