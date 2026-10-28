import { Sparkles, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">StorySpark AI</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering writers, creators, and dreamers to unleash cinematic stories, vivid characters, and compelling plots with AI.
            </p>
          </div>

          {/* Creative Modes Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Creative Modes
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/generate?mode=ideas" className="hover:text-purple-400 transition-colors">
                  Story Ideas & Hooks
                </Link>
              </li>
              <li>
                <Link to="/generate?mode=plots" className="hover:text-purple-400 transition-colors">
                  Plot Outlines & Arcs
                </Link>
              </li>
              <li>
                <Link to="/generate?mode=characters" className="hover:text-purple-400 transition-colors">
                  Character Forge
                </Link>
              </li>
              <li>
                <Link to="/generate?mode=stories" className="hover:text-purple-400 transition-colors">
                  Short Stories
                </Link>
              </li>
              <li>
                <Link to="/generate?mode=scripts" className="hover:text-purple-400 transition-colors">
                  Screenplays & Scripts
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generate" className="hover:text-purple-400 transition-colors">
                  AI Generator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-purple-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-purple-400 transition-colors">
                  Profile & Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Status & Tech Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Technology
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Engineered with React 19, Vite, Tailwind CSS, Firebase Authentication, Cloud Firestore, and Gemini AI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {CURRENT_YEAR} StorySpark AI. Crafted for imaginative minds.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" /> for storytelling
          </p>
        </div>
      </div>
    </footer>
  )
}
