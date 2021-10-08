import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; //v9
import 'firebase/compat/firestore'; //v9

const firebaseConfig = {
    apiKey: "AIzaSyBVRP0i4pi4_UicOyBzP8I7ghjwjUXeIfg",
    authDomain: "lista-de-tarefas-vue-router.firebaseapp.com",
    projectId: "lista-de-tarefas-vue-router",
    storageBucket: "lista-de-tarefas-vue-router.appspot.com",
    messagingSenderId: "328095300706",
    appId: "1:328095300706:web:857c281bea8e6cfa99e53b"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export{ db, auth, profileCollection, tasksCollection}