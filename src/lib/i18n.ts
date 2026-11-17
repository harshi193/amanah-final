export type Language = "en" | "ar" | "hi";

export const LANGUAGES: { id: Language; label: string; native: string }[] = [
  { id: "en", label: "English", native: "English" },
  { id: "ar", label: "Arabic", native: "العربية" },
  { id: "hi", label: "Hindi", native: "हिन्दी" },
];

type TranslationDict = {
  brand: string;
  nav: {
    home: string;
    about: string;
    studio: string;
    partnership: string;
    chat: string;
    rolesAndNeeds: string;
    needsCount: (n: number) => string;
    openStudio: string;
    alertSingular: string;
    studentNeedsRole: string;
    parentEducatorOnly: string;
    roleLabel: string;
    done: string;
    skipToContent: string;
    logIn: string;
    logOut: string;
    signedInAs: (name: string, role: string) => string;
  };
  comfort: {
    light: string;
    dark: string;
    highContrast: string;
    offlineOn: string;
    offline: string;
    offlineOff: string;
    sync: (n: number) => string;
    install: string;
    settingsUnlocked: string;
    parentTeacherPin: string;
    languageLabel: string;
  };
  guardian: {
    title: string;
    prompt: string;
    wrongPin: string;
    demoPin: string;
    clear: string;
    unlock: string;
    screenLayout: string;
    laptop: string;
    tablet: string;
    mobile: string;
    switchText: string;
    lockReturn: string;
  };
  signin: {
    welcome: string;
    who: string;
    firstNameOptional: string;
    signInBtn: string;
    orgNameLabel: string;
    orgNamePlaceholder: string;
    orgRequiredHint: string;
    studentFeedHeading: string;
    chooseExistingStudent: string;
    orAddNewStudent: string;
    roles: Record<
      "child" | "parent" | "educator",
      { title: string; short: string; placeholder: string }
    >;
  };
  roles: Record<
    "child" | "parent" | "educator",
    { label: string; shortLabel: string; blurb: string }
  >;
  conditions: {
    groups: readonly string[];
    items: Record<string, { label: string; tools: string[] }>;
  };
  hero: {
    offlineSpeech: string;
    onlineSpeech: (name: string) => string;
    title: string;
    subtitle: string;
    openStudio: string;
    askNoor: string;
    photoBadge: string;
    photoAlt: string;
  };
  home: {
    parentAlertsTitle: string;
    testInStudio: string;
    offlineTag: string;
    seen: string;
    acknowledge: string;
    classroomCuesTitle: string;
    cues: { name: string; cue: string }[];
    latestCheckin: string;
    aboutTag: string;
    aboutHeading: string;
    seeStory: string;
    activeRoleHeading: string;
    adultControlsSub: string;
    studentNeedsHeading: string;
    tunesSub: string;
    footerTagline: string;
    educatorRoster: {
      title: string;
      subtitle: string;
      activeBadge: string;
      noActiveTitle: string;
      noActiveDesc: string;
      loginBtn: string;
      activeBtn: string;
      logoutBtn: string;
      addBtn: string;
      cancelBtn: string;
      saveAndLoginBtn: string;
      openStudioBtn: string;
      quickNoteTitle: string;
      quickMoodLabel: string;
      quickNotePlaceholder: string;
      saveCheckinBtn: string;
      nameLabel: string;
      namePlaceholder: string;
      cueLabel: string;
      cuePlaceholder: string;
      needsLabel: string;
      notesLabel: string;
      notesPlaceholder: string;
      editBtn: string;
      saveChangesBtn: string;
      removeBtn: string;
      recentDataTitle: string;
      checkinsCount: (n: number) => string;
      alertsCount: (n: number) => string;
      cardsCount: (n: number) => string;
      noCheckins: string;
      lastLogin: string;
      sessionBanner: (name: string) => string;
      switchStudent: string;
      needsCountLabel: (n: number) => string;
      searchPlaceholder: string;
      startWithStudent: string;
      rosterChoice: string;
      orgLabel: string;
      orgPlaceholder: string;
      orgMissingPrompt: string;
      orgEditBtn: string;
      orgSaveBtn: string;
      studentCodeLabel: string;
      studentCodePlaceholder: string;
      gradeLabel: string;
      gradePlaceholder: string;
      detailsTitle: string;
    };
    parentEmail: {
      title: string;
      subtitle: string;
      ruleBadge: string;
      childNameLabel: string;
      childNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      registerBtn: string;
      updateBtn: string;
      pairExistsHint: (child: string, email: string) => string;
      invalidEmail: string;
      savedNotice: (child: string, email: string) => string;
      updatedNotice: (child: string, email: string) => string;
      activeNoVerify: string;
      removeBtn: string;
      editBtn: string;
      noPairsYet: string;
      notifiedBadge: (email: string) => string;
      queuedEmailBadge: (email: string) => string;
      inAppOnlyBadge: string;
    };
  };
  toolkit: {
    items: { title: string; desc: string }[];
  };
  problemSolution: {
    problemTitle: string;
    problems: string[];
    solutionTitle: string;
    solutions: string[];
  };
  sdg: {
    before: string;
    withAmanah: string;
    cards: {
      number: number;
      title: string;
      target: string;
      headlineStat: string;
      beforeLabel: string;
      afterLabel: string;
    }[];
  };
  vision: {
    title: string;
    milestones: { year: string; title: string; sub: string; pct: number }[];
  };
  bridge: {
    eyebrow: string;
    heading: string;
    uaeHeading: string;
    uaeBadge: string;
    indiaHeading: string;
    indiaBadge: string;
    combinedPrefix: string;
    sdgImpact: string;
    pairs: {
      id: string;
      label: string;
      uaeTitle: string;
      uaeDetail: string;
      indiaTitle: string;
      indiaDetail: string;
      combinedOutcome: string;
      sdgTarget: string;
      metricValue: string;
      metricLabel: string;
      baselineNote: string;
      fillPercent: number;
    }[];
  };
  progress: {
    levelLabel: (lvl: number, title: string) => string;
    levelTitles: string[];
    journeyTitle: string;
    dayStreak: (n: number) => string;
    progressTo: (lvl: number) => string;
    completed: string;
    steps: { id: string; label: string; xp: string; to: "/studio" | "/chat" }[];
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    doveSpeech: string;
    photoCaptionTag: string;
    photoCaptionTitle: string;
    whyExists: string;
    problemSolutionTitle: string;
    indiaTag: string;
    indiaSubtitle: string;
    pillarsTag: string;
    pillars: { t: string; d: string }[];
    openStudioBtn: string;
    sdgImpactBtn: string;
  };
  partnership: {
    eyebrow: string;
    title: string;
    subtitle: string;
    uaeLabel: string;
    uaeTitle: string;
    indiaLabel: string;
    indiaTitle: string;
    privacyTitle: string;
    privacyPoints: string[];
  };
  studio: {
    offlineLabel: string;
    label: string;
    heading: string;
    initialDove: string;
    savedOffline: (pts: number) => string;
    savedOnline: (pts: number) => string;
    parentAlertOffline: string;
    parentAlertOnline: (card: string) => string;
    parentAlertOnlineEmail: (card: string, email: string) => string;
    therapistSentDove: string;
    tabs: {
      cards: string;
      mood: string;
      therapist: string;
      canvas: string;
      journey: string;
    };
    tapTitle: string;
    tapNote: string;
    parentEmailLinked: (email: string) => string;
    parentNotified: (card: string, offline: boolean) => string;
    parentNotifiedEmail: (card: string, email: string, offline: boolean) => string;
    cards: { id: string; label: string; speak: string }[];
    moodTitle: string;
    moods: { id: string; label: string; e: string }[];
    intensity: string;
    saveMood: string;
    sosTitle: string;
    sosNote: string;
    startSos: string;
    breatheIn: string;
    breatheOut: string;
    doneXp: string;
    cooldownTitle: string;
    cooldownLevels: string[];
    cooldownTips: string[];
    therapistTitle: string;
    therapistNote: string;
    therapistName: string;
    therapistRole: string;
    savesOffline: string;
    careConnected: string;
    therapistPrompts: string[];
    therapistPlaceholder: string;
    send: string;
    sending: string;
    listen: string;
    offlineQueued: string;
    writingTitle: string;
    writingNote: string;
    readAloud: string;
    rulerOn: string;
    rulerOff: string;
    syllablesOn: string;
    syllablesOff: string;
    defaultCanvasText: string;
    saveNote: string;
    recentShares: string;
    syncedLabel: string;
    offlineLabelTag: string;
    addCardTile: string;
    addCardTitle: string;
    addCardNote: string;
    cardLabel: string;
    cardLabelPlaceholder: string;
    cardQuickLabels: string[];
    photoStep: string;
    takeOrUploadPhoto: string;
    useCamera: string;
    snapPhoto: string;
    closeCamera: string;
    cameraUnavailable: string;
    voiceStep: string;
    recordVoice: string;
    stopRecording: string;
    reRecord: string;
    micUnavailable: string;
    voiceRecordedReady: string;
    saveCard: string;
    cancel: string;
    deleteCard: string;
    customVoicePlayed: (label: string) => string;
    firstThen: {
      title: string;
      subtitle: string;
      firstBadge: string;
      firstTask: string;
      firstAction: string;
      firstDone: string;
      thenBadge: string;
      thenTask: string;
      lockedNote: string;
      openStory: string;
      hideStory: string;
      storyTitle: string;
      storyText: string;
      stories: { title: string; text: string }[];
      newStory: string;
      storyCounter: (current: number, total: number) => string;
      educatorPreview: string;
      listenStory: string;
      startTimer: string;
      pauseTimer: string;
      resetTimer: string;
      claimReward: string;
      rewardClaimed: string;
      rewardEarnedDove: string;
    };
  };
  chat: {
    welcome: string;
    cleared: string;
    title: string;
    offlineStatus: string;
    geminiStatus: string;
    clearBtn: string;
    openTabBtn: string;
    closeBtn: string;
    readAloud: string;
    geminiTag: string;
    offlineGuideTag: string;
    thinking: string;
    busyFallback: string;
    networkFallback: string;
    placeholder: string;
    closeNoor: string;
    askNoor: string;
    pageTitle: string;
    pageDesc: string;
    doveSpeech: string;
    activeRole: string;
    tailoredNeeds: string;
    generalComfort: string;
    promptsByRole: Record<"child" | "parent" | "educator", string[]>;
  };
};

