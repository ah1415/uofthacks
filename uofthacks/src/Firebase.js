import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCleu42A9nYXp9HBPEx7_Yz4LVzYDqD5k8",
    authDomain: "uofthacks-486d1.firebaseapp.com",
    databaseURL: "https://uofthacks-486d1.firebaseio.com",
    projectId: "uofthacks-486d1",
    storageBucket: "uofthacks-486d1.appspot.com",
    messagingSenderId: "610857319806"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
