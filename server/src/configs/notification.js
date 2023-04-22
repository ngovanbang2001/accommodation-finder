import firebaseAdmin from 'firebase-admin'

const serviceAccount = require('./accommodation-finder-2f5f4-firebase-adminsdk-erwmd-e9b355c902.json')
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
})

const handlePushFCM = async (messages) => {
  try {
    return firebaseAdmin.messaging().send(messages)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  firebaseAdmin,
  handlePushFCM,
}
