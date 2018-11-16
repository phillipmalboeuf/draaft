import * as admin from 'firebase-admin'

import { config } from '../helpers/config'

export const app = admin.initializeApp(config.firebase)
export const db = app.firestore()
db.settings({
  timestampsInSnapshots: true
})