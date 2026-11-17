export type Role = "child" | "parent" | "educator";

export const ROLES: { id: Role; label: string; emoji: string; blurb: string }[] = [
  {
    id: "child",
    label: "Child / Student",
    emoji: "🌱",
    blurb: "Calm cards, therapist chat, and gentle steps.",
  },
  {
    id: "parent",
    label: "Parent / Guardian",
    emoji: "🏡",
    blurb: "Instant card alerts, home tips, and needs setup.",
  },
  {
    id: "educator",
    label: "Educator / School",
    emoji: "📚",
    blurb: "Classroom cues and learning adaptations.",
  },
];

export type Condition = {
  id: string;
  label: string;
  group: (typeof GROUPS)[number];
  tools: string[];
};

export const GROUPS = [
  "Neurodevelopmental & Focus",
  "Learning & Processing",
  "Anxiety, OCD & Trauma",
  "Mood & Emotional Regulation",
  "Speech & Tic Conditions",
] as const;

export const CONDITIONS: Condition[] = [
  {
    id: "adhd",
    group: GROUPS[0],
    label: "ADHD",
    tools: ["Low-distraction view", "Therapist chat", "Focus steps"],
  },
  {
    id: "ef",
    group: GROUPS[0],
    label: "Executive Functioning",
    tools: ["Step breakdowns", "Visual prompts"],
  },
  {
    id: "asd",
    group: GROUPS[0],
    label: "Autism Spectrum / ASD",
    tools: ["Predictable layout", "Tap-to-talk", "Calm colors"],
  },
  {
    id: "spd",
    group: GROUPS[0],
    label: "Sensory Processing / SPD",
    tools: ["Extra-muted palette", "Zero flash motion"],
  },
  {
    id: "dyslexia",
    group: GROUPS[1],
    label: "Dyslexia",
    tools: ["Lexend font", "Reading ruler", "Syllables", "Read aloud"],
  },
  {
    id: "dysgraphia",
    group: GROUPS[1],
    label: "Dysgraphia",
    tools: ["Therapist chat", "Tap-to-talk cards"],
  },
  {
    id: "dyscalculia",
    group: GROUPS[1],
    label: "Dyscalculia",
    tools: ["Visual counters", "Low-pressure steps"],
  },
  {
    id: "anxiety",
    group: GROUPS[2],
    label: "Anxiety & Social Phobia",
    tools: ["No-pressure sharing", "Breathing SOS", "Break signal"],
  },
  {
    id: "ocd",
    group: GROUPS[2],
    label: "OCD & Intrusive Thoughts",
    tools: ["Grounding reframes", "Gentle pacing"],
  },
  {
    id: "ptsd",
    group: GROUPS[2],
    label: "PTSD & Trauma Recovery",
    tools: ["Safe-harbor calm", "5-4-3-2-1 grounding"],
  },
  {
    id: "panic",
    group: GROUPS[2],
    label: "Panic Disorder",
    tools: ["SOS calm button", "Slow breath pulse"],
  },
  {
    id: "depression",
    group: GROUPS[3],
    label: "Depression & Low Mood",
    tools: ["Feelings log", "Micro-wins"],
  },
  {
    id: "dmdd",
    group: GROUPS[3],
    label: "Emotional Dysregulation / DMDD",
    tools: ["Cooldown meter", "Choice cards"],
  },
  {
    id: "bipolar",
    group: GROUPS[3],
    label: "Bipolar & Mood Cycles",
    tools: ["Energy logs", "Parent alerts"],
  },
  {
    id: "mutism",
    group: GROUPS[4],
    label: "Selective Mutism",
    tools: ["Tap-to-talk soundboard", "Zero verbal demand"],
  },
  {
    id: "tourette",
    group: GROUPS[4],
    label: "Tourette & Tic Disorders",
    tools: ["Calm zone", "Discrete teacher cue"],
  },
];

export const has = (sel: string[], ...ids: string[]) => ids.some((i) => sel.includes(i));
