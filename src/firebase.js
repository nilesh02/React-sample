import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBPRy468mWKldsZ2yx2dyzL8PSCE7rlMJk",
    authDomain: "sample-2216b.firebaseapp.com",
    databaseURL: "https://sample-2216b.firebaseio.com",
    projectId: "sample-2216b",
    storageBucket: "sample-2216b.appspot.com",
    messagingSenderId: "714106496514",
    appId: "1:714106496514:web:40a17f5f0af225dea1691b",
    measurementId: "G-60N4PNB2QH"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  
  export default fire;