

import * as React from 'react'
import { render, hydrate } from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { App } from './components/app'
import { DBContext } from './contexts/db'


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

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})


render(<DBContext.Provider value={{ db }}>
  <App />
</DBContext.Provider>, document.getElementById('app'))