const EN: TranslationDict = {
  brand: "Amanah",
  nav: {
    home: "Home",
    about: "About",
    studio: "Studio",
    partnership: "SDG & Impact",
    chat: "Dove Chat",
    rolesAndNeeds: "Roles & Needs",
    needsCount: (n) => `Needs (${n})`,
    openStudio: "Open Studio",
    alertSingular: "Alert",
    studentNeedsRole: "Student Needs & Role",
    parentEducatorOnly: "Parent & Educator tools — never shown on the student view.",
    roleLabel: "Role",
    done: "Done",
    skipToContent: "Skip to content",
    logIn: "Log in",
    logOut: "Log out",
    signedInAs: (name, role) => `${name} (${role})`,
  },
  comfort: {
    light: "Light",
    dark: "Dark",
    highContrast: "High Contrast",
    offlineOn: "Offline: On",
    offline: "Offline",
    offlineOff: "Offline: Off",
    sync: (n) => `Sync ${n}`,
    install: "Install",
    settingsUnlocked: "Settings (Unlocked)",
    parentTeacherPin: "Parent / Teacher PIN",
    languageLabel: "Language",
  },
  guardian: {
    title: "Parent & Teacher Settings",
    prompt:
      "Enter the 4-digit Parent / Teacher PIN to change Laptop / Tablet / Mobile layout or switch user.",
    wrongPin: "Incorrect PIN. Try 1234.",
    demoPin: "Demo PIN: 1234",
    clear: "Clear",
    unlock: "Unlock",
    screenLayout: "Screen Layout Mode",
    laptop: "Laptop",
    tablet: "Tablet",
    mobile: "Mobile",
    switchText: "Switch",
    lockReturn: "Lock & Return",
  },
  signin: {
    welcome: "Welcome to Amanah",
    who: "Who is signing in?",
    firstNameOptional: "First name (optional)",
    signInBtn: "Log in",
    orgNameLabel: "Organisation / School name",
    orgNamePlaceholder: "e.g. Al Noor Inclusive Academy",
    orgRequiredHint: "Required for educators — saved with student records.",
    studentFeedHeading: "Student details",
    chooseExistingStudent: "Select existing student",
    orAddNewStudent: "Or feed new student details",
    roles: {
      child: {
        title: "Child / Student",
        short: "Calm tools & tap-to-talk",
        placeholder: "e.g. Aarav",
      },
      parent: {
        title: "Parent / Guardian",
        short: "Alerts, needs & home support",
        placeholder: "e.g. Priya",
      },
      educator: {
        title: "Educator / School",
        short: "Organisation, student details & cues",
        placeholder: "e.g. Ms. Fatima",
      },
    },
  },
  roles: {
    child: {
      label: "Child / Student",
      shortLabel: "Student",
      blurb: "Calm cards, therapist chat, and gentle steps.",
    },
    parent: {
      label: "Parent / Guardian",
      shortLabel: "Parent",
      blurb: "Instant card alerts, home tips, and needs setup.",
    },
    educator: {
      label: "Educator / School",
      shortLabel: "Educator",
      blurb: "Classroom cues and learning adaptations.",
    },
  },
  conditions: {
    groups: [
      "Neurodevelopmental & Focus",
      "Learning & Processing",
      "Anxiety, OCD & Trauma",
      "Mood & Emotional Regulation",
      "Speech & Tic Conditions",
    ],
    items: {
      adhd: { label: "ADHD", tools: ["Low-distraction view", "Care Team chat", "Focus steps"] },
      ef: { label: "Executive Functioning", tools: ["Step breakdowns", "Visual prompts"] },
      asd: {
        label: "Autism Spectrum / ASD",
        tools: ["Predictable layout", "Tap-to-talk", "Calm colors"],
      },
      spd: {
        label: "Sensory Processing / SPD",
        tools: ["Extra-muted palette", "Zero flash motion"],
      },
      dyslexia: {
        label: "Dyslexia",
        tools: ["Lexend font", "Reading ruler", "Syllables", "Read aloud"],
      },
      dysgraphia: { label: "Dysgraphia", tools: ["Therapist chat", "Tap-to-talk cards"] },
      dyscalculia: { label: "Dyscalculia", tools: ["Visual counters", "Low-pressure steps"] },
      anxiety: {
        label: "Anxiety & Social Phobia",
        tools: ["No-pressure sharing", "Breathing SOS", "Break signal"],
      },
      ocd: { label: "OCD & Intrusive Thoughts", tools: ["Grounding reframes", "Gentle pacing"] },
      ptsd: {
        label: "PTSD & Trauma Recovery",
        tools: ["Safe-harbor calm", "5-4-3-2-1 grounding"],
      },
      panic: { label: "Panic Disorder", tools: ["SOS calm button", "Slow breath pulse"] },
      depression: { label: "Depression & Low Mood", tools: ["Feelings log", "Micro-wins"] },
      dmdd: {
        label: "Emotional Dysregulation / DMDD",
        tools: ["Cooldown meter", "Choice cards"],
      },
      bipolar: { label: "Bipolar & Mood Cycles", tools: ["Energy logs", "Parent alerts"] },
      mutism: {
        label: "Selective Mutism",
        tools: ["Tap-to-talk soundboard", "Zero verbal demand"],
      },
      tourette: { label: "Tourette & Tic Disorders", tools: ["Calm zone", "Discrete teacher cue"] },
    },
  },
  hero: {
    offlineSpeech: "Offline Mode active — everything saves locally.",
    onlineSpeech: (name) => `Hi ${name || "friend"}! Calm tools & instant parent alerts are ready.`,
    title: "Every child heard, calmly.",
    subtitle: "Sensory-friendly expression, instant parent notifications, and Vision 2030 care.",
    openStudio: "Open Studio",
    askNoor: "Ask Noor",
    photoBadge: "Vision 2030 · SDG 3",
    photoAlt: "Child and mother exploring pastel visual cards together",
  },
  home: {
    parentAlertsTitle: "Parent Tap-to-Talk Alerts",
    testInStudio: "Test in Studio →",
    offlineTag: "Offline",
    seen: "Seen",
    acknowledge: "Acknowledge",
    classroomCuesTitle: "Classroom Quick Cues",
    cues: [
      { name: "Aarav K.", cue: "Seat near window · visual cards" },
      { name: "Layla M.", cue: "10-min task chunks" },
      { name: "Noor A.", cue: "Accept tap-to-talk · zero verbal demand" },
    ],
    latestCheckin: "Latest student check-in:",
    aboutTag: "About Us · أمانة",
    aboutHeading: "Our Problem & Solution",
    seeStory: "See photos & story →",
    activeRoleHeading: "1 · Active Role",
    adultControlsSub: "Parent & Educator controls",
    studentNeedsHeading: "2 · Student Needs",
    tunesSub: "Tunes fonts, calm palette, and tools.",
    footerTagline: "Vision 2030 & SDG 3",
    educatorRoster: {
      title: "Classroom Students · Individual Login",
      subtitle:
        "Log in a student to load and save their personal sensory profile, check-ins, and progress every time.",
      activeBadge: "Logged in",
      noActiveTitle: "No student logged in yet",
      noActiveDesc:
        "Select a student below to log them in with their saved data, or add a new student.",
      loginBtn: "Log in student",
      activeBtn: "Currently active",
      logoutBtn: "Log out student",
      addBtn: "Add & log in new student",
      cancelBtn: "Cancel",
      saveAndLoginBtn: "Save & log in student",
      openStudioBtn: "Open student Studio",
      quickNoteTitle: "Log quick check-in / observation",
      quickMoodLabel: "Mood / state",
      quickNotePlaceholder: "e.g. Focused calmly with reading ruler",
      saveCheckinBtn: "Save to student record",
      nameLabel: "Student name",
      namePlaceholder: "e.g. Zayd R.",
      cueLabel: "Classroom cue / accommodation",
      cuePlaceholder: "e.g. Quiet seat near window · visual schedule",
      needsLabel: "Support needs (auto-tunes Studio)",
      notesLabel: "Educator notes (optional)",
      notesPlaceholder: "Sensory preferences, calming routines, or parent sync notes",
      editBtn: "Edit",
      saveChangesBtn: "Save changes",
      removeBtn: "Remove",
      recentDataTitle: "Saved student data",
      checkinsCount: (n) => `${n} check-in${n === 1 ? "" : "s"}`,
      alertsCount: (n) => `${n} alert${n === 1 ? "" : "s"}`,
      cardsCount: (n) => `${n} custom card${n === 1 ? "" : "s"}`,
      noCheckins: "No check-ins recorded yet for this student.",
      lastLogin: "Last login",
      sessionBanner: (name) => `Logged in: ${name}`,
      switchStudent: "Switch student",
      needsCountLabel: (n) => `${n} need${n === 1 ? "" : "s"}`,
      searchPlaceholder: "Search students…",
      startWithStudent: "Log in student (optional)",
      rosterChoice: "Choose from Classroom Roster after sign-in",
      orgLabel: "Organisation / School name",
      orgPlaceholder: "e.g. Al Noor Inclusive Academy",
      orgMissingPrompt: "Enter your organisation or school name to link student records.",
      orgEditBtn: "Edit organisation",
      orgSaveBtn: "Save organisation",
      studentCodeLabel: "Student ID / Code",
      studentCodePlaceholder: "e.g. STU-104",
      gradeLabel: "Grade / Class",
      gradePlaceholder: "e.g. Grade 4 · Section B",
      detailsTitle: "Organisation & Student Details",
    },
    parentEmail: {
      title: "Register Child Notification Email",
      subtitle:
        "Register your child with one parent email ID to get instant notifications—no verification email needed.",
      ruleBadge: "1 email per parent–child pair · Instant activation",
      childNameLabel: "Child's name",
      childNamePlaceholder: "e.g. Aarav",
      emailLabel: "Parent notification email ID",
      emailPlaceholder: "e.g. priya@family.com",
      registerBtn: "Register child email",
      updateBtn: "Update pair email",
      pairExistsHint: (child, email) =>
        `This parent–child pair (${child}) already uses ${email}. Saving updates this single email.`,
      invalidEmail: "Please enter a valid email address and child name.",
      savedNotice: (child, email) => `Registered ${email} for ${child} (no verification needed).`,
      updatedNotice: (child, email) => `Updated ${child}'s single parent email to ${email}.`,
      activeNoVerify: "Active · No verification needed",
      removeBtn: "Remove",
      editBtn: "Edit email",
      noPairsYet: "No child registered yet. Add your child's name and your email above.",
      notifiedBadge: (email) => `Email notified: ${email}`,
      queuedEmailBadge: (email) => `Email queued offline: ${email}`,
      inAppOnlyBadge: "In-app alert",
    },
  },
  toolkit: {
    items: [
      { title: "Calm SOS", desc: "5s breath pulse" },
      { title: "Tap-to-Talk", desc: "Notifies parents" },
      { title: "Dyslexia Ruler", desc: "Weighted Lexend" },
      { title: "Offline Ready", desc: "Zero signal needed" },
    ],
  },
  problemSolution: {
    problemTitle: "The Problem",
    problems: [
      "• 16-week specialist waitlists",
      "• Disconnected parent & school alerts",
      "• Loud, stressful portals",
    ],
    solutionTitle: "Our Solution",
    solutions: [
      "• 48-hour UAE–India async care",
      "• Instant Tap-to-Talk parent alerts",
      "• Adaptive offline sensory studio",
    ],
  },
  sdg: {
    before: "Before",
    withAmanah: "With Amanah",
    cards: [
      {
        number: 3,
        title: "Good Health & Well-being",
        target: "SDG 3.4 & 3.8",
        headlineStat: "48 hrs",
        beforeLabel: "16 wks clinic wait",
        afterLabel: "48 hrs async guidance",
      },
      {
        number: 4,
        title: "Quality Education",
        target: "SDG 4.5",
        headlineStat: "3,100+",
        beforeLabel: "Static paper notes",
        afterLabel: "Live school adaptations",
      },
      {
        number: 17,
        title: "Partnerships for the Goals",
        target: "SDG 17.6",
        headlineStat: "70% less",
        beforeLabel: "100% clinic cost",
        afterLabel: "30% cross-border cost",
      },
    ],
  },
  vision: {
    title: "Vision 2030 · SDG 3 Horizon",
    milestones: [
      { year: "2026", title: "UAE–India Pilot", sub: "86 schools · 210 specialists", pct: 38 },
      {
        year: "2028",
        title: "Offline Regional Scale",
        sub: "Zero-signal home & class tools",
        pct: 68,
      },
      { year: "2030", title: "Vision 2030 · SDG 3", sub: "Universal calm child care", pct: 100 },
    ],
  },
  bridge: {
    eyebrow: "Bilateral Synergy · Directly Advancing SDG 3",
    heading: "Two strengths paired make one stronger care circle",
    uaeHeading: "United Arab Emirates",
    uaeBadge: "Infrastructure & Protection",
    indiaHeading: "India",
    indiaBadge: "Clinical Depth & Engineering",
    combinedPrefix: "Combined Solution",
    sdgImpact: "SDG 3 Impact",
    pairs: [
      {
        id: "screening",
        label: "01. Rapid Review",
        uaeTitle: "Inclusive School Infrastructure",
        uaeDetail:
          "Mandatory classroom screening & well-resourced inclusion desks in Dubai and Abu Dhabi schools.",
        indiaTitle: "Multilingual Clinical Specialists",
        indiaDetail:
          "Deep pool of RCI-certified speech, occupational, and child developmental therapists across Bengaluru, Mumbai, and Kochi.",
        combinedOutcome:
          "School observations flow directly to Indian specialists asynchronously—eliminating language gaps and 4–6 month waitlists.",
        sdgTarget: "SDG 3.4 & 3.8 · Mental well-being and timely specialist access",
        metricValue: "48 hrs",
        metricLabel: "Average first therapist guidance turnaround (down from 16 weeks)",
        baselineNote: "Measured pilot benchmark across UAE partner classrooms",
        fillPercent: 86,
      },
      {
        id: "frugal",
        label: "02. Affordable Reach",
        uaeTitle: "Sustainable Health Funding & Cloud",
        uaeDetail:
          "Sovereign digital health standards, school-level sponsorship, and stable public-private financing.",
        indiaTitle: "Accessible Digital Engineering",
        indiaDetail:
          "Low-bandwidth, offline-capable mobile & assistive software engineering built for diverse home devices.",
        combinedOutcome:
          "UAE backing sustains free family access while Indian engineering keeps per-child delivery lightweight and offline-resilient.",
        sdgTarget: "SDG 3.c & 17 · Scalable workforce and technology sharing",
        metricValue: "70% lower",
        metricLabel: "Cost per child supported compared with clinic-only care models",
        baselineNote: "Estimated from asynchronous review vs. in-person clinic hours",
        fillPercent: 78,
      },
      {
        id: "continuity",
        label: "03. Home Continuity",
        uaeTitle: "PDPL Child Privacy & Family Trust",
        uaeDetail:
          "Strict UAE data protection, bilingual family onboarding, and explicit guardian consent controls.",
        indiaTitle: "Sensory & Behavioral Care Models",
        indiaDetail:
          "Proven low-cost sensory routines, visual schedules, and parent coaching frameworks tested at scale.",
        combinedOutcome:
          "Parents receive culturally familiar, step-by-step home cues they can practice calmly every evening—even offline.",
        sdgTarget: "SDG 3 & 4 · Continuous child health from clinic to classroom to home",
        metricValue: "2.4×",
        metricLabel: "Higher weekly home-routine follow-through across participating families",
        baselineNote: "Driven by visual Dove prompts and bite-sized caregiver notes",
        fillPercent: 82,
      },
    ],
  },
  progress: {
    levelLabel: (lvl, title) => `Level ${lvl} · ${title}`,
    levelTitles: ["Seedling", "Calm Voice", "Steady Reader", "Horizon Builder", "Olive Keeper"],
    journeyTitle: "Your Calm Journey",
    dayStreak: (n) => `${n} day streak`,
    progressTo: (lvl) => `Progress to Level ${lvl}`,
    completed: "Completed",
    steps: [
      { id: "checkin", label: "Mood Check-in", xp: "+20", to: "/studio" },
      { id: "card", label: "Tap-to-Talk", xp: "+15", to: "/studio" },
      { id: "breathe", label: "Calm Breath", xp: "+25", to: "/studio" },
      { id: "therapist", label: "Talk to Therapist", xp: "+20", to: "/studio" },
      { id: "chat", label: "Ask Noor", xp: "+15", to: "/chat" },
    ],
  },
  about: {
    eyebrow: "About Amanah · Vision 2030",
    title: "Calm, connected care for every neurodivergent learner.",
    subtitle:
      "Amanah connects students, parents, and educators with offline sensory tools and 48-hour UAE–India guidance.",
    doveSpeech: "Guided step by step with Noor.",
    photoCaptionTag: "Dubai & Bengaluru",
    photoCaptionTitle: "Inclusive classrooms paired with multilingual specialists.",
    whyExists: "Why Amanah Exists",
    problemSolutionTitle: "Problem → Solution",
    indiaTag: "India Clinical Network",
    indiaSubtitle: "210+ RCI-certified speech & OT specialists supporting asynchronously.",
    pillarsTag: "Design Pillars",
    pillars: [
      { t: "Consent-First Privacy", d: "UAE PDPL & India DPDP aligned" },
      { t: "Tap-to-Talk Parent Alerts", d: "Instant reassurance & care cues" },
      { t: "100% Offline Toolkit", d: "Breathing, cards & reading ruler" },
    ],
    openStudioBtn: "Open Studio",
    sdgImpactBtn: "SDG & Impact",
  },
  partnership: {
    eyebrow: "UAE–India Strategic Care Corridor · Vision 2030",
    title: "Paired strengths advancing SDG 3 & Vision 2030",
    subtitle:
      "UAE school inclusion infrastructure + Indian multilingual specialists = faster, calmer support for every child.",
    uaeLabel: "United Arab Emirates",
    uaeTitle: "School screening & PDPL sovereign privacy",
    indiaLabel: "India",
    indiaTitle: "Multilingual specialists & offline-first engineering",
    privacyTitle: "Consent & Child Privacy",
    privacyPoints: [
      "Revocable guardian consent per specialist.",
      "Plain visual labels so children know what is shared.",
      "Pseudonymized sensory notes before cross-border review.",
      "Aligned with UAE PDPL and India DPDP Act.",
    ],
  },
  studio: {
    offlineLabel: "Offline Studio",
    label: "Expression Studio",
    heading: "Say it your way",
    initialDove: "Tap a card to speak & notify your parent.",
    savedOffline: (pts) => `Saved offline (+${pts} XP).`,
    savedOnline: (pts) => `Saved (+${pts} XP)!`,
    parentAlertOffline: "Parent alert queued offline (+15 XP).",
    parentAlertOnline: (card) => `Parent notified: ${card} (+15 XP)!`,
    parentAlertOnlineEmail: (card, email) => `Parent notified (${email}): ${card} (+15 XP)!`,
    therapistSentDove: "Sent to Dr. Meera Nair (+20 XP)!",
    tabs: {
      cards: "Tap-to-Talk",
      mood: "Mood & Calm",
      therapist: "Talk to Therapist",
      canvas: "Writing",
      journey: "Progress",
    },
    tapTitle: "Tap-to-Talk",
    tapNote: "Speaks aloud and notifies your parent right away.",
    parentEmailLinked: (email) => `Parent email active: ${email}`,
    parentNotified: (card, offline) =>
      `Parent notified: ${card}${offline ? " (queued offline)" : ""}`,
    parentNotifiedEmail: (card, email, offline) =>
      `Parent notified: ${card} → ${email}${offline ? " (queued offline)" : ""}`,
    cards: [
      { id: "help", label: "🙋 I need help", speak: "I need help" },
      { id: "break", label: "⏸️ I need a break", speak: "I need a break" },
      { id: "loud", label: "🔇 Too loud", speak: "Too loud" },
      { id: "thirsty", label: "💧 Thirsty", speak: "Thirsty" },
      { id: "toilet", label: "🚻 Toilet", speak: "Toilet" },
      { id: "confused", label: "❓ I don't understand", speak: "I don't understand" },
      { id: "yes", label: "👍 Yes", speak: "Yes" },
      { id: "no", label: "👎 No", speak: "No" },
      { id: "hug", label: "🤗 Hug please", speak: "Hug please" },
    ],
    moodTitle: "How are you feeling?",
    moods: [
      { id: "Happy", label: "Happy", e: "😊" },
      { id: "Overwhelmed", label: "Overwhelmed", e: "🌊" },
      { id: "Confused", label: "Confused", e: "🌀" },
      { id: "Tired", label: "Tired", e: "😴" },
      { id: "Anxious", label: "Anxious", e: "🫧" },
      { id: "Proud", label: "Proud", e: "🌟" },
    ],
    intensity: "Intensity",
    saveMood: "Save mood",
    sosTitle: "Calm Reset",
    sosNote: "5-second slow breathing guide.",
    startSos: "Start SOS Calm",
    breatheIn: "Breathe in",
    breatheOut: "Breathe out",
    doneXp: "Done (+25 XP)",
    cooldownTitle: "Cooldown meter",
    cooldownLevels: ["Cool 😌", "Warm 🙂", "Hot 😠", "Boiling 🌋"],
    cooldownTips: [
      "Doing great.",
      "Sip water + 3 slow breaths.",
      "Try a quiet corner.",
      "Pause. Safe space now.",
    ],
    therapistTitle: "Talk to a Therapist",
    therapistNote: "Share how you feel with your Care Team specialist — online or offline.",
    therapistName: "Dr. Meera Nair",
    therapistRole: "Speech & Sensory Care Specialist · Care Team",
    savesOffline: "Saves Offline",
    careConnected: "Care Team Connected",
    therapistPrompts: [
      "Classroom felt too loud today",
      "I want help focusing on reading",
      "I completed a breathing break",
      "Can you share a calm homework tip?",
    ],
    therapistPlaceholder: "Write a calm note to your therapist…",
    send: "Send",
    sending: "Sending gently…",
    listen: "Listen",
    offlineQueued: "Offline queued",
    writingTitle: "Writing canvas",
    writingNote: "Dyslexia-friendly font, ruler, and read-aloud.",
    readAloud: "Read aloud",
    rulerOn: "Ruler on",
    rulerOff: "Ruler off",
    syllablesOn: "Syl·la·bles on",
    syllablesOff: "Syl·la·bles off",
    defaultCanvasText: "Today I felt…",
    saveNote: "Save note",
    recentShares: "Recent shares",
    syncedLabel: "Synced",
    offlineLabelTag: "Offline",
    addCardTile: "Add Card",
    addCardTitle: "Add Custom Tap-to-Talk Card",
    addCardNote:
      "Snap a real photo and record your own familiar voice for this item or quiet space.",
    cardLabel: "Card label",
    cardLabelPlaceholder: "e.g. Blue water bottle",
    cardQuickLabels: ["My water bottle", "Favorite fidget toy", "Quiet corner"],
    photoStep: "1 · Real Photo",
    takeOrUploadPhoto: "Upload / Camera",
    useCamera: "Live Camera",
    snapPhoto: "Snap Photo",
    closeCamera: "Close Camera",
    cameraUnavailable:
      "Camera preview unavailable here — choose or snap a photo with Upload instead.",
    voiceStep: "2 · Your Voice (optional)",
    recordVoice: "Record Voice",
    stopRecording: "Stop Recording",
    reRecord: "Record Again",
    micUnavailable: "Microphone unavailable — saved card will use clear speech aloud instead.",
    voiceRecordedReady: "Voice clip recorded and ready.",
    saveCard: "Save Card",
    cancel: "Cancel",
    deleteCard: "Remove custom card",
    customVoicePlayed: (label) => `Playing your custom card & notifying parent: ${label} (+15 XP)!`,
    firstThen: {
      title: "First – Then Reward Board",
      subtitle: "Complete one calm writing step to unlock story time with Noor.",
      firstBadge: "First",
      firstTask: "Finish 1 Writing Note",
      firstAction: "Go to Writing",
      firstDone: "Completed",
      thenBadge: "Then",
      thenTask: "5 mins with Noor Dove Stories",
      lockedNote: "Unlocks right after saving 1 note",
      openStory: "Open Noor Story",
      hideStory: "Hide Story",
      storyTitle: "Noor & the Whispering Olive Tree",
      storyText:
        "High above a quiet desert courtyard, Noor the dove found a warm sunlit branch. Whenever the wind grew loud, Noor tucked one wing softly, breathed in the scent of desert sage for four slow beats, and let the breeze pass by like clouds.",
      stories: [
        {
          title: "Noor & the Whispering Olive Tree",
          text: "High above a quiet desert courtyard, Noor the dove found a warm sunlit branch. Whenever the wind grew loud, Noor tucked one wing softly, breathed in the scent of desert sage for four slow beats, and let the breeze pass by like clouds.",
        },
        {
          title: "Noor & the Paper Lantern Boat",
          text: "Beside a calm Sharjah creek at dusk, Noor watched a tiny paper boat glide across glassy water. With every gentle ripple, Noor counted one soft breath in and one long breath out until the lantern light settled into stillness.",
        },
        {
          title: "Noor & the Monsoon Raindrop Song",
          text: "Under a cool veranda roof in Kochi, Noor listened to steady raindrops tap on banana leaves. Instead of rushing, Noor tapped one feather lightly—one, two, three, four—matching the gentle rhythm until her thoughts felt clear and calm.",
        },
        {
          title: "Noor & the Starlight Dune",
          text: "When the desert sand turned cool and silver after sunset, Noor perched on a smooth dune ridge. She spotted three quiet stars twinkling above and whispered a calm thank-you for one small step completed today.",
        },
        {
          title: "Noor & the Jasmine Garden",
          text: "In an early-morning garden filled with white jasmine petals, Noor played a quiet noticing game: two soft white blossoms, one cool stone fountain, and the warm sunlight resting gently on her feathers.",
        },
        {
          title: "Noor & the Quiet Library Cloud",
          text: "On a soft blue cushion by the classroom window, Noor learned that big pages do not need to be read all at once. One line at a time, with a calm pause between words, every sentence became a friendly stepping stone.",
        },
        {
          title: "Noor & the Mango Orchard Breeze",
          text: "In the shade of tall green mango trees, Noor felt the afternoon warmth fade into a cool breeze. She sipped fresh water, relaxed her shoulders, and noticed how rested she felt after taking a break on time.",
        },
        {
          title: "Noor & the Smooth Pebble Bridge",
          text: "Across a shallow, clear stream lay five smooth river pebbles. Noor hopped onto just one pebble at a time, knowing there was no race—every calm, steady hop brought her safely to the sunny shore.",
        },
      ],
      newStory: "Refresh Story",
      storyCounter: (current, total) => `Story ${current} of ${total}`,
      educatorPreview: "Open Noor Story (Educator)",
      listenStory: "Listen to Story",
      startTimer: "Start 5:00 Timer",
      pauseTimer: "Pause",
      resetTimer: "Reset",
      claimReward: "Finish Reward (+15 XP)",
      rewardClaimed: "Reward enjoyed (+15 XP)",
      rewardEarnedDove: "Wonderful First–Then focus! Story reward claimed (+15 XP).",
    },
  },
  chat: {
    welcome:
      "Salaam & Namaste — I am Noor, your calm dove guide powered by Gemini. Ask me for a breathing break, sensory tip, or support idea.",
    cleared: "Fresh page ready. How can Noor help you feel supported today?",
    title: "Noor · Dove Guide",
    offlineStatus: "Offline calm guide active",
    geminiStatus: "Gemini AI · Calm support",
    clearBtn: "Clear conversation",
    openTabBtn: "Open full Dove Chat tab",
    closeBtn: "Close assistant",
    readAloud: "Read aloud",
    geminiTag: "Gemini",
    offlineGuideTag: "Offline guide",
    thinking: "Noor is thinking gently…",
    busyFallback: "Gemini was busy, so Noor replied using the offline calm guide.",
    networkFallback: "Network unavailable — Noor switched to the offline calm guide.",
    placeholder: "Ask Noor anything…",
    closeNoor: "Close Noor",
    askNoor: "Ask Noor",
    pageTitle: "Noor, your calm guide",
    pageDesc:
      "Powered by Gemini when online, with built-in local calm routines whenever Offline Mode is on.",
    doveSpeech:
      "Take your time. Short sentences, read-aloud audio, and offline calm guides are always ready.",
    activeRole: "Active role",
    tailoredNeeds: "Tailored support needs",
    generalComfort: "General sensory comfort",
    promptsByRole: {
      child: [
        "I feel overwhelmed right now",
        "Help me breathe slowly",
        "Give me a 2-minute focus step",
      ],
      parent: [
        "How can I make tonight's homework calm?",
        "My child had a loud school day",
        "How does UAE–India Vision 2030 help?",
      ],
      educator: [
        "Quick classroom cue for sensory overload",
        "Low-demand prompt for selective mutism",
        "How to chunk a 20-min reading task",
      ],
    },
  },
};

