import { Link } from 'react-router-dom'
import { Home, Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6">
        <Compass className="w-12 h-12 animate-pulse" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-3">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
        Uncharted Story Territory
      </h2>
      <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The realm or page you are seeking does not exist yet in our story archives. Let's guide you back to safety.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition-transform hover:scale-105"
      >
        <Home className="w-4 h-4" />
        Return to StorySpark Home
      </Link>
    </div>
  )
}
