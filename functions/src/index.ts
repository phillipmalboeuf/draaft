import * as functions from 'firebase-functions'
import { firestore } from 'firebase-admin'

import { db } from './clients/firebase'

module.exports = {
  newPerson: functions.auth.user().onCreate((user) => {
    return db.collection('people').doc(user.uid).set({
      name: user.displayName,
      email: user.email,
    }, { merge: true })
  })
}