const AR: TranslationDict = {
  brand: "أمانة",
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    studio: "الاستوديو",
    partnership: "الأهداف والأثر",
    chat: "محادثة نور",
    rolesAndNeeds: "الأدوار والاحتياجات",
    needsCount: (n) => `الاحتياجات (${n})`,
    openStudio: "فتح الاستوديو",
    alertSingular: "تنبيه",
    studentNeedsRole: "دور واحتياجات الطالب",
    parentEducatorOnly: "أدوات الوالدين والمعلمين — لا تظهر في واجهة الطالب.",
    roleLabel: "الدور",
    done: "تم",
    skipToContent: "انتقل إلى المحتوى",
    logIn: "تسجيل الدخول",
    logOut: "تسجيل الخروج",
    signedInAs: (name, role) => `${name} (${role})`,
  },
  comfort: {
    light: "نهاري",
    dark: "ليلي",
    highContrast: "تباين عالٍ",
    offlineOn: "دون إنترنت: مفعل",
    offline: "دون إنترنت",
    offlineOff: "دون إنترنت: مغلق",
    sync: (n) => `مزامنة ${n}`,
    install: "تثبيت",
    settingsUnlocked: "الإعدادات (مفتوحة)",
    parentTeacherPin: "رمز الوالدين / المعلم",
    languageLabel: "اللغة",
  },
  guardian: {
    title: "إعدادات الوالدين والمعلم",
    prompt: "أدخل رمز PIN المكوّن من 4 أرقام لتغيير وضع الشاشة أو تبديل المستخدم.",
    wrongPin: "الرمز غير صحيح. جرّب 1234.",
    demoPin: "رمز التجربة: 1234",
    clear: "مسح",
    unlock: "فتح",
    screenLayout: "وضع عرض الشاشة",
    laptop: "حاسوب",
    tablet: "جهاز لوحي",
    mobile: "هاتف",
    switchText: "تبديل",
    lockReturn: "قفل والعودة",
  },
  signin: {
    welcome: "مرحبًا بكم في أمانة",
    who: "من يقوم بتسجيل الدخول؟",
    firstNameOptional: "الاسم الأول (اختياري)",
    signInBtn: "تسجيل الدخول",
    orgNameLabel: "اسم المؤسسة / المدرسة",
    orgNamePlaceholder: "مثال: أكاديمية النور الدامجة",
    orgRequiredHint: "مطلوب للمعلمين — يُحفظ مع سجلات الطلاب.",
    studentFeedHeading: "بيانات الطالب",
    chooseExistingStudent: "اختر طالبًا مسجلًا",
    orAddNewStudent: "أو أدخل بيانات طالب جديد",
    roles: {
      child: {
        title: "طفل / طالب",
        short: "أدوات هادئة وبطاقات النطق",
        placeholder: "مثال: أراف",
      },
      parent: {
        title: "ولي الأمر",
        short: "التنبيهات والاحتياجات والدعم المنزلي",
        placeholder: "مثال: فاطمة",
      },
      educator: {
        title: "معلم / مدرسة",
        short: "المؤسسة وبيانات الطلاب والاحتياجات",
        placeholder: "مثال: أ. ليلى",
      },
    },
  },
  roles: {
    child: {
      label: "طفل / طالب",
      shortLabel: "طالب",
      blurb: "بطاقات هادئة، محادثة المعالج، وخطوات لطيفة.",
    },
    parent: {
      label: "ولي الأمر",
      shortLabel: "ولي أمر",
      blurb: "تنبيهات فورية، نصائح منزلية، وإعداد الاحتياجات.",
    },
    educator: {
      label: "معلم / مدرسة",
      shortLabel: "معلم",
      blurb: "توجيهات صفية وتكييفات تعليمية.",
    },
  },
  conditions: {
    groups: [
      "النمو العصبي والتركيز",
      "التعلم والمعالجة",
      "القلق والوسواس والصدمات",
      "المزاج والتنظيم العاطفي",
      "النطق واللوازم الحركية",
    ],
    items: {
      adhd: { label: "تشتت الانتباه ADHD", tools: ["عرض هادئ", "دردشة المعالج", "خطوات تركيز"] },
      ef: { label: "الوظائف التنفيذية", tools: ["تقسيم المهام", "توجيهات بصرية"] },
      asd: { label: "طيف التوحد ASD", tools: ["تصميم ثابت", "بطاقات النطق", "ألوان هادئة"] },
      spd: { label: "المعالجة الحسية SPD", tools: ["ألوان مخففة", "بدون وميض"] },
      dyslexia: {
        label: "عسر القراءة",
        tools: ["خط Lexend", "مسطرة القراءة", "المقاطع", "قراءة بصوت عالٍ"],
      },
      dysgraphia: { label: "عسر الكتابة", tools: ["دردشة المعالج", "بطاقات النطق"] },
      dyscalculia: { label: "عسر الحساب", tools: ["عدادات بصرية", "خطوات بلا ضغط"] },
      anxiety: { label: "القلق والرهاب", tools: ["مشاركة هادئة", "تنفس طوارئ", "إشارة استراحة"] },
      ocd: { label: "الوسواس القهري", tools: ["تهدئة تدريجية", "إيقاع لطيف"] },
      ptsd: { label: "التعافي من الصدمات", tools: ["ملاذ هادئ", "تمرين التأريض 5-4-3-2-1"] },
      panic: { label: "نوبات الهلع", tools: ["زر التهدئة SOS", "تنفس بطيء"] },
      depression: { label: "انخفاض المزاج", tools: ["سجل المشاعر", "إنجازات صغيرة"] },
      dmdd: { label: "تنظيم الانفعالات", tools: ["مقياس التهدئة", "بطاقات اختيار"] },
      bipolar: { label: "تقلبات المزاج", tools: ["سجل الطاقة", "تنبيهات الوالدين"] },
      mutism: { label: "الصمت الانتقائي", tools: ["لوحة نطق سريعة", "دون ضغط كلامي"] },
      tourette: { label: "متلازمة توريت", tools: ["مساحة هادئة", "إشارة معلم لطيفة"] },
    },
  },
  hero: {
    offlineSpeech: "الوضع دون إنترنت مفعل — يُحفظ كل شيء محليًا.",
    onlineSpeech: (name) => `مرحبًا ${name || "يا صديقي"}! الأدوات الهادئة وتنبيهات الوالدين جاهزة.`,
    title: "كل طفل مسموع، بهدوء.",
    subtitle: "تعبير مراعٍ للحواس، وتنبيهات فورية للوالدين، ورعاية متوافقة مع رؤية 2030.",
    openStudio: "فتح الاستوديو",
    askNoor: "اسأل نور",
    photoBadge: "رؤية 2030 · الهدف 3",
    photoAlt: "طفل ووالدته يستكشفان بطاقات بصرية هادئة معًا",
  },
  home: {
    parentAlertsTitle: "تنبيهات الوالدين الفورية",
    testInStudio: "جرّب في الاستوديو ←",
    offlineTag: "محلي",
    seen: "تمت الرؤية",
    acknowledge: "تأكيد الاستلام",
    classroomCuesTitle: "توجيهات الصف السريعة",
    cues: [
      { name: "أراف ك.", cue: "مقعد قرب النافذة · بطاقات بصرية" },
      { name: "ليلى م.", cue: "مهام من 10 دقائق" },
      { name: "نور أ.", cue: "قبول البطاقات · دون إلزام كلامي" },
    ],
    latestCheckin: "آخر تسجيل للطالب:",
    aboutTag: "من نحن · أمانة",
    aboutHeading: "المشكلة والحل",
    seeStory: "شاهد الصور والقصة ←",
    activeRoleHeading: "١ · الدور النشط",
    adultControlsSub: "تحكم الوالدين والمعلمين",
    studentNeedsHeading: "٢ · احتياجات الطالب",
    tunesSub: "يضبط الخطوط والألوان الهادئة والأدوات.",
    footerTagline: "رؤية 2030 والهدف 3",
    educatorRoster: {
      title: "طلاب الصف · تسجيل دخول فردي",
      subtitle: "سجّل دخول أي طالب لتحميل وحفظ ملفه الحسي وسجلاته وتقدمه في كل مرة.",
      activeBadge: "مسجل الدخول",
      noActiveTitle: "لم يتم تسجيل دخول طالب بعد",
      noActiveDesc: "اختر طالبًا من الصف أدناه لتسجيل دخوله ببياناته المحفوظة أو أضف طالبًا جديدًا.",
      loginBtn: "دخول الطالب",
      activeBtn: "الطالب النشط",
      logoutBtn: "خروج الطالب",
      addBtn: "إضافة وتسجيل طالب جديد",
      cancelBtn: "إلغاء",
      saveAndLoginBtn: "حفظ ودخول الطالب",
      openStudioBtn: "فتح استوديو الطالب",
      quickNoteTitle: "تسجيل ملاحظة أو فحص مزاج سريع",
      quickMoodLabel: "المزاج / الحالة",
      quickNotePlaceholder: "مثال: تركيز هادئ مع مسطرة القراءة",
      saveCheckinBtn: "حفظ في سجل الطالب",
      nameLabel: "اسم الطالب",
      namePlaceholder: "مثال: زيد ر.",
      cueLabel: "توجيه الصف / التكييف",
      cuePlaceholder: "مثال: مقعد هادئ قرب النافذة · جدول بصري",
      needsLabel: "احتياجات الدعم (تضبط الاستوديو تلقائيًا)",
      notesLabel: "ملاحظات المعلم (اختياري)",
      notesPlaceholder: "التفضيلات الحسية أو روتين التهدئة",
      editBtn: "تعديل",
      saveChangesBtn: "حفظ التعديلات",
      removeBtn: "حذف",
      recentDataTitle: "بيانات الطالب المحفوظة",
      checkinsCount: (n) => `${n} تسجيلات`,
      alertsCount: (n) => `${n} تنبيهات`,
      cardsCount: (n) => `${n} بطاقات مخصصة`,
      noCheckins: "لا توجد تسجيلات لهذا الطالب بعد.",
      lastLogin: "آخر دخول",
      sessionBanner: (name) => `الطالب النشط: ${name}`,
      switchStudent: "تبديل الطالب",
      needsCountLabel: (n) => `${n} احتياجات`,
      searchPlaceholder: "ابحث عن طالب…",
      startWithStudent: "تسجيل دخول طالب (اختياري)",
      rosterChoice: "الاختيار من قائمة الصف بعد الدخول",
      orgLabel: "اسم المؤسسة / المدرسة",
      orgPlaceholder: "مثال: أكاديمية النور الدامجة",
      orgMissingPrompt: "أدخل اسم المؤسسة أو المدرسة لربط سجلات الطلاب.",
      orgEditBtn: "تعديل المؤسسة",
      orgSaveBtn: "حفظ المؤسسة",
      studentCodeLabel: "رقم الطالب / الرمز",
      studentCodePlaceholder: "مثال: STU-104",
      gradeLabel: "الصف / المرحلة",
      gradePlaceholder: "مثال: الصف الرابع · شعبة ب",
      detailsTitle: "المؤسسة وبيانات الطالب",
    },
    parentEmail: {
      title: "تسجيل بريد إشعارات الطفل",
      subtitle: "سجّل طفلك ببريد إلكتروني واحد لتلقي الإشعارات فورًا دون الحاجة لبريد تحقق.",
      ruleBadge: "بريد واحد لكل زوج (ولي أمر – طفل) · تفعيل فوري",
      childNameLabel: "اسم الطفل",
      childNamePlaceholder: "مثال: أراف",
      emailLabel: "البريد الإلكتروني لولي الأمر",
      emailPlaceholder: "مثال: fatima@family.com",
      registerBtn: "تسجيل بريد الطفل",
      updateBtn: "تحديث بريد الزوج",
      pairExistsHint: (child, email) =>
        `هذا الزوج (${child}) مسجل بالفعل بالبريد ${email}. الحفظ سيحدث هذا البريد الوحيد.`,
      invalidEmail: "يرجى إدخال اسم الطفل وبريد إلكتروني صحيح.",
      savedNotice: (child, email) => `تم تسجيل ${email} للطفل ${child} (دون تحقق).`,
      updatedNotice: (child, email) => `تم تحديث بريد ${child} إلى ${email}.`,
      activeNoVerify: "مفعل · دون تحقق",
      removeBtn: "حذف",
      editBtn: "تعديل البريد",
      noPairsYet: "لم يُسجل طفل بعد. أضف اسم طفلك وبريدك أعلاه.",
      notifiedBadge: (email) => `تم إشعار البريد: ${email}`,
      queuedEmailBadge: (email) => `بانتظار الإرسال: ${email}`,
      inAppOnlyBadge: "تنبيه داخل التطبيق",
    },
  },
  toolkit: {
    items: [
      { title: "تهدئة SOS", desc: "تنفس 5 ثوانٍ" },
      { title: "انقر للتحدث", desc: "ينبّه الوالدين" },
      { title: "مسطرة القراءة", desc: "خط مريح للقراءة" },
      { title: "يعمل دون إنترنت", desc: "لا يحتاج إشارة" },
    ],
  },
  problemSolution: {
    problemTitle: "المشكلة",
    problems: [
      "• قوائم انتظار 16 أسبوعًا للمختصين",
      "• انقطاع التواصل بين الأسرة والمدرسة",
      "• منصات مزدحمة ومسببة للتوتر",
    ],
    solutionTitle: "حلّنا",
    solutions: [
      "• رعاية إماراتية–هندية خلال 48 ساعة",
      "• تنبيهات فورية للوالدين بلمسة",
      "• استوديو حسي متكيّف دون إنترنت",
    ],
  },
  sdg: {
    before: "قبل",
    withAmanah: "مع أمانة",
    cards: [
      {
        number: 3,
        title: "الصحة الجيدة والرفاه",
        target: "الهدف 3.4 و 3.8",
        headlineStat: "48 ساعة",
        beforeLabel: "انتظار 16 أسبوعًا",
        afterLabel: "إرشاد خلال 48 ساعة",
      },
      {
        number: 4,
        title: "التعليم الجيد",
        target: "الهدف 4.5",
        headlineStat: "+3,100",
        beforeLabel: "ملاحظات ورقية ثابتة",
        afterLabel: "تكييفات مدرسية حية",
      },
      {
        number: 17,
        title: "الشراكات لتحقيق الأهداف",
        target: "الهدف 17.6",
        headlineStat: "أقل 70%",
        beforeLabel: "تكلفة العيادة 100%",
        afterLabel: "تكلفة عابرة للحدود 30%",
      },
    ],
  },
  vision: {
    title: "رؤية 2030 · أفق الهدف 3",
    milestones: [
      { year: "2026", title: "المرحلة التجريبية", sub: "86 مدرسة · 210 مختصين", pct: 38 },
      { year: "2028", title: "التوسع دون إنترنت", sub: "أدوات منزلية وصفية بلا شبكة", pct: 68 },
      { year: "2030", title: "رؤية 2030 · الهدف 3", sub: "رعاية هادئة شاملة للطفل", pct: 100 },
    ],
  },
  bridge: {
    eyebrow: "تكامل ثنائي · يدعم الهدف الثالث مباشرة",
    heading: "جمع قوّتين يصنع دائرة رعاية أقوى",
    uaeHeading: "الإمارات العربية المتحدة",
    uaeBadge: "البنية التحتية والحماية",
    indiaHeading: "الهند",
    indiaBadge: "الخبرة السريرية والهندسة",
    combinedPrefix: "الحل المشترك",
    sdgImpact: "أثر الهدف 3",
    pairs: [
      {
        id: "screening",
        label: "01. مراجعة سريعة",
        uaeTitle: "بنية مدرسية دامجة",
        uaeDetail: "فحص صفي منتظم ومكاتب دمج مجهزة في مدارس دبي وأبوظبي.",
        indiaTitle: "أخصائيون متعددو اللغات",
        indiaDetail:
          "شبكة معتمدة من أخصائيي النطق والعلاج الوظيفي والنمو في بنغالور ومومباي وكوتشي.",
        combinedOutcome:
          "تصل ملاحظات المدرسة إلى المختصين الهنود بشكل غير متزامن، مما يزيل فجوة اللغة وانتظار الأشهر.",
        sdgTarget: "الهدف 3.4 و 3.8 · الرفاه النفسي والوصول السريع للمختص",
        metricValue: "48 ساعة",
        metricLabel: "متوسط أول توجيه علاجي (بدلاً من 16 أسبوعًا)",
        baselineNote: "قياس تجريبي عبر المدارس الشريكة",
        fillPercent: 86,
      },
      {
        id: "frugal",
        label: "02. وصول ميسّر",
        uaeTitle: "تمويل صحي مستدام",
        uaeDetail: "معايير صحة رقمية سيادية ورعاية مدرسية وتمويل شراكة مستقر.",
        indiaTitle: "هندسة رقمية ميسّرة",
        indiaDetail: "برمجيات خفيفة تعمل دون إنترنت ومناسبة لمختلف الأجهزة المنزلية.",
        combinedOutcome:
          "يدعم التمويل الإماراتي مجانية الأسر بينما تبقي الهندسة الهندية التكلفة منخفضة وتعمل دون شبكة.",
        sdgTarget: "الهدف 3.ج و 17 · مشاركة الكوادر والتقنية",
        metricValue: "أقل 70%",
        metricLabel: "تكلفة دعم الطفل مقارنة بنماذج العيادات التقليدية",
        baselineNote: "تقدير مقارنة المراجعة غير المتزامنة بالزيارات الحضورية",
        fillPercent: 78,
      },
      {
        id: "continuity",
        label: "03. استمرارية منزلية",
        uaeTitle: "حماية خصوصية الطفل PDPL",
        uaeDetail: "حماية صارمة للبيانات وموافقة صريحة من ولي الأمر وتوجيه ثنائي اللغة.",
        indiaTitle: "نماذج رعاية حسية وسلوكية",
        indiaDetail: "روتينات حسية مجربة وجداول بصرية وإرشاد أسري بتكلفة منخفضة.",
        combinedOutcome:
          "تحصل الأسر على خطوات منزلية مألوفة وهادئة يمكن تطبيقها كل مساء حتى دون إنترنت.",
        sdgTarget: "الهدف 3 و 4 · رعاية متصلة من العيادة إلى الفصل إلى البيت",
        metricValue: "2.4×",
        metricLabel: "التزام أسبوعي أعلى بالروتين المنزلي لدى الأسر المشاركة",
        baselineNote: "مدعوم ببطاقات نور البصرية والملاحظات المختصرة",
        fillPercent: 82,
      },
    ],
  },
  progress: {
    levelLabel: (lvl, title) => `المستوى ${lvl} · ${title}`,
    levelTitles: ["بذرة هادئة", "صوت مطمئن", "قارئ ثابت", "باني الأفق", "حارس الزيتون"],
    journeyTitle: "رحلتك الهادئة",
    dayStreak: (n) => `سلسلة ${n} أيام`,
    progressTo: (lvl) => `التقدم للمستوى ${lvl}`,
    completed: "مكتمل",
    steps: [
      { id: "checkin", label: "فحص المزاج", xp: "+20", to: "/studio" },
      { id: "card", label: "انقر للتحدث", xp: "+15", to: "/studio" },
      { id: "breathe", label: "تنفس هادئ", xp: "+25", to: "/studio" },
      { id: "therapist", label: "تحدث لمعالج", xp: "+20", to: "/studio" },
      { id: "chat", label: "اسأل نور", xp: "+15", to: "/chat" },
    ],
  },
  about: {
    eyebrow: "عن أمانة · رؤية 2030",
    title: "رعاية هادئة ومترابطة لكل متعلم.",
    subtitle: "تربط أمانة الطلاب والآباء والمعلمين بأدوات حسية دون إنترنت وتوجيه خلال 48 ساعة.",
    doveSpeech: "خطوة بخطوة برفقة الحمامة نور.",
    photoCaptionTag: "دبي وبنغالور",
    photoCaptionTitle: "فصول شاملة متصلة بمختصين متعددي اللغات.",
    whyExists: "لماذا أمانة",
    problemSolutionTitle: "المشكلة ← الحل",
    indiaTag: "الشبكة السريرية في الهند",
    indiaSubtitle: "أكثر من 210 أخصائي نطق وعلاج وظيفي معتمد.",
    pillarsTag: "ركائز التصميم",
    pillars: [
      { t: "خصوصية بالموافقة", d: "متوافق مع قوانين الإمارات والهند" },
      { t: "تنبيهات فورية للوالدين", d: "طمأنينة وإرشادات فورية" },
      { t: "أدوات 100% دون إنترنت", d: "التنفس والبطاقات ومسطرة القراءة" },
    ],
    openStudioBtn: "فتح الاستوديو",
    sdgImpactBtn: "الأهداف والأثر",
  },
  partnership: {
    eyebrow: "ممر الرعاية الاستراتيجي الإماراتي–الهندي · رؤية 2030",
    title: "توحيد نقاط القوة لتحقيق الهدف 3 ورؤية 2030",
    subtitle: "البنية التعليمية الإماراتية + الأخصائيون الهنود = دعم أسرع وأهدأ لكل طفل.",
    uaeLabel: "الإمارات العربية المتحدة",
    uaeTitle: "الفحص المدرسي وحماية البيانات السيادية",
    indiaLabel: "الهند",
    indiaTitle: "أخصائيون متعددو اللغات وهندسة دون إنترنت",
    privacyTitle: "الموافقة وحماية بيانات الطفل",
    privacyPoints: [
      "موافقة قابلة للإلغاء من ولي الأمر لكل مختص.",
      "رموز بصرية واضحة ليعرف الطفل ما يُشارك.",
      "إخفاء الهوية قبل المراجعة العابرة للحدود.",
      "متوافق مع PDPL الإماراتي وDPDP الهندي.",
    ],
  },
  studio: {
    offlineLabel: "الاستوديو دون إنترنت",
    label: "استوديو التعبير",
    heading: "عبّر بطريقتك",
    initialDove: "اضغط بطاقة للنطق وإشعار والديك.",
    savedOffline: (pts) => `تم الحفظ محليًا (+${pts} نقطة).`,
    savedOnline: (pts) => `تم الحفظ (+${pts} نقطة)!`,
    parentAlertOffline: "تم حفظ إشعار الوالدين محليًا (+15 نقطة).",
    parentAlertOnline: (card) => `تم إشعار الوالدين: ${card} (+15 نقطة)!`,
    parentAlertOnlineEmail: (card, email) => `تم إشعار الوالدين (${email}): ${card} (+15 نقطة)!`,
    therapistSentDove: "تم الإرسال إلى د. ميرا ناير (+20 نقطة)!",
    tabs: {
      cards: "انقر للتحدث",
      mood: "المزاج والهدوء",
      therapist: "تحدث إلى معالج",
      canvas: "الكتابة",
      journey: "التقدم",
    },
    tapTitle: "انقر للتحدث",
    tapNote: "ينطق العبارة وينبّه والديك فورًا.",
    parentEmailLinked: (email) => `بريد ولي الأمر المفعل: ${email}`,
    parentNotified: (card, offline) =>
      `تم تنبيه الوالدين: ${card}${offline ? " (محفوظ دون إنترنت)" : ""}`,
    parentNotifiedEmail: (card, email, offline) =>
      `تم تنبيه الوالدين: ${card} ← ${email}${offline ? " (محفوظ دون إنترنت)" : ""}`,
    cards: [
      { id: "help", label: "🙋 أحتاج مساعدة", speak: "أحتاج مساعدة" },
      { id: "break", label: "⏸️ أحتاج استراحة", speak: "أحتاج استراحة" },
      { id: "loud", label: "🔇 الصوت مرتفع جدًا", speak: "الصوت مرتفع جدًا" },
      { id: "thirsty", label: "💧 أشعر بالعطش", speak: "أشعر بالعطش" },
      { id: "toilet", label: "🚻 الحمام", speak: "الحمام" },
      { id: "confused", label: "❓ لم أفهم", speak: "لم أفهم" },
      { id: "yes", label: "👍 نعم", speak: "نعم" },
      { id: "no", label: "👎 لا", speak: "لا" },
      { id: "hug", label: "🤗 أريد عناقًا", speak: "أريد عناقًا" },
    ],
    moodTitle: "كيف تشعر الآن؟",
    moods: [
      { id: "Happy", label: "سعيد", e: "😊" },
      { id: "Overwhelmed", label: "مضغوط", e: "🌊" },
      { id: "Confused", label: "مرتبك", e: "🌀" },
      { id: "Tired", label: "متعب", e: "😴" },
      { id: "Anxious", label: "قلق", e: "🫧" },
      { id: "Proud", label: "فخور", e: "🌟" },
    ],
    intensity: "الشدة",
    saveMood: "حفظ المزاج",
    sosTitle: "إعادة الهدوء",
    sosNote: "دليل تنفس بطيء لمدة 5 ثوانٍ.",
    startSos: "ابدأ تهدئة SOS",
    breatheIn: "شهيق",
    breatheOut: "زفير",
    doneXp: "تم (+25 نقطة)",
    cooldownTitle: "مقياس التهدئة",
    cooldownLevels: ["هادئ 😌", "دافئ 🙂", "ساخن 😠", "مشتعل 🌋"],
    cooldownTips: [
      "أنت بخير تمامًا.",
      "اشرب ماءً + 3 أنفاس بطيئة.",
      "انتقل لزاوية هادئة.",
      "توقّف. مساحة آمنة الآن.",
    ],
    therapistTitle: "تحدث إلى معالج",
    therapistNote: "شارك مشاعرك مع أخصائي فريق الرعاية — عبر الإنترنت أو دونه.",
    therapistName: "د. ميرا ناير",
    therapistRole: "أخصائية النطق والرعاية الحسية · فريق الرعاية",
    savesOffline: "يحفظ محليًا",
    careConnected: "فريق الرعاية متصل",
    therapistPrompts: [
      "كان الصف صاخبًا اليوم",
      "أريد مساعدة في التركيز بالقراءة",
      "أكملت استراحة التنفس",
      "هل تشاركني نصيحة هادئة للواجب؟",
    ],
    therapistPlaceholder: "اكتب رسالة هادئة إلى معالجك…",
    send: "إرسال",
    sending: "جارٍ الإرسال بهدوء…",
    listen: "استماع",
    offlineQueued: "محفوظ دون إنترنت",
    writingTitle: "لوحة الكتابة",
    writingNote: "خط مريح لعسر القراءة، مسطرة، وقراءة صوتية.",
    readAloud: "اقرأ بصوت عالٍ",
    rulerOn: "المسطرة مفعّلة",
    rulerOff: "المسطرة مغلقة",
    syllablesOn: "المقاطع مفعّلة",
    syllablesOff: "المقاطع مغلقة",
    defaultCanvasText: "اليوم شعرت بـ…",
    saveNote: "حفظ الملاحظة",
    recentShares: "المشاركات الأخيرة",
    syncedLabel: "متزامن",
    offlineLabelTag: "دون إنترنت",
    addCardTile: "إضافة بطاقة",
    addCardTitle: "إضافة بطاقة تواصل مخصصة",
    addCardNote:
      "التقط صورة حقيقية وسجّل صوتك المألوف لزجاجة الماء أو اللعبة المفضلة أو الزاوية الهادئة.",
    cardLabel: "عنوان البطاقة",
    cardLabelPlaceholder: "مثال: زجاجة الماء الزرقاء",
    cardQuickLabels: ["زجاجة مائي", "لعبة التركيز المفضلة", "الزاوية الهادئة"],
    photoStep: "١ · صورة حقيقية",
    takeOrUploadPhoto: "رفع / التقاط صورة",
    useCamera: "الكاميرا المباشرة",
    snapPhoto: "التقاط الصورة",
    closeCamera: "إغلاق الكاميرا",
    cameraUnavailable: "معاينة الكاميرا غير متوفرة هنا — استخدم خيار رفع / التقاط صورة.",
    voiceStep: "٢ · تسجيل صوتك (اختياري)",
    recordVoice: "تسجيل الصوت",
    stopRecording: "إيقاف التسجيل",
    reRecord: "إعادة التسجيل",
    micUnavailable: "الميكروفون غير متاح — ستقرأ البطاقة النص بصوت واضح تلقائيًا.",
    voiceRecordedReady: "تم تسجيل المقطع الصوتي بنجاح.",
    saveCard: "حفظ البطاقة",
    cancel: "إلغاء",
    deleteCard: "حذف البطاقة المخصصة",
    customVoicePlayed: (label) => `تم تشغيل بطاقتك وإشعار الوالدين: ${label} (+15 نقطة)!`,
    firstThen: {
      title: "لوحة المكافأة: أولاً – ثم",
      subtitle: "أكمل خطوة كتابة واحدة هادئة لفتح وقت القصة مع نور.",
      firstBadge: "أولاً",
      firstTask: "إنهاء ملاحظة كتابية واحدة",
      firstAction: "الذهاب إلى الكتابة",
      firstDone: "مكتمل",
      thenBadge: "ثم",
      thenTask: "5 دقائق مع قصص الحمامة نور",
      lockedNote: "يُفتح مباشرة بعد حفظ ملاحظة واحدة",
      openStory: "افتح قصة نور",
      hideStory: "إخفاء القصة",
      storyTitle: "نور وشجرة الزيتون الهادئة",
      storyText:
        "فوق فناء هادئ دافئ بالشمس، وجدت الحمامة نور غصنًا مطمئنًا. كلما اشتد صوت الرياح، كانت نور تضم جناحها برفق وتتنفس ببطء أربع عدات حتى يمر النسيم بسلام.",
      stories: [
        {
          title: "نور وشجرة الزيتون الهادئة",
          text: "فوق فناء هادئ دافئ بالشمس، وجدت الحمامة نور غصنًا مطمئنًا. كلما اشتد صوت الرياح، كانت نور تضم جناحها برفق وتتنفس ببطء أربع عدات حتى يمر النسيم بسلام.",
        },
        {
          title: "نور وقارب الفانوس الورقي",
          text: "بجانب خور الشارقة الهادئ عند الغسق، راقبت نور قاربًا ورقيًا صغيرًا ينساب فوق الماء الصافي. مع كل موجة لطيفة، أخذت نور شهيقًا هادئًا وزفيرًا طويلًا حتى عمّ السكون.",
        },
        {
          title: "نور وأنشودة المطر الدافئ",
          text: "تحت سقف شرفة هادئة في كوتشي، استمعت نور لقطرات المطر المنتظمة على أوراق الموز. وبدلاً من الاستعجال، عدّت أربع عدات بطيئة مع إيقاع المطر حتى صفَت أفكارها.",
        },
        {
          title: "نور وكثيب النجوم",
          text: "عندما بردت رمال الصحراء بعد الغروب، وقفت نور على كثيب ناعم ورأت ثلاث نجوم هادئة تلمع في السماء، فابتسمت شاكرةً لكل خطوة صغيرة أنجزتها اليوم.",
        },
        {
          title: "نور وحديقة الياسمين",
          text: "في صباح لطيف بين أزهار الياسمين البيضاء، لعبت نور لعبة ملاحظة هادئة: زهرتان بيضاوان، نافورة حجرية باردة، وضوء شمس دافئ يلامس جناحيها برفق.",
        },
        {
          title: "نور وسحابة المكتبة الهادئة",
          text: "على وسادة زرقاء ناعمة قرب نافذة الصف، تعلّمت نور أن الصفحات الكبيرة لا تُقرأ دفعة واحدة. سطرٌ واحد في كل مرة مع وقفة مريحة يجعل القراءة رحلة لطيفة.",
        },
        {
          title: "نور ونسيم بستان المانجو",
          text: "في ظل أشجار المانجو الخضراء، شعرت نور بنسيم العصر يبرد الجو. شربت رشفة ماء بارد، وأرخت كتفيها، ولاحظت كم تشعر بالراحة بعد استراحة في وقتها.",
        },
        {
          title: "نور وجسر الحصى الناعم",
          text: "فوق جدول ماء صافٍ كانت هناك خمس حصوات ناعمة. قفزت نور على حصوة واحدة في كل مرة بهدوء وثبات، واثقة أن كل خطوة هادئة تصل بها إلى الضفة المشمسة.",
        },
      ],
      newStory: "قصة جديدة",
      storyCounter: (current, total) => `قصة ${current} من ${total}`,
      educatorPreview: "فتح قصة نور (للمعلم)",
      listenStory: "استماع للقصة",
      startTimer: "بدء مؤقت 5:00",
      pauseTimer: "إيقاف مؤقت",
      resetTimer: "إعادة ضبط",
      claimReward: "إنهاء المكافأة (+15 نقطة)",
      rewardClaimed: "تم الاستمتاع بالمكافأة (+15 نقطة)",
      rewardEarnedDove: "تركيز رائع! تم تحصيل مكافأة القصة (+15 نقطة).",
    },
  },
  chat: {
    welcome:
      "سلام ونماستي — أنا نور، حمامة الهدوء المدعومة بـ Gemini. اطلب مني تمرين تنفس أو نصيحة حسية.",
    cleared: "صفحة جديدة جاهزة. كيف يمكن لنور مساعدتك اليوم؟",
    title: "نور · دليل الهدوء",
    offlineStatus: "الدليل المحلي مفعل",
    geminiStatus: "Gemini AI · دعم هادئ",
    clearBtn: "مسح المحادثة",
    openTabBtn: "فتح تبويب المحادثة الكامل",
    closeBtn: "إغلاق المساعد",
    readAloud: "قراءة بصوت عالٍ",
    geminiTag: "Gemini",
    offlineGuideTag: "دليل محلي",
    thinking: "نور تفكر بهدوء…",
    busyFallback: "كان Gemini مشغولاً، فأجابت نور من الدليل المحلي الهادئ.",
    networkFallback: "لا يتوفر اتصال — انتقلت نور إلى الدليل المحلي.",
    placeholder: "اسأل نور أي شيء…",
    closeNoor: "إغلاق نور",
    askNoor: "اسأل نور",
    pageTitle: "نور، رفيقتك الهادئة",
    pageDesc: "تعمل بـ Gemini عند الاتصال، وبروتينات تهدئة محلية عند تفعيل وضع عدم الاتصال.",
    doveSpeech: "خذ وقتك. جمل قصيرة، قراءة صوتية، وإرشادات هادئة جاهزة دائمًا.",
    activeRole: "الدور النشط",
    tailoredNeeds: "الاحتياجات المخصصة",
    generalComfort: "راحة حسية عامة",
    promptsByRole: {
      child: ["أشعر بالإرهاق الآن", "ساعدني على التنفس ببطء", "أعطني خطوة تركيز لدقيقتين"],
      parent: [
        "كيف أجعل واجب الليلة هادئًا؟",
        "عاش طفلي يومًا صاخبًا في المدرسة",
        "كيف تساعد شراكة الإمارات والهند؟",
      ],
      educator: [
        "توجيه سريع للحمل الحسي في الصف",
        "طريقة تواصل هادئة للصمت الانتقائي",
        "كيف أقسم قراءة 20 دقيقة؟",
      ],
    },
  },
};

