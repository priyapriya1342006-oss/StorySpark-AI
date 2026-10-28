import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Wand2,
  BookOpen,
  Users,
  Film,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  History,
  Palette,
  CheckCircle2,
  Copy,
  Flame,
} from 'lucide-react'

const CREATIVE_MODES = [
  {
    id: 'ideas',
    title: 'Story Ideas',
    icon: Lightbulb,
    color: 'from-amber-400 to-orange-500',
    accentText: 'text-amber-400',
    borderGlow: 'hover:border-amber-500/50',
    bgBadge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    tagline: 'Overcome writer’s block in seconds',
    sampleTitle: 'The Clockwork Cartographer',
    sampleGenre: 'Steampunk Fantasy',
    sampleOutput:
      'Premise: In a floating Victorian metropolis, an apprentice cartographer discovers that whenever she redraws forgotten alleyways on her brass-geared map, the physical city rearranges itself to match her ink—revealing a hidden district that was erased to conceal an ancient rebellion.',
  },
  {
    id: 'plots',
    title: 'Plot Outlines',
    icon: BookOpen,
    color: 'from-blue-400 to-indigo-500',
    accentText: 'text-indigo-400',
    borderGlow: 'hover:border-indigo-500/50',
    bgBadge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    tagline: '3-Act structure, pacing & plot twists',
    sampleTitle: 'Sub-Zero Signal (Act Breakdown)',
    sampleGenre: 'Sci-Fi Mystery',
    sampleOutput:
      'Act I (Hook): A deep-sea research drill hits a hollow metallic chamber 6 miles beneath the Arctic ice sheet.\nAct II (Rising Action): Sonar pulses decode into coordinates for a solar eclipse that happened 12,000 years ago. One scientist begins receiving transmissions that mimic her deceased brother.\nAct III (Climax): They realize the station isn’t surveying an anomaly—they are trapped inside an autonomous terraforming engine.',
  },
  {
    id: 'characters',
    title: 'Character Forge',
    icon: Users,
    color: 'from-purple-400 to-pink-500',
    accentText: 'text-purple-400',
    borderGlow: 'hover:border-purple-500/50',
    bgBadge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    tagline: 'Vivid archetypes, flaws & backstories',
    sampleTitle: 'Captain Sylas Vance',
    sampleGenre: 'Space Western',
    sampleOutput:
      '• Age & Archetype: 42, Reluctant Smuggler with a broken moral compass.\n• Core Motivation: Collecting enough synthetic plasma to cure his daughter who is in stasis.\n• Distinct Quirks: Counts backwards in binary when anxious; refuses to carry an unloaded weapon.\n• Fatal Flaw: Fierce loyalty to people who have already betrayed him.',
  },
  {
    id: 'stories',
    title: 'Short Stories',
    icon: Wand2,
    color: 'from-pink-500 to-rose-500',
    accentText: 'text-pink-400',
    borderGlow: 'hover:border-pink-500/50',
    bgBadge: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    tagline: 'Atmospheric prose and captivating dialogue',
    sampleTitle: 'The Echo of Rain',
    sampleGenre: 'Cyberpunk Noir',
    sampleOutput:
      'Neon spilled across the puddles of District 9 like melted candy. Detective Ren paused under the humming awning of the noodle shop, the cybernetic ocular in his left eye adjusting to the flickering sodium haze. "You shouldn’t have come back, Ren," the synth-broker whispered from the shadows. Ren tapped the damp dossier against his trench coat. "When ghosts send invitations, Mira, I always RSVP."',
  },
  {
    id: 'scripts',
    title: 'Scripts & Screenplays',
    icon: Film,
    color: 'from-emerald-400 to-teal-500',
    accentText: 'text-teal-400',
    borderGlow: 'hover:border-teal-500/50',
    bgBadge: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    tagline: 'Standard screenplay formatting & snappy banter',
    sampleTitle: 'EXT. MARS OUTPOST OLYMPUS - DUSK',
    sampleGenre: 'Thriller / Drama',
    sampleOutput:
      'A violent crimson dust storm bathes the solar array in eerie twilight.\n\nKIRA (30s, spacesuit scratched, breathing heavily) wrenches the emergency manual hatch lever.\n\nKIRA\n(into comms)\nControl, do not open the airlock! The sample... it is not dormant!\n\nSTATIC crackles through the radio. Then, a soothing synthetic voice:\n\nSYNTH VOICE (V.O.)\nWelcome home, Commander. Decompression initiated.',
  },
]

export default function HomePage() {
  const [activeMode, setActiveMode] = useState(CREATIVE_MODES[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMode.sampleOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-purple-500/30 shadow-lg shadow-purple-500/10 text-xs sm:text-sm font-medium text-purple-300 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Next-Generation Creative Storytelling Studio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Ignite Your Imagination with{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            StorySpark AI
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
          Craft high-concept story ideas, structured plot outlines, memorable characters, evocative short stories, and cinematic screenplays in seconds.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/generate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all duration-200 hover:scale-[1.02]"
          >
            <Wand2 className="w-5 h-5" />
            Launch Story Generator
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#modes"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Explore 5 Creative Modes
          </a>
        </div>

        {/* Trust & Highlights Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-900 text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <Flame className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Creative Flexibility</p>
              <p className="text-sm font-semibold text-white">5 Writing Modes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <Wand2 className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Powered by AI</p>
              <p className="text-sm font-semibold text-white">Gemini Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Authentication</p>
              <p className="text-sm font-semibold text-white">Firebase Secure</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <History className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Saved Stories</p>
              <p className="text-sm font-semibold text-white">Cloud Firestore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 5 Creative Modes Showcase Section */}
      <section id="modes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            One Studio. Five Ways to Create.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Choose any mode below to see a real sample of what StorySpark AI can compose for your next masterpiece.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {CREATIVE_MODES.map((mode) => {
            const Icon = mode.icon
            const isSelected = activeMode.id === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-r ${mode.color} text-white shadow-lg shadow-purple-500/20 scale-105`
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {mode.title}
              </button>
            )
          })}
        </div>

        {/* Dynamic Mode Preview Card */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Card Header Bar */}
          <div className="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/70">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${activeMode.bgBadge}`}>
                {activeMode.title}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Genre: <span className="text-slate-200">{activeMode.sampleGenre}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy text"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <Link
                to={`/generate?mode=${activeMode.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg shadow-sm transition-colors"
              >
                Try in Generator
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {activeMode.sampleTitle}
            </h3>
            <p className="text-xs text-purple-300 mb-6 italic">
              {activeMode.tagline}
            </p>
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-slate-200 font-normal leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {activeMode.sampleOutput}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Props Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition-all duration-300">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Custom Tones & Styles</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Fine-tune your narratives with genres like Cyberpunk, Dark Fantasy, Cozy Mystery, and tones ranging from humorous to grimdark.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/40 transition-all duration-300">
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 w-fit mb-4">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cloud Story Vault</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Never lose an idea. Every generated concept, character, and scene is securely preserved in your personal Firestore library.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Creative Sparks</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get past writer’s block in seconds with prompt recommendations and intelligent AI-powered completions.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-purple-900/60 via-pink-900/40 to-slate-900 border border-purple-500/30 text-center shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Spark Your Next Great Story?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-base sm:text-lg">
            Create an account in moments, save your favorite lore, and explore endless story possibilities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-lg shadow-purple-500/30 transition-transform hover:scale-105"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 transition-colors"
            >
              Sign In with Email or Google
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
