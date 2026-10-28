import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    path.join(__dirname, '..', 'serviceAccountKey.json')

  if (fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
      })
      console.log('✅ [Server] Firebase Admin initialized with service account key.')
    } catch (err) {
      console.warn('⚠️ [Server] Failed to load serviceAccountKey.json:', err.message)
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'storyspark-ai-8adb5',
      })
    }
  } else {
    // Initialize with project ID (works for public key token verification)
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'storyspark-ai-8adb5',
    })
    console.log('✅ [Server] Firebase Admin initialized with Project ID verification.')
  }
}

/**
 * Middleware: Verifies Firebase ID Token in `Authorization: Bearer <token>`
 * Attaches decoded user (`req.user`) with verified UID.
 */
export async function verifyFirebaseToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required. Please sign in to generate stories with the AI engine.',
      })
    }

    const idToken = authHeader.split('Bearer ')[1].trim()

    if (!idToken) {
      return res.status(401).json({
        error: 'Empty authentication token provided.',
      })
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken)
    req.user = decodedToken
    next()
  } catch (error) {
    console.warn('[Server Auth] Token verification failed:', error?.code || error?.message)
    return res.status(401).json({
      error: 'Invalid or expired authentication session. Please sign in again.',
      code: error?.code || 'auth/invalid-token',
    })
  }
}

export default verifyFirebaseToken
