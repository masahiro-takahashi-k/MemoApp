import { initializeApp } from "firebase/app"
import { initializeAuth, getReactNativePersistence} from "firebase/auth"

import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID
//   apiKey: "AIzaSyBrgkgxE9q0dCYsvkVrCXXaB6MQdjTwCRU",
//   authDomain: "memoapp-a049d.firebaseapp.com",
//   projectId: "memoapp-a049d",
//   storageBucket: "memoapp-a049d.firebasestorage.app",
//   messagingSenderId: "628929359086",
//   appId: "1:628929359086:web:f053389e389188cb3a17ff"
}

//初期化
const app = initializeApp(firebaseConfig)
const auth= initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const db= getFirestore(app)

export {app, auth, db}
