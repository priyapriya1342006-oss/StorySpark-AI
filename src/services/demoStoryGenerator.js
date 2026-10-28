/**
 * StorySpark AI - Demo Story Generator Service
 *
 * NOTE: This is clearly labelled DEMO output.
 * In Phase 5, this service will be replaced or augmented with real AI (Gemini API) calls.
 */

export const DEMO_NOTICE =
  '📌 [DEMO PREVIEW] Real AI story generation will be connected in Phase 5. This is sample output demonstrating formatting and tone.'

export function generateDemoContent({ mode, prompt, genre, language, tone, length }) {
  const cleanPrompt = prompt.trim() || 'A lone traveler in a forgotten world'

  switch (mode) {
    case 'idea':
      return `${DEMO_NOTICE}

✨ STORY IDEA: THE SPARK
----------------------------------------
• High-Concept Premise:
In a world shaped by ${genre.toLowerCase()} elements, ${cleanPrompt}. 

• Core Dilemma & Conflict:
The protagonist must balance their deepest desire with an escalating crisis that threatens everything they hold dear. With a ${tone.toLowerCase()} undertone, every choice comes at a steep personal cost.

• Narrative Hook (Page 1):
The story opens on the exact moment the everyday order crumbles—a mysterious sign or forgotten relic reawakens without warning.

• The Game-Changing Twist:
The force the hero fought to destroy was originally created to protect them from a far worse reckoning.

• Recommended Target Length: ${length}
• Language: ${language} | Tone: ${tone}`

    case 'plot':
      return `${DEMO_NOTICE}

🗺️ PLOT & OUTLINE BREAKDOWN
----------------------------------------
Genre: ${genre} | Tone: ${tone} | Language: ${language}
Seed Idea: "${cleanPrompt}"

ACT I: THE ORDINARY WORLD & INCITING INCIDENT
• Status Quo: Introduction to the central setting, highlighting everyday struggles through a ${tone.toLowerCase()} lens.
• The Inciting Spark: A disruption directly tied to "${cleanPrompt}".
• Point of No Return: The protagonist is pushed past their comfort zone and commits to an irreversible decision.

ACT II: ESCALATION & THE MIDPOINT SHIFT
• Rising Friction: Allies and rivals clash; initial plans unravel rapidly under unforeseen pressure.
• The Midpoint Revelation: A startling discovery fundamentally changes the stakes. What seemed like a simple task is revealed to be a far broader conspiracy.
• The Dark Night of the Soul: All resources exhausted, hope dwindles, and the main character confronts their fatal flaw.

ACT III: THE CLIMAX & RESOLUTION
• The Reckoning: The final confrontation where courage and sacrifice decide the outcome.
• Resolution: The immediate aftermath—new equilibriums are formed, though scars and lessons remain.

• Scope: Designed for ${length}.`

    case 'character':
      return `${DEMO_NOTICE}

👤 CHARACTER FORGE: DOSSIER
----------------------------------------
Genre: ${genre} | Tone: ${tone} | Seed: "${cleanPrompt}"

• Name: Rowan Vane (The Wanderer of the Verge)
• Archetype: Reluctant Guardian / Tragic Visionary
• Outward Appearance: Weathered cloak with subtle luminescent embroidery, keen observant gaze, and hands scarred from years of survival.

• Psychological Profile:
  - Core Motivation: To uncover the truth behind "${cleanPrompt}" before history repeats itself.
  - Fatal Flaw: Paralyzing mistrust of those who offer help without demanding a price.
  - Secret Quirks: Never sits with back to an open door; silently counts backward when under intense pressure.

• Central Conflict:
Torn between self-preservation and a lingering moral obligation to protect innocent bystanders who cross their path.

• Defining Dialogue Quote:
"Survival is easy. Living with what you had to do to survive is where the true battle begins."`

    case 'script':
      return `${DEMO_NOTICE}

🎬 SCREENPLAY / SCRIPT FORMAT
----------------------------------------
TITLE: SPARK OF THE UNKNOWN
GENRE: ${genre.toUpperCase()} | TONE: ${tone.toUpperCase()}

EXT. FORGOTTEN OUTPOST - TWILIGHT

A howling wind whips across the desolate horizon. Low-frequency hums reverberate through the metallic wreckage.

KIRA (30s), wearing worn tactical gear and an ocular visor, steps cautiously over fractured cobblestones. She grips a handheld tracker.

KIRA
(whispering into radio transmitter)
Control, I have reached the perimeter. The energy signature from "${cleanPrompt}" is spiking.

STATIC hiss answers. Then, a fractured voice breaks through.

RADIO DISPATCH (V.O.)
Kira, fall back immediately. The grid did not shut down... it was bypassed.

Kira freezes. In the reflection of her visor, a strange luminescent symbol blinks into existence.

KIRA
Too late. Whatever was buried here... is awake.

She raises her sidearm as the ambient lighting turns violently crimson.

FADE OUT.`

    case 'full_story':
    default:
      return `${DEMO_NOTICE}

📖 COMPLETE STORY DRAFT
----------------------------------------
Genre: ${genre} | Style & Tone: ${tone} | Language: ${language}
Prompt: "${cleanPrompt}"

The silence that settled over the valley was not born of peace; it was the tense stillness that precedes an avalanche.

For as long as anyone could remember, the legend of "${cleanPrompt}" had been whispered around hearth fires as a cautionary tale. Yet standing now on the rain-slick precipice, the reality surpassed every fearful rumor. The air tasted faintly of ozone and ancient earth, humming with a frequency that vibrated deep in the chest.

"We shouldn't linger here," Jesse cautioned, drawing their cloak tighter against the gathering chill. The atmosphere felt heavy, dripping with ${tone.toLowerCase()} resonance. Every shadow among the jagged stone arches seemed to stretch with conscious intent.

"If we turn back now, we leave the answered questions to someone who won't hesitate to weaponize them," came the quiet retort.

A sudden gust tore across the ridge, scattering loose gravel into the abyss below. Far below, a singular beacon flared to life—a solitary, piercing light piercing the gloom. Whatever awaited in the depths, the journey had begun, and there was no turning back.

[End of ${length} preview]`
  }
}
