import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBwZEHGYAGevJnJB-LV4bEtA1htOJJK6g4',
  authDomain: 'accommodation-finde.firebaseapp.com',
  projectId: 'accommodation-finde',
  storageBucket: 'accommodation-finde.appspot.com',
  messagingSenderId: '422351248731',
  appId: '1:422351248731:web:e2c38a5886e64894964e7e',
  measurementId: 'G-84HSSG9V8P',
}
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission()
    const messaging = getMessaging(app)
    if (permission && permission === 'granted') {
      const fcmToken = await getToken(messaging, {
        vapidKey:
          'BKBtes5P2l-FdQUaE1Ncag7SKDkk1_Rntr251boghx9wTA3SutDHt-GZteiVRyvm2k1lXvRIfUztPPRg21MFxh8',
      })
      if (fcmToken) {
        return fcmToken
      }
    }
  } catch (e) {
    console.log(e)
    return null
  }
}
