import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAuJtedwZAP6wXBeEkQIjXOrM2sKvBNHkE",
    authDomain: "expensify-a67f9.firebaseapp.com",
    databaseURL: "https://expensify-a67f9.firebaseio.com",
    projectId: "expensify-a67f9",
    storageBucket: "expensify-a67f9.appspot.com",
    messagingSenderId: "812209205648"
  };

firebase.initializeApp(config);

const database = firebase.database();

