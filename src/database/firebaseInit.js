import firebase from 'firebase'
import 'firebase/firestore' 
import firebaseConfig from './database/firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()