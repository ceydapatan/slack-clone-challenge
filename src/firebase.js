import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC4HfoHipv8SgxIt_u0Ka481gf-34fW5Kg",
    authDomain: "slack-clone-challenge-a30ab.firebaseapp.com",
    projectId: "slack-clone-challenge-a30ab",
    storageBucket: "slack-clone-challenge-a30ab.appspot.com",
    messagingSenderId: "971169052031",
    appId: "1:971169052031:web:2fc6bcc77bb1aa13b5564a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();


  export default db; 