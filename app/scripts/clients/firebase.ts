
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'


if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAEFQMZtFRmGkIcmtFKf7bDp6d1st6nRtM',
    authDomain: 'draaftnet.firebaseapp.com',
    databaseURL: 'https://draaftnet.firebaseio.com',
    projectId: 'draaftnet',
    storageBucket: 'draaftnet.appspot.com',
    messagingSenderId: '558595103121'
  })
}


export const auth = firebase.auth()
export const storage = firebase.storage()
export const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})



