importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyBT6UPIBsSCwF9dMgjn-0GoB9ZCgKkoWCs',
  authDomain: 'integrador-contabil.firebaseapp.com',
  databaseURL: 'https://integrador-contabil.firebaseio.com',
  projectId: 'integrador-contabil',
  storageBucket: 'integrador-contabil.appspot.com',
  messagingSenderId: '35863190336',
  appId: '1:35863190336:web:cceec78e5fcae962b538a5',
  measurementId: 'G-CTNNN4LV0T'
});
const messaging = firebase.messaging();