const HI: TranslationDict = {
  brand: "अमानह",
  nav: {
    home: "होम",
    about: "हमारे बारे में",
    studio: "स्टूडियो",
    partnership: "एसडीजी और प्रभाव",
    chat: "नूर चैट",
    rolesAndNeeds: "भूमिका और ज़रूरतें",
    needsCount: (n) => `ज़रूरतें (${n})`,
    openStudio: "स्टूडियो खोलें",
    alertSingular: "अलर्ट",
    studentNeedsRole: "छात्र की ज़रूरतें और भूमिका",
    parentEducatorOnly: "माता-पिता और शिक्षक टूल — छात्र स्क्रीन पर नहीं दिखते।",
    roleLabel: "भूमिका",
    done: "हो गया",
    skipToContent: "मुख्य सामग्री पर जाएँ",
    logIn: "लॉग इन",
    logOut: "लॉग आउट",
    signedInAs: (name, role) => `${name} (${role})`,
  },
  comfort: {
    light: "हल्का",
    dark: "डार्क",
    highContrast: "उच्च कंट्रास्ट",
    offlineOn: "ऑफ़लाइन: चालू",
    offline: "ऑफ़लाइन",
    offlineOff: "ऑफ़लाइन: बंद",
    sync: (n) => `सिंक ${n}`,
    install: "इंस्टॉल",
    settingsUnlocked: "सेटिंग्स (अनलॉक)",
    parentTeacherPin: "अभिभावक / शिक्षक PIN",
    languageLabel: "भाषा",
  },
  guardian: {
    title: "अभिभावक और शिक्षक सेटिंग्स",
    prompt: "लैपटॉप / टैबलेट / मोबाइल व्यू या उपयोगकर्ता बदलने के लिए 4-अंकों का PIN दर्ज करें।",
    wrongPin: "गलत PIN। 1234 आज़माएँ।",
    demoPin: "डेमो PIN: 1234",
    clear: "साफ़",
    unlock: "अनलॉक",
    screenLayout: "स्क्रीन लेआउट मोड",
    laptop: "लैपटॉप",
    tablet: "टैबलेट",
    mobile: "मोबाइल",
    switchText: "बदलें",
    lockReturn: "लॉक करें और लौटें",
  },
  signin: {
    welcome: "अमानह में आपका स्वागत है",
    who: "कौन साइन इन कर रहा है?",
    firstNameOptional: "पहला नाम (वैकल्पिक)",
    signInBtn: "साइन इन करें",
    orgNameLabel: "संस्था / स्कूल का नाम",
    orgNamePlaceholder: "उदा. अल नूर इंक्लूसिव अकादमी",
    orgRequiredHint: "शिक्षकों के लिए आवश्यक — छात्र रिकॉर्ड के साथ सहेजा जाता है।",
    studentFeedHeading: "छात्र विवरण",
    chooseExistingStudent: "मौजूदा छात्र चुनें",
    orAddNewStudent: "या नया छात्र विवरण दर्ज करें",
    roles: {
      child: {
        title: "बच्चा / छात्र",
        short: "शांत टूल और टैप-टू-टॉक",
        placeholder: "उदा. आरव",
      },
      parent: {
        title: "माता-पिता / अभिभावक",
        short: "अलर्ट, ज़रूरतें और घरेलू मदद",
        placeholder: "उदा. प्रिया",
      },
      educator: {
        title: "शिक्षक / स्कूल",
        short: "संस्था, छात्र विवरण और कक्षा संकेत",
        placeholder: "उदा. सुश्री फातिमा",
      },
    },
  },
  roles: {
    child: {
      label: "बच्चा / छात्र",
      shortLabel: "छात्र",
      blurb: "शांत कार्ड, थेरेपिस्ट चैट और आसान कदम।",
    },
    parent: {
      label: "माता-पिता / अभिभावक",
      shortLabel: "माता-पिता",
      blurb: "तुरंत कार्ड अलर्ट, घरेलू टिप्स और ज़रूरतें।",
    },
    educator: {
      label: "शिक्षक / स्कूल",
      shortLabel: "शिक्षक",
      blurb: "कक्षा संकेत और सीखने की सुविधाएँ।",
    },
  },
  conditions: {
    groups: [
      "न्यूरोडेवलपमेंट और फ़ोकस",
      "सीखना और प्रोसेसिंग",
      "चिंता, OCD और ट्रॉमा",
      "मूड और भावनात्मक संतुलन",
      "वाणी और टिक स्थितियाँ",
    ],
    items: {
      adhd: { label: "ADHD", tools: ["कम-ध्यान भटकाव दृश्य", "थेरेपिस्ट चैट", "फ़ोकस कदम"] },
      ef: { label: "कार्यकारी कार्यप्रणाली", tools: ["चरण विभाजन", "विज़ुअल संकेत"] },
      asd: { label: "ऑटिज़्म स्पेक्ट्रम / ASD", tools: ["निश्चित लेआउट", "टैप-टू-टॉक", "शांत रंग"] },
      spd: { label: "सेंसरी प्रोसेसिंग / SPD", tools: ["सौम्य रंग", "कोई तेज़ हलचल नहीं"] },
      dyslexia: {
        label: "डिस्लेक्सिया",
        tools: ["Lexend फ़ॉन्ट", "रीडिंग रूलर", "शब्दांश", "बोलकर पढ़ें"],
      },
      dysgraphia: { label: "डिस्ग्राफ़िया", tools: ["थेरेपिस्ट चैट", "टैप-टू-टॉक कार्ड"] },
      dyscalculia: { label: "डिस्कैल्कुलिया", tools: ["विज़ुअल काउंटर", "आसान कदम"] },
      anxiety: { label: "चिंता और सामाजिक भय", tools: ["बिना दबाव साझा", "साँस SOS", "ब्रेक संकेत"] },
      ocd: { label: "OCD और विचार", tools: ["ग्राउंडिंग टिप्स", "धीमी गति"] },
      ptsd: { label: "PTSD सहायता", tools: ["सुरक्षित शांति", "5-4-3-2-1 ग्राउंडिंग"] },
      panic: { label: "पैनिक सहायता", tools: ["SOS शांति बटन", "धीमी साँस"] },
      depression: { label: "कम मूड सहायता", tools: ["भावना डायरी", "छोटी जीत"] },
      dmdd: { label: "भावनात्मक नियंत्रण / DMDD", tools: ["कूलडाउन मीटर", "विकल्प कार्ड"] },
      bipolar: { label: "मूड चक्र सहायता", tools: ["ऊर्जा लॉग", "अभिभावक अलर्ट"] },
      mutism: { label: "चयनात्मक मौन", tools: ["टैप-टू-टॉक साउंडबोर्ड", "बोलने का दबाव नहीं"] },
      tourette: { label: "टॉरेट सहायता", tools: ["शांत कोना", "शिक्षक संकेत"] },
    },
  },
  hero: {
    offlineSpeech: "ऑफ़लाइन मोड चालू है — सब कुछ सुरक्षित रूप से सहेजा जाता है।",
    onlineSpeech: (name) => `नमस्ते ${name || "मित्र"}! शांत टूल और तुरंत अभिभावक अलर्ट तैयार हैं।`,
    title: "हर बच्चे की बात, शांति से सुनी जाए।",
    subtitle: "सेंसरी-अनुकूल अभिव्यक्ति, तुरंत अभिभावक सूचना और विज़न 2030 देखभाल।",
    openStudio: "स्टूडियो खोलें",
    askNoor: "नूर से पूछें",
    photoBadge: "विज़न 2030 · एसडीजी 3",
    photoAlt: "बच्चा और माँ साथ में शांत विज़ुअल कार्ड देखते हुए",
  },
  home: {
    parentAlertsTitle: "अभिभावक टैप-टू-टॉक अलर्ट",
    testInStudio: "स्टूडियो में आज़माएँ →",
    offlineTag: "ऑफ़लाइन",
    seen: "देखा गया",
    acknowledge: "पुष्टि करें",
    classroomCuesTitle: "कक्षा त्वरित संकेत",
    cues: [
      { name: "आरव के.", cue: "खिड़की के पास सीट · विज़ुअल कार्ड" },
      { name: "लैला एम.", cue: "10-मिनट के कार्य भाग" },
      { name: "नूर ए.", cue: "टैप-टू-टॉक स्वीकार · बोलने का दबाव नहीं" },
    ],
    latestCheckin: "नवीनतम छात्र चेक-इन:",
    aboutTag: "हमारे बारे में · अमानह",
    aboutHeading: "समस्या और हमारा समाधान",
    seeStory: "तस्वीरें और कहानी देखें →",
    activeRoleHeading: "1 · सक्रिय भूमिका",
    adultControlsSub: "अभिभावक और शिक्षक नियंत्रण",
    studentNeedsHeading: "2 · छात्र की ज़रूरतें",
    tunesSub: "फ़ॉन्ट, शांत रंग और टूल सेट करता है।",
    footerTagline: "विज़न 2030 और एसडीजी 3",
    educatorRoster: {
      title: "कक्षा छात्र · व्यक्तिगत लॉगिन",
      subtitle: "हर छात्र का व्यक्तिगत सेंसरी प्रोफ़ाइल, चेक-इन और प्रगति लोड व सहेजने के लिए लॉग इन करें।",
      activeBadge: "लॉग इन",
      noActiveTitle: "अभी कोई छात्र लॉग इन नहीं है",
      noActiveDesc: "उनके सहेजे गए डेटा के साथ लॉग इन करने के लिए नीचे एक छात्र चुनें या नया छात्र जोड़ें।",
      loginBtn: "छात्र लॉग इन करें",
      activeBtn: "सक्रिय छात्र",
      logoutBtn: "छात्र लॉग आउट करें",
      addBtn: "नया छात्र जोड़ें और लॉग इन करें",
      cancelBtn: "रद्द करें",
      saveAndLoginBtn: "सहेजें और लॉग इन करें",
      openStudioBtn: "छात्र स्टूडियो खोलें",
      quickNoteTitle: "त्वरित चेक-इन / अवलोकन सहेजें",
      quickMoodLabel: "मूड / स्थिति",
      quickNotePlaceholder: "उदा. रीडिंग रूलर के साथ शांत फ़ोकस",
      saveCheckinBtn: "छात्र रिकॉर्ड में सहेजें",
      nameLabel: "छात्र का नाम",
      namePlaceholder: "उदा. ज़ैद आर.",
      cueLabel: "कक्षा संकेत / सहायता",
      cuePlaceholder: "उदा. खिड़की के पास शांत सीट · विज़ुअल शेड्यूल",
      needsLabel: "सहायता ज़रूरतें (स्टूडियो अपने-आप सेट होता है)",
      notesLabel: "शिक्षक नोट्स (वैकल्पिक)",
      notesPlaceholder: "सेंसरी पसंद, शांत रूटीन या अभिभावक नोट्स",
      editBtn: "संपादित करें",
      saveChangesBtn: "बदलाव सहेजें",
      removeBtn: "हटाएँ",
      recentDataTitle: "सहेजा गया छात्र डेटा",
      checkinsCount: (n) => `${n} चेक-इन`,
      alertsCount: (n) => `${n} अलर्ट`,
      cardsCount: (n) => `${n} कस्टम कार्ड`,
      noCheckins: "इस छात्र के लिए अभी कोई चेक-इन दर्ज नहीं है।",
      lastLogin: "अंतिम लॉगिन",
      sessionBanner: (name) => `सक्रिय छात्र: ${name}`,
      switchStudent: "छात्र बदलें",
      needsCountLabel: (n) => `${n} ज़रूरतें`,
      searchPlaceholder: "छात्र खोजें…",
      startWithStudent: "छात्र लॉग इन करें (वैकल्पिक)",
      rosterChoice: "साइन इन के बाद कक्षा सूची से चुनें",
      orgLabel: "संस्था / स्कूल का नाम",
      orgPlaceholder: "उदा. अल नूर इंक्लूसिव अकादमी",
      orgMissingPrompt: "छात्र रिकॉर्ड जोड़ने के लिए अपनी संस्था या स्कूल का नाम दर्ज करें।",
      orgEditBtn: "संस्था बदलें",
      orgSaveBtn: "संस्था सहेजें",
      studentCodeLabel: "छात्र आईडी / कोड",
      studentCodePlaceholder: "उदा. STU-104",
      gradeLabel: "कक्षा / ग्रेड",
      gradePlaceholder: "उदा. कक्षा 4 · सेक्शन B",
      detailsTitle: "संस्था और छात्र विवरण",
    },
    parentEmail: {
      title: "बच्चे की सूचना के लिए ईमेल पंजीकृत करें",
      subtitle:
        "तुरंत सूचनाएँ पाने के लिए अपने बच्चे को एक अभिभावक ईमेल से पंजीकृत करें—किसी सत्यापन ईमेल की आवश्यकता नहीं।",
      ruleBadge: "प्रत्येक अभिभावक–बच्चा जोड़ी के लिए 1 ईमेल · तुरंत सक्रिय",
      childNameLabel: "बच्चे का नाम",
      childNamePlaceholder: "उदा. आरव",
      emailLabel: "अभिभावक सूचना ईमेल आईडी",
      emailPlaceholder: "उदा. priya@family.com",
      registerBtn: "बच्चे का ईमेल पंजीकृत करें",
      updateBtn: "जोड़ी का ईमेल अपडेट करें",
      pairExistsHint: (child, email) =>
        `इस अभिभावक–बच्चा जोड़ी (${child}) के लिए ${email} पहले से दर्ज है। सहेजने पर यही एक ईमेल अपडेट होगा।`,
      invalidEmail: "कृपया बच्चे का नाम और सही ईमेल पता दर्ज करें।",
      savedNotice: (child, email) => `${child} के लिए ${email} पंजीकृत हुआ (बिना सत्यापन)।`,
      updatedNotice: (child, email) => `${child} का एकमात्र ईमेल ${email} में अपडेट हुआ।`,
      activeNoVerify: "सक्रिय · सत्यापन आवश्यक नहीं",
      removeBtn: "हटाएँ",
      editBtn: "ईमेल बदलें",
      noPairsYet: "अभी कोई बच्चा पंजीकृत नहीं है। ऊपर बच्चे का नाम और अपना ईमेल जोड़ें।",
      notifiedBadge: (email) => `ईमेल सूचित: ${email}`,
      queuedEmailBadge: (email) => `ऑफ़लाइन कतार ईमेल: ${email}`,
      inAppOnlyBadge: "ऐप अलर्ट",
    },
  },
  toolkit: {
    items: [
      { title: "शांत SOS", desc: "5 सेकंड साँस अभ्यास" },
      { title: "टैप-टू-टॉक", desc: "माता-पिता को सूचित करे" },
      { title: "डिस्लेक्सिया रूलर", desc: "पढ़ने में मददगार फ़ॉन्ट" },
      { title: "ऑफ़लाइन तैयार", desc: "नेटवर्क की ज़रूरत नहीं" },
    ],
  },
  problemSolution: {
    problemTitle: "समस्या",
    problems: [
      "• विशेषज्ञों के लिए 16-सप्ताह की प्रतीक्षा",
      "• घर और स्कूल के बीच टूटा संवाद",
      "• तनावपूर्ण और जटिल पोर्टल",
    ],
    solutionTitle: "हमारा समाधान",
    solutions: [
      "• 48 घंटे में यूएई–भारत विशेषज्ञ सहायता",
      "• एक टैप में माता-पिता को तुरंत अलर्ट",
      "• ऑफ़लाइन काम करने वाला शांत स्टूडियो",
    ],
  },
  sdg: {
    before: "पहले",
    withAmanah: "अमानह के साथ",
    cards: [
      {
        number: 3,
        title: "अच्छा स्वास्थ्य और कल्याण",
        target: "एसडीजी 3.4 और 3.8",
        headlineStat: "48 घंटे",
        beforeLabel: "16 सप्ताह प्रतीक्षा",
        afterLabel: "48 घंटे में मार्गदर्शन",
      },
      {
        number: 4,
        title: "गुणवत्तापूर्ण शिक्षा",
        target: "एसडीजी 4.5",
        headlineStat: "3,100+",
        beforeLabel: "स्थिर कागज़ी नोट्स",
        afterLabel: "लाइव स्कूल सहायता",
      },
      {
        number: 17,
        title: "लक्ष्यों के लिए साझेदारी",
        target: "एसडीजी 17.6",
        headlineStat: "70% कम",
        beforeLabel: "100% क्लिनिक लागत",
        afterLabel: "30% सीमा-पार लागत",
      },
    ],
  },
  vision: {
    title: "विज़न 2030 · एसडीजी 3 क्षितिज",
    milestones: [
      { year: "2026", title: "यूएई–भारत पायलट", sub: "86 स्कूल · 210 विशेषज्ञ", pct: 38 },
      { year: "2028", title: "ऑफ़लाइन क्षेत्रीय विस्तार", sub: "बिना सिग्नल घरेलू व स्कूल टूल", pct: 68 },
      { year: "2030", title: "विज़न 2030 · एसडीजी 3", sub: "हर बच्चे के लिए शांत देखभाल", pct: 100 },
    ],
  },
  bridge: {
    eyebrow: "द्विपक्षीय सहयोग · सीधे एसडीजी 3 को आगे बढ़ाता है",
    heading: "दो ताकतों का मिलन बनाता है मज़बूत देखभाल",
    uaeHeading: "संयुक्त अरब अमीरात (UAE)",
    uaeBadge: "बुनियादी ढाँचा और सुरक्षा",
    indiaHeading: "भारत (India)",
    indiaBadge: "चिकित्सकीय गहराई और तकनीक",
    combinedPrefix: "संयुक्त समाधान",
    sdgImpact: "एसडीजी 3 प्रभाव",
    pairs: [
      {
        id: "screening",
        label: "01. त्वरित समीक्षा",
        uaeTitle: "समावेशी स्कूल ढाँचा",
        uaeDetail: "दुबई और अबू धाबी स्कूलों में नियमित स्क्रीनिंग और समावेशी सहायता डेस्क।",
        indiaTitle: "बहुभाषी विशेषज्ञ",
        indiaDetail: "बेंगलुरु, मुंबई और कोच्चि के प्रमाणित स्पीच, OT और बाल विकास विशेषज्ञ।",
        combinedOutcome:
          "स्कूल के अवलोकन सीधे भारतीय विशेषज्ञों तक पहुँचते हैं—भाषा की बाधा और महीनों का इंतज़ार समाप्त होता है।",
        sdgTarget: "एसडीजी 3.4 और 3.8 · मानसिक कल्याण और समय पर विशेषज्ञ सहायता",
        metricValue: "48 घंटे",
        metricLabel: "पहला विशेषज्ञ मार्गदर्शन समय (16 सप्ताह से घटकर)",
        baselineNote: "साझेदार कक्षाओं में पायलट मापन",
        fillPercent: 86,
      },
      {
        id: "frugal",
        label: "02. किफ़ायती पहुँच",
        uaeTitle: "स्थायी स्वास्थ्य वित्तपोषण",
        uaeDetail: "सुरक्षित डिजिटल स्वास्थ्य मानक और स्कूल-स्तरीय प्रायोजन।",
        indiaTitle: "सुलभ डिजिटल इंजीनियरिंग",
        indiaDetail: "कम-बैंडविड्थ और ऑफ़लाइन चलने वाले सहायक मोबाइल टूल।",
        combinedOutcome:
          "यूएई का सहयोग परिवारों के लिए नि:शुल्क पहुँच देता है और भारतीय तकनीक लागत को कम रखती है।",
        sdgTarget: "एसडीजी 3.c और 17 · कार्यबल और तकनीक का साझा उपयोग",
        metricValue: "70% कम",
        metricLabel: "क्लिनिक-आधारित मॉडल की तुलना में प्रति बच्चा लागत",
        baselineNote: "असिंक्रोनस समीक्षा बनाम व्यक्तिगत क्लिनिक घंटों का अनुमान",
        fillPercent: 78,
      },
      {
        id: "continuity",
        label: "03. घरेलू निरंतरता",
        uaeTitle: "PDPL बाल गोपनीयता",
        uaeDetail: "सख्त डेटा सुरक्षा, द्विभाषी ऑनबोर्डिंग और अभिभावक सहमति नियंत्रण।",
        indiaTitle: "सेंसरी और व्यवहार मॉडल",
        indiaDetail: "कम लागत वाले सेंसरी रूटीन, विज़ुअल शेड्यूल और अभिभावक मार्गदर्शन।",
        combinedOutcome: "माता-पिता को परिचित घरेलू कदम मिलते हैं जिन्हें वे शाम को ऑफ़लाइन भी अपना सकते हैं।",
        sdgTarget: "एसडीजी 3 और 4 · क्लिनिक से कक्षा और घर तक निरंतर देखभाल",
        metricValue: "2.4×",
        metricLabel: "साझा करने वाले परिवारों में साप्ताहिक नियमितता",
        baselineNote: "नूर संकेत और सरल अभिभावक नोट्स द्वारा समर्थित",
        fillPercent: 82,
      },
    ],
  },
  progress: {
    levelLabel: (lvl, title) => `स्तर ${lvl} · ${title}`,
    levelTitles: ["नन्हा अंकुर", "शांत स्वर", "स्थिर पाठक", "क्षितिज निर्माता", "जैतून रक्षक"],
    journeyTitle: "आपकी शांत यात्रा",
    dayStreak: (n) => `${n} दिन की लय`,
    progressTo: (lvl) => `स्तर ${lvl} की प्रगति`,
    completed: "पूर्ण",
    steps: [
      { id: "checkin", label: "मूड जाँच", xp: "+20", to: "/studio" },
      { id: "card", label: "टैप-टू-टॉक", xp: "+15", to: "/studio" },
      { id: "breathe", label: "शांत साँस", xp: "+25", to: "/studio" },
      { id: "therapist", label: "थेरेपिस्ट से बात", xp: "+20", to: "/studio" },
      { id: "chat", label: "नूर से पूछें", xp: "+15", to: "/chat" },
    ],
  },
  about: {
    eyebrow: "अमानह के बारे में · विज़न 2030",
    title: "हर न्यूरोडायवर्जेंट छात्र के लिए शांत, जुड़ी हुई देखभाल।",
    subtitle:
      "अमानह छात्रों, माता-पिता और शिक्षकों को ऑफ़लाइन सेंसरी टूल और 48 घंटे की यूएई–भारत सहायता से जोड़ता है।",
    doveSpeech: "नूर के साथ कदम दर कदम।",
    photoCaptionTag: "दुबई और बेंगलुरु",
    photoCaptionTitle: "बहुभाषी विशेषज्ञों से जुड़ी समावेशी कक्षाएँ।",
    whyExists: "अमानह क्यों बना",
    problemSolutionTitle: "समस्या → समाधान",
    indiaTag: "भारत क्लिनिकल नेटवर्क",
    indiaSubtitle: "210+ प्रमाणित स्पीच और OT विशेषज्ञ।",
    pillarsTag: "मुख्य आधार",
    pillars: [
      { t: "सहमति-आधारित गोपनीयता", d: "UAE PDPL और भारत DPDP के अनुरूप" },
      { t: "टैप-टू-टॉक अभिभावक अलर्ट", d: "तुरंत आश्वासन और देखभाल संकेत" },
      { t: "100% ऑफ़लाइन टूलकिट", d: "साँस अभ्यास, कार्ड और रीडिंग रूलर" },
    ],
    openStudioBtn: "स्टूडियो खोलें",
    sdgImpactBtn: "एसडीजी और प्रभाव",
  },
  partnership: {
    eyebrow: "यूएई–भारत रणनीतिक देखभाल गलियारा · विज़न 2030",
    title: "एसडीजी 3 और विज़न 2030 को आगे बढ़ाती साझेदारी",
    subtitle: "यूएई स्कूल ढाँचा + भारतीय विशेषज्ञ = हर बच्चे के लिए तेज़, शांत सहायता।",
    uaeLabel: "संयुक्त अरब अमीरात",
    uaeTitle: "स्कूल स्क्रीनिंग और डेटा गोपनीयता",
    indiaLabel: "भारत",
    indiaTitle: "बहुभाषी विशेषज्ञ और ऑफ़लाइन-प्रथम तकनीक",
    privacyTitle: "सहमति और बाल डेटा सुरक्षा",
    privacyPoints: [
      "प्रत्येक विशेषज्ञ के लिए अभिभावक की सहमति।",
      "सरल चित्र ताकि बच्चा जाने कि क्या साझा हुआ है।",
      "सीमा-पार समीक्षा से पहले पहचान-रहित नोट्स।",
      "UAE PDPL और भारत के DPDP अधिनियम के अनुरूप।",
    ],
  },
  studio: {
    offlineLabel: "ऑफ़लाइन स्टूडियो",
    label: "अभिव्यक्ति स्टूडियो",
    heading: "अपनी बात अपने तरीके से कहें",
    initialDove: "बोलने और माता-पिता को सूचित करने के लिए कार्ड दबाएँ।",
    savedOffline: (pts) => `ऑफ़लाइन सहेजा गया (+${pts} XP)।`,
    savedOnline: (pts) => `सहेजा गया (+${pts} XP)!`,
    parentAlertOffline: "अभिभावक अलर्ट ऑफ़लाइन कतार में (+15 XP)।",
    parentAlertOnline: (card) => `माता-पिता को सूचित किया: ${card} (+15 XP)!`,
    parentAlertOnlineEmail: (card, email) => `माता-पिता को सूचित किया (${email}): ${card} (+15 XP)!`,
    therapistSentDove: "डॉ. मीरा नायर को भेजा गया (+20 XP)!",
    tabs: {
      cards: "टैप-टू-टॉक",
      mood: "मूड और शांति",
      therapist: "थेरेपिस्ट से बात",
      canvas: "लेखन",
      journey: "प्रगति",
    },
    tapTitle: "टैप-टू-टॉक",
    tapNote: "ज़ोर से बोलता है और तुरंत माता-पिता को सूचित करता है।",
    parentEmailLinked: (email) => `अभिभावक ईमेल सक्रिय: ${email}`,
    parentNotified: (card, offline) =>
      `माता-पिता को सूचना भेजी गई: ${card}${offline ? " (ऑफ़लाइन कतार)" : ""}`,
    parentNotifiedEmail: (card, email, offline) =>
      `माता-पिता को सूचित किया: ${card} → ${email}${offline ? " (ऑफ़लाइन कतार)" : ""}`,
    cards: [
      { id: "help", label: "🙋 मुझे मदद चाहिए", speak: "मुझे मदद चाहिए" },
      { id: "break", label: "⏸️ मुझे ब्रेक चाहिए", speak: "मुझे ब्रेक चाहिए" },
      { id: "loud", label: "🔇 बहुत शोर है", speak: "बहुत शोर है" },
      { id: "thirsty", label: "💧 प्यास लगी है", speak: "प्यास लगी है" },
      { id: "toilet", label: "🚻 शौचालय", speak: "शौचालय" },
      { id: "confused", label: "❓ मुझे समझ नहीं आया", speak: "मुझे समझ नहीं आया" },
      { id: "yes", label: "👍 हाँ", speak: "हाँ" },
      { id: "no", label: "👎 नहीं", speak: "नहीं" },
      { id: "hug", label: "🤗 गले लगाएँ", speak: "गले लगाएँ" },
    ],
    moodTitle: "आप कैसा महसूस कर रहे हैं?",
    moods: [
      { id: "Happy", label: "खुश", e: "😊" },
      { id: "Overwhelmed", label: "अभिभूत", e: "🌊" },
      { id: "Confused", label: "उलझन", e: "🌀" },
      { id: "Tired", label: "थका हुआ", e: "😴" },
      { id: "Anxious", label: "चिंतित", e: "🫧" },
      { id: "Proud", label: "गर्वित", e: "🌟" },
    ],
    intensity: "तीव्रता",
    saveMood: "मूड सहेजें",
    sosTitle: "शांत रीसेट",
    sosNote: "5 सेकंड धीमी साँस गाइड।",
    startSos: "SOS शांति शुरू करें",
    breatheIn: "साँस अंदर लें",
    breatheOut: "साँस बाहर छोड़ें",
    doneXp: "हो गया (+25 XP)",
    cooldownTitle: "कूलडाउन मीटर",
    cooldownLevels: ["शांत 😌", "हल्का गर्म 🙂", "गर्म 😠", "बहुत तेज़ 🌋"],
    cooldownTips: [
      "बहुत बढ़िया कर रहे हैं।",
      "पानी पिएँ + 3 धीमी साँसें।",
      "शांत कोने में जाएँ।",
      "रुकें। अभी सुरक्षित जगह लें।",
    ],
    therapistTitle: "थेरेपिस्ट से बात करें",
    therapistNote: "अपनी केयर टीम विशेषज्ञ से बात करें — ऑनलाइन या ऑफ़लाइन।",
    therapistName: "डॉ. मीरा नायर",
    therapistRole: "स्पीच और सेंसरी केयर विशेषज्ञ · केयर टीम",
    savesOffline: "ऑफ़लाइन सहेजता है",
    careConnected: "केयर टीम जुड़ी है",
    therapistPrompts: [
      "आज कक्षा में बहुत शोर लगा",
      "पढ़ने पर ध्यान लगाने में मदद चाहिए",
      "मैंने साँस लेने का ब्रेक पूरा किया",
      "शांत होमवर्क के लिए कोई सुझाव दें",
    ],
    therapistPlaceholder: "अपने थेरेपिस्ट को शांत संदेश लिखें…",
    send: "भेजें",
    sending: "शांति से भेजा जा रहा है…",
    listen: "सुनें",
    offlineQueued: "ऑफ़लाइन कतार में",
    writingTitle: "लेखन कैनवास",
    writingNote: "डिस्लेक्सिया-अनुकूल फ़ॉन्ट, रूलर और रीड-अलाउड।",
    readAloud: "बोलकर सुनाएँ",
    rulerOn: "रूलर चालू",
    rulerOff: "रूलर बंद",
    syllablesOn: "शब्दांश चालू",
    syllablesOff: "शब्दांश बंद",
    defaultCanvasText: "आज मुझे लगा…",
    saveNote: "नोट सहेजें",
    recentShares: "हाल की साझा बातें",
    syncedLabel: "सिंक किया गया",
    offlineLabelTag: "ऑफ़लाइन",
    addCardTile: "कार्ड जोड़ें",
    addCardTitle: "कस्टम टैप-टू-टॉक कार्ड जोड़ें",
    addCardNote:
      "बच्चे की असली पानी की बोतल, पसंदीदा खिलौने या शांत कोने की फ़ोटो लें और अपनी आवाज़ रिकॉर्ड करें।",
    cardLabel: "कार्ड का नाम",
    cardLabelPlaceholder: "उदा. मेरी नीली पानी की बोतल",
    cardQuickLabels: ["मेरी पानी की बोतल", "पसंदीदा फ़िजेट खिलौना", "स्कूल का शांत कोना"],
    photoStep: "1 · असली फ़ोटो",
    takeOrUploadPhoto: "फ़ोटो चुनें / लें",
    useCamera: "लाइव कैमरा",
    snapPhoto: "फ़ोटो खींचें",
    closeCamera: "कैमरा बंद करें",
    cameraUnavailable: "लाइव कैमरा उपलब्ध नहीं है — कृपया फ़ोटो चुनें / लें बटन का उपयोग करें।",
    voiceStep: "2 · आपकी आवाज़ (वैकल्पिक)",
    recordVoice: "आवाज़ रिकॉर्ड करें",
    stopRecording: "रिकॉर्डिंग रोकें",
    reRecord: "फिर से रिकॉर्ड करें",
    micUnavailable: "माइक्रोफ़ोन उपलब्ध नहीं — सहेजा गया कार्ड स्पष्ट आवाज़ में पढ़ेगा।",
    voiceRecordedReady: "आपकी आवाज़ रिकॉर्ड हो गई है।",
    saveCard: "कार्ड सहेजें",
    cancel: "रद्द करें",
    deleteCard: "कस्टम कार्ड हटाएँ",
    customVoicePlayed: (label) =>
      `आपका कस्टम कार्ड चला और माता-पिता को सूचित किया गया: ${label} (+15 XP)!`,
    firstThen: {
      title: "पहले – फिर (First–Then) इनाम बोर्ड",
      subtitle: "नूर की कहानी का समय अनलॉक करने के लिए एक शांत लेखन नोट पूरा करें।",
      firstBadge: "पहले",
      firstTask: "1 लेखन नोट पूरा करें",
      firstAction: "लेखन पर जाएँ",
      firstDone: "पूर्ण",
      thenBadge: "फिर",
      thenTask: "नूर कबूतर की कहानियों के साथ 5 मिनट",
      lockedNote: "1 नोट सहेजने के तुरंत बाद अनलॉक होगा",
      openStory: "नूर की कहानी खोलें",
      hideStory: "कहानी छुपाएँ",
      storyTitle: "नूर और शांत जैतून का पेड़",
      storyText:
        "एक शांत धूप वाले आँगन के ऊपर, कबूतर नूर को एक नरम शाखा मिली। जब भी हवा तेज़ होती, नूर अपने पंख धीरे से समेटती, चार गिनती तक गहरी साँस लेती और शांत मन से बादलों को गुजरते देखती।",
      stories: [
        {
          title: "नूर और शांत जैतून का पेड़",
          text: "एक शांत धूप वाले आँगन के ऊपर, कबूतर नूर को एक नरम शाखा मिली। जब भी हवा तेज़ होती, नूर अपने पंख धीरे से समेटती, चार गिनती तक गहरी साँस लेती और शांत मन से बादलों को गुजरते देखती।",
        },
        {
          title: "नूर और कागज़ की लालटेन नाव",
          text: "शाम के समय शांत शारजाह खाड़ी के किनारे, नूर ने एक छोटी कागज़ की नाव को धीरे-धीरे तैरते देखा। हर हल्की लहर के साथ नूर ने एक धीमी साँस अंदर ली और लंबी साँस बाहर छोड़ी।",
        },
        {
          title: "नूर और मानसून की बूँदों का गीत",
          text: "कोच्चि के शांत बरामदे में बैठकर नूर ने केले के पत्तों पर गिरती बारिश की लय सुनी। बिना जल्दबाज़ी के नूर ने एक-दो-तीन-चार की कोमल ताल पर मन को शांत किया।",
        },
        {
          title: "नूर और तारों भरा रेतीला टीला",
          text: "सूरज ढलने के बाद जब रेत ठंडी और सुनहरी हुई, नूर एक शांत टीले पर बैठी। ऊपर तीन चमकते तारों को देखकर उसने आज के छोटे कदम के लिए शांत धन्यवाद कहा।",
        },
        {
          title: "नूर और चमेली का बगीचा",
          text: "सुबह की हल्की धूप में चमेली के फूलों के बीच नूर ने एक शांत खेल खेला: दो सफ़ेद फूल, एक ठंडा पत्थर का फव्वारा, और पंखों पर आराम करती गुनगुनी धूप।",
        },
        {
          title: "नूर और शांत पुस्तकालय का बादल",
          text: "कक्षा की खिड़की के पास नीले गद्दे पर बैठकर नूर ने सीखा कि बड़ा पन्ना एक साथ नहीं पढ़ना होता। एक समय में एक पंक्ति और थोड़ा विराम हर वाक्य को आसान बना देता है।",
        },
        {
          title: "नूर और आम के बाग की हवा",
          text: "हरे आम के पेड़ों की छाया में नूर ने ठंडी हवा महसूस की। उसने थोड़ा पानी पिया, कंधे ढीले छोड़े, और महसूस किया कि समय पर ब्रेक लेने से मन कितना हल्का लगता है।",
        },
        {
          title: "नूर और चिकने पत्थरों का पुल",
          text: "एक साफ बहती धारा के पार पाँच चिकने पत्थर थे। नूर बिना किसी दौड़ के एक समय में बस एक पत्थर पर उतरी—हर शांत कदम उसे सुरक्षित धूप वाले किनारे तक ले आया।",
        },
      ],
      newStory: "कहानी बदलें",
      storyCounter: (current, total) => `कहानी ${current} / ${total}`,
      educatorPreview: "नूर की कहानी खोलें (शिक्षक)",
      listenStory: "कहानी सुनें",
      startTimer: "5:00 टाइमर शुरू करें",
      pauseTimer: "रोकें",
      resetTimer: "रीसेट",
      claimReward: "इनाम पूरा करें (+15 XP)",
      rewardClaimed: "इनाम प्राप्त हुआ (+15 XP)",
      rewardEarnedDove: "शानदार पहले–फिर फ़ोकस! कहानी इनाम पूरा हुआ (+15 XP)।",
    },
  },
  chat: {
    welcome:
      "सलाम और नमस्ते — मैं नूर हूँ, Gemini द्वारा संचालित आपकी शांत गाइड। मुझसे साँस अभ्यास या सेंसरी सुझाव पूछें।",
    cleared: "नया पन्ना तैयार है। आज नूर आपकी क्या मदद कर सकती है?",
    title: "नूर · शांत गाइड",
    offlineStatus: "ऑफ़लाइन शांत गाइड सक्रिय",
    geminiStatus: "Gemini AI · शांत सहायता",
    clearBtn: "चैट साफ़ करें",
    openTabBtn: "पूरा नूर चैट टैब खोलें",
    closeBtn: "सहायक बंद करें",
    readAloud: "सुनें",
    geminiTag: "Gemini",
    offlineGuideTag: "ऑफ़लाइन गाइड",
    thinking: "नूर शांति से सोच रही है…",
    busyFallback: "Gemini व्यस्त था, इसलिए नूर ने ऑफ़लाइन गाइड से उत्तर दिया।",
    networkFallback: "नेटवर्क उपलब्ध नहीं — नूर ने ऑफ़लाइन शांत गाइड का उपयोग किया।",
    placeholder: "नूर से कुछ भी पूछें…",
    closeNoor: "नूर बंद करें",
    askNoor: "नूर से पूछें",
    pageTitle: "नूर, आपकी शांत गाइड",
    pageDesc: "ऑनलाइन होने पर Gemini से और ऑफ़लाइन मोड में स्थानीय शांत रूटीन से सहायता।",
    doveSpeech: "अपना समय लें। छोटे वाक्य, ऑडियो रीड-अलाउड और ऑफ़लाइन गाइड हमेशा तैयार हैं।",
    activeRole: "सक्रिय भूमिका",
    tailoredNeeds: "अनुकूलित ज़रूरतें",
    generalComfort: "सामान्य सेंसरी आराम",
    promptsByRole: {
      child: [
        "मुझे अभी बहुत दबाव महसूस हो रहा है",
        "धीरे साँस लेने में मदद करें",
        "2 मिनट का आसान फ़ोकस कदम बताएँ",
      ],
      parent: [
        "आज रात का होमवर्क शांत कैसे बनाएं?",
        "मेरे बच्चे का स्कूल का दिन शोरगुल भरा था",
        "यूएई–भारत विज़न 2030 कैसे मदद करता है?",
      ],
      educator: [
        "कक्षा में सेंसरी ओवरलोड के लिए त्वरित संकेत",
        "चयनात्मक मौन के लिए बिना दबाव संकेत",
        "20 मिनट के पाठ को छोटे भागों में कैसे बाँटें",
      ],
    },
  },
};

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: EN,
  ar: AR,
  hi: HI,
};

export function getSpeechLocale(lang: Language): string {
  if (lang === "ar") return "ar-SA";
  if (lang === "hi") return "hi-IN";
  return "en-US";
}
