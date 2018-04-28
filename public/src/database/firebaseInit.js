import firebase from 'firebase'
import 'firebase/firestore' 
import config from '../database/firebaseConfig'

export const firebaseApp = firebase.initializeApp(config)
export const firestore = firebaseApp.firestore()