import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'
import { AuthContext } from './AuthContextDef'
import { createUserProfileDocument, getUserProfileDocument } from '../services/userService'

function createUninitializedError() {
  const error = new Error(
    'Firebase Authentication is not initialized. Please verify your .env.local configuration and restart the Vite development server.'
  )
  error.code = 'auth/not-initialized'
  return error
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  // Only start in loading state if Firebase auth is initialized
  const [loading, setLoading] = useState(() => Boolean(auth))

  // Listen to Firebase Authentication state changes
  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      if (user) {
        // Attempt to fetch user profile from Firestore `profiles/{uid}`
        try {
          const profile = await getUserProfileDocument(user.uid)
          setUserProfile(profile)
        } catch (profileErr) {
          if (import.meta.env.DEV) {
            console.warn('[StorySpark AI] Profile fetch notice:', profileErr?.message)
          }
        }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sign up with Email, Password & Author Name
  const signup = async (email, password, name) => {
    if (!auth) throw createUninitializedError()

    const credential = await createUserWithEmailAndPassword(auth, email, password)

    // Update Firebase Auth displayName
    if (name) {
      try {
        await updateProfile(credential.user, { displayName: name })
      } catch (profileErr) {
        if (import.meta.env.DEV) {
          console.warn('[StorySpark AI] Auth displayName update notice:', profileErr?.message)
        }
      }
    }

    // Attempt creating Firestore document at `profiles/{uid}`
    // Note: Firestore failures must NOT cause the signup operation itself to fail
    try {
      const profile = await createUserProfileDocument(credential.user, { name })
      setUserProfile(profile)
    } catch (firestoreErr) {
      if (import.meta.env.DEV) {
        console.warn('[StorySpark AI] Firestore profile document creation notice:', firestoreErr?.message)
      }
    }

    return credential.user
  }

  // Sign in with Email and Password
  const login = async (email, password) => {
    if (!auth) throw createUninitializedError()
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  }

  // Sign in with Google Popup
  const loginWithGoogle = async () => {
    if (!auth) throw createUninitializedError()
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    const credential = await signInWithPopup(auth, provider)

    // Ensure Firestore profile document exists
    // Note: Firestore failures must NOT cause the login operation to fail
    try {
      const profile = await createUserProfileDocument(credential.user, {
        name: credential.user.displayName || 'Author',
      })
      setUserProfile(profile)
    } catch (firestoreErr) {
      if (import.meta.env.DEV) {
        console.warn('[StorySpark AI] Firestore Google profile document notice:', firestoreErr?.message)
      }
    }

    return credential.user
  }

  // Send Password Reset Email
  const resetPassword = async (email) => {
    if (!auth) throw createUninitializedError()
    await sendPasswordResetEmail(auth, email)
  }

  // Sign Out
  const logout = async () => {
    if (!auth) return
    await signOut(auth)
    setCurrentUser(null)
    setUserProfile(null)
  }

  const value = {
    currentUser,
    userProfile,
    loading,
    isFirebaseConfigured,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
