import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/**
 * StorySpark AI - Firebase Initialization
 * Reads credentials securely from .env.local via import.meta.env
 * Never exposes or logs confidential values.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Check for missing keys safely
const REQUIRED_CONFIG_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

const missingKeys = REQUIRED_CONFIG_KEYS.filter(
  (key) => !import.meta.env[key] || typeof import.meta.env[key] !== 'string' || import.meta.env[key].trim() === ''
)

export const isFirebaseConfigured = missingKeys.length === 0

let app = null
let auth = null
let db = null

if (!isFirebaseConfigured) {
  // Output a helpful beginner-friendly warning naming the missing keys without printing any actual values
  console.warn(
    `[StorySpark AI] Firebase configuration is incomplete in .env.local.\n` +
      `Missing keys: ${missingKeys.join(', ')}.\n` +
      `Please provide your Firebase project keys in .env.local to activate Firebase services.`
  )
} else {
  try {
    // Avoid initializing Firebase more than once
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
  } catch (error) {
    console.error('[StorySpark AI] Error initializing Firebase:', error?.message || 'Unknown initialization error')
  }
}

export { app, auth, db }
export default app
