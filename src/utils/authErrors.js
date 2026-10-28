/**
 * Maps Firebase Authentication & Firestore error codes to friendly, human-readable messages.
 * Never exposes sensitive stack traces, private keys, or raw credentials.
 */
export function getFriendlyAuthErrorMessage(errorOrCode) {
  const code = typeof errorOrCode === 'string' ? errorOrCode : errorOrCode?.code
  const rawMessage = typeof errorOrCode === 'object' ? errorOrCode?.message : ''

  switch (code) {
    case 'auth/not-initialized':
    case 'auth/missing-config':
      return 'Firebase is not configured yet. Please add your Firebase project credentials to .env.local and restart the Vite development server.'

    case 'auth/api-key-not-valid':
    case 'auth/invalid-api-key':
      return 'The Firebase API key in .env.local is invalid. Please double-check your VITE_FIREBASE_API_KEY in .env.local.'

    case 'auth/project-not-found':
      return 'The Firebase project was not found. Please verify VITE_FIREBASE_PROJECT_ID in .env.local.'

    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Incorrect email or password. Please verify your credentials and try again.'

    case 'auth/user-not-found':
      return 'No StorySpark account was found with this email. Please check your spelling or sign up.'

    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.'

    case 'auth/weak-password':
      return 'Your password is too weak. Please choose a password with at least 6 characters.'

    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'This sign-in provider is disabled in your Firebase Console. Go to Firebase Console > Authentication > Sign-in method and enable Email/Password (or Google).'

    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for authentication. Please add "localhost" under Authentication > Settings > Authorized domains in your Firebase Console.'

    case 'auth/popup-closed-by-user':
      return 'The Google sign-in window was closed before completing. Please try again.'

    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site and try again.'

    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.'

    case 'auth/network-request-failed':
      return 'Network connection issue. Please check your internet connection and try again.'

    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Access has been temporarily paused for security. Please try again in a few moments.'

    case 'auth/invalid-email':
      return 'Please enter a valid email address (e.g. author@storyspark.ai).'

    case 'auth/user-disabled':
      return 'This author account has been disabled. Please contact support.'

    case 'permission-denied':
      return 'Firestore permission was denied when saving your profile. Please check your Firestore security rules.'

    default:
      // In development, show the code if present to help with diagnosis
      if (import.meta.env.DEV && code) {
        return `Authentication notice (${code}): Please verify your Firebase Console settings and .env.local configuration.`
      }
      if (import.meta.env.DEV && rawMessage && rawMessage.includes('Firebase')) {
        return `Firebase notice: ${rawMessage}`
      }
      return 'An unexpected issue occurred during authentication. Please try again.'
  }
}

/**
 * Safe development logger for auth diagnostics.
 * Never prints tokens, passwords, or credentials.
 */
export function logAuthDiagnostic(context, error) {
  if (import.meta.env.DEV) {
    console.group(`🔐 [StorySpark AI Auth Diagnostic: ${context}]`)
    console.warn('Error Code:', error?.code || 'None (General JavaScript Error)')
    console.warn('Error Message:', error?.message || 'No technical message')
    console.info('Checklist: 1) .env.local keys populated? 2) Dev server restarted? 3) Sign-in method enabled in Firebase Console?')
    console.groupEnd()
  }
}
