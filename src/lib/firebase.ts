import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC-GjOsncZtHG-Zq7jh-ioyFl7Phv98NO8",
    authDomain: "mayalok-ventures.firebaseapp.com",
    projectId: "mayalok-ventures",
    storageBucket: "mayalok-ventures.firebasestorage.app",
    messagingSenderId: "6750906250",
    appId: "1:6750906250:web:497b788e75f5ff1bee0a73",
    measurementId: "G-BVX8CF3H7L"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const db = getFirestore(app, 'deeplink')

export { app, db }
