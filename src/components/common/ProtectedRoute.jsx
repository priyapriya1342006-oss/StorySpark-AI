import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { Sparkles } from 'lucide-react'

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  // Display an aesthetic StorySpark AI loading screen while Firebase verifies auth status
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <Sparkles className="w-6 h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <h2 className="text-lg font-bold text-white mb-1">
          Authenticating Storyteller...
        </h2>
        <p className="text-xs text-slate-400">
          Checking your secure StorySpark session
        </p>
      </div>
    )
  }

  // If not logged in, redirect to login page and remember where the user wanted to go
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
