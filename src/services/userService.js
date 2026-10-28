import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Creates or retrieves the user profile document in Firestore collection `profiles/{uid}`.
 * Only stores uid, name, email, and metadata fields. Never stores passwords.
 * Avoids overwriting existing profile data unnecessarily.
 */
export async function createUserProfileDocument(user, additionalData = {}) {
  if (!user || !user.uid) return null

  if (!db) {
    console.warn('[StorySpark AI] Firestore is not initialized. Skipping profile creation.')
    return null
  }

  const profileRef = doc(db, 'profiles', user.uid)

  try {
    const docSnap = await getDoc(profileRef)

    if (!docSnap.exists()) {
      const { uid, email, displayName } = user
      const name = additionalData.name || displayName || 'Author'

      const profileData = {
        uid,
        name,
        email: email || '',
        age: additionalData.age || '',
        country: additionalData.country || '',
        preferredLanguage: additionalData.preferredLanguage || 'English',
        favouriteGenres: additionalData.favouriteGenres || [],
        bio: additionalData.bio || 'Speculative fiction enthusiast and creative world-builder.',
        createdAt: new Date().toISOString(),
      }

      await setDoc(profileRef, profileData)
      return { id: uid, ...profileData }
    }

    return { id: docSnap.id, ...docSnap.data() }
  } catch (error) {
    console.warn(
      '[StorySpark AI] Firestore Profile Note: Could not write to `profiles` collection.',
      error?.message || error
    )
    return {
      uid: user.uid,
      name: user.displayName || additionalData.name || 'Author',
      email: user.email || '',
      error: error?.message,
    }
  }
}

/**
 * Fetches the user profile document from Firestore `profiles/{uid}`
 */
export async function getUserProfileDocument(uid) {
  if (!uid || !db) return null

  try {
    const profileRef = doc(db, 'profiles', uid)
    const docSnap = await getDoc(profileRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    }
    return null
  } catch (error) {
    console.warn('[StorySpark AI] Failed to fetch profile from Firestore:', error?.message)
    return null
  }
}

/**
 * Updates an existing user profile document in `profiles/{uid}`.
 * Only modifies fields for the authenticated user.
 */
export async function updateUserProfileDocument(uid, data) {
  if (!uid) throw new Error('User UID is required to update profile.')
  if (!db) throw new Error('Firestore database is not initialized.')

  const profileRef = doc(db, 'profiles', uid)

  // Clean data: never overwrite uid, email, or passwords
  const cleanData = {
    name: data.name?.trim() || 'Author',
    age: data.age !== undefined ? String(data.age).trim() : '',
    country: data.country?.trim() || '',
    preferredLanguage: data.preferredLanguage || 'English',
    favouriteGenres: Array.isArray(data.favouriteGenres) ? data.favouriteGenres : [],
    bio: data.bio?.trim() || '',
    updatedAt: new Date().toISOString(),
  }

  await setDoc(profileRef, cleanData, { merge: true })
  return { id: uid, ...cleanData }
}

/**
 * Real-time listener for the user's profile document `profiles/{uid}`.
 * Cleans up when unsubscribed.
 */
export function subscribeUserProfile(uid, onUpdate, onError) {
  if (!uid || !db) return () => {}

  const profileRef = doc(db, 'profiles', uid)

  return onSnapshot(
    profileRef,
    (docSnap) => {
      if (docSnap.exists()) {
        onUpdate({ id: docSnap.id, ...docSnap.data() })
      } else {
        onUpdate(null)
      }
    },
    (err) => {
      console.warn('[StorySpark AI] Real-time profile listener notice:', err?.message)
      if (onError) onError(err)
    }
  )
}
