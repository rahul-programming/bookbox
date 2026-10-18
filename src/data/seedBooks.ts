import { Book, IdeaCard, StashBoard } from '../types';
import { ATOMIC_HABITS_BOOK } from './books/atomicHabitsExpanded';

export const SEED_BOOKS: Book[] = [
  ATOMIC_HABITS_BOOK,
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    coverColor: 'from-blue-600 to-indigo-900',
    coverEmoji: '🎯',
    readingTimeMinutes: 15,
    publishedYear: 2016,
    tags: ['Focus', 'Productivity', 'Knowledge Work', 'Deep Focus'],
    onePageSummary: {
      elevatorPitch: 'Deep Work demonstrates that the ability to concentrate without distraction on cognitively demanding tasks is becoming both rare and unprecedentedly valuable.',
      coreThesis: 'Deep work produces high-value economic output and psychological fulfillment; shallow work (emails, chat, notifications) keeps you busy while draining your creative capacity.',
      keyPillars: [
        'The Deep Work Hypothesis: The skill to produce at an elite level requires sustained, uninterrupted focus.',
        'Attention Residue: Every context switch leaves a cognitive fog that impairs peak mental performance.',
        'The 4 Deep Work Disciplines: Choose a scheduling philosophy, embrace boredom, drain the shallows, and quit toxic distraction networks.'
      ],
      strengths: [
        'A powerful, urgent antidote to the modern culture of constant hyper-connectivity.',
        'Provides pragmatic scheduling philosophies tailored to varying career constraints.',
        'Rigorous intellectual and historical defense of solitary craftsmanship.'
      ],
      blindSpotsAndCounterarguments: [
        'Harder to implement for people whose roles depend on real-time coordination, support, or crisis response.',
        'Can drift into purist isolationism that overlooks collaborative serendipity.'
      ]
    },
    blinks: [
      {
        id: 'dw-blink-1',
        order: 1,
        headline: 'Deep Work is rare, valuable, and meaningful',
        content: `Cal Newport defines Deep Work as professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.

In contrast, Shallow Work consists of logistical, non-cognitively demanding tasks often performed while distracted. In an economy dominated by algorithmic automation, shallow workers are replaceable commodities, whereas deep workers thrive and command premium value.`,
        keyTakeaway: 'High-Quality Work Produced = (Time Spent) x (Intensity of Focus). Eliminate shallow distraction to maximize cognitive output.',
        audioSnippetText: 'Deep Work is rare, valuable, and meaningful. Professional activities performed in distraction-free concentration push your cognitive limits and produce rare, irreplaceable value.'
      },
      {
        id: 'dw-blink-2',
        order: 2,
        headline: 'Attention Residue destroys peak performance',
        content: `When you switch from Task A to Task B, your attention does not immediately follow. A residue of your attention remains stuck thinking about the previous task. Even a quick 30-second glance at an inbox or notification fragment leaves attention residue that severely degrades problem-solving ability for up to twenty minutes.

Batching tasks into dedicated, continuous blocks is the only way to work with a completely clear, high-bandwidth mind.`,
        keyTakeaway: 'Never check incoming messages during a deep work session. Even a momentary glance leaves attention residue that sabotages deep thinking.',
        audioSnippetText: 'Attention residue destroys peak performance. Even a quick glance at an inbox leaves cognitive residue that degrades your thinking for up to twenty minutes.'
      },
      {
        id: 'dw-blink-3',
        order: 3,
        headline: 'Choose your Deep Work philosophy',
        content: `Deep work requires deliberate scheduling. Newport outlines four primary philosophies:
1. Monastic: Eliminating all shallow obligations entirely (rare, suited for novelists or pure researchers).
2. Bimodal: Dividing time into clearly separated deep chunks (e.g., 3 days on, 2 days off).
3. Rhythmic: Transforming deep work into a daily, predictable habit (e.g., 6:00 AM to 8:30 AM every morning).
4. Journalistic: Dropping into deep work spontaneously whenever a window opens (demands seasoned discipline).`,
        keyTakeaway: 'For most knowledge workers, the Rhythmic philosophy (carving out an uncompromised 90-120 minute morning block) is the most sustainable.',
        audioSnippetText: 'Choose your deep work philosophy. The rhythmic approach, setting an uncompromised 90-minute block every single morning, creates a reliable engine for deep progress.'
      },
      {
        id: 'dw-blink-4',
        order: 4,
        headline: 'Embrace boredom and rewire your focus threshold',
        content: `If every momentary delay in your day (standing in an elevator, waiting in line) is met with reaching for your phone, your brain becomes addicted to constant novel stimuli. When you sit down to do deep work, your neural circuitry rebels against the silence.

Train yourself to tolerate boredom without reaching for digital pacifiers. Schedule your internet use instead of scheduling your focus; let distraction be the exception, not the default.`,
        keyTakeaway: 'You cannot sustain deep focus during work hours if you cultivate distraction during your downtime.',
        audioSnippetText: 'Embrace boredom and rewire your focus. If you reach for your phone at every idle second, you weaken your mental ability to concentrate when it counts.'
      },
      {
        id: 'dw-blink-5',
        order: 5,
        headline: 'Drain the shallows and execute a shutdown ritual',
        content: `Shallow work expands to fill all available time. Rigorously audit your daily calendar. Implement fixed-schedule productivity: set a definitive end time for your workday (e.g., 5:30 PM) and work backward to ruthlessly cut low-value meetings and communication.

Conclude every workday with a formal shutdown ritual: check your task queue, verify that tomorrow is organized, and utter a clear shutdown phrase to signal to your subconscious that work is completely paused.`,
        keyTakeaway: 'A crisp, non-negotiable shutdown ritual restores the mental energy needed for deep focus tomorrow.',
        audioSnippetText: 'Drain the shallows and execute a daily shutdown ritual. Close your loops, plan tomorrow, and shut down completely to restore mental energy.'
      }
    ],
    mindMap: {
      id: 'dw-root',
      label: 'Deep Work Philosophy',
      description: 'The strategy of high-leverage focus in a distracted world',
      children: [
        {
          id: 'dw-thesis',
          label: 'The Deep Work Hypothesis',
          children: [
            { id: 'dw-law', label: 'The Productivity Equation', description: 'Work = Time x Focus Intensity' },
            { id: 'dw-residue', label: 'Attention Residue', description: 'Context switching leaves cognitive lag' }
          ]
        },
        {
          id: 'dw-rules',
          label: 'The 4 Rules',
          children: [
            { id: 'dw-rule-1', label: '1. Work Deeply', description: 'Select Monastic, Bimodal, Rhythmic, or Journalistic' },
            { id: 'dw-rule-2', label: '2. Embrace Boredom', description: 'Resist digital pacifiers to rebuild focus stamina' },
            { id: 'dw-rule-3', label: '3. Quit Social Media', description: 'Apply the craftsman approach to digital tools' },
            { id: 'dw-rule-4', label: '4. Drain Shallows', description: 'Fixed-schedule productivity & shutdown ritual' }
          ]
        }
      ]
    },
    reflectionExercises: [
      {
        id: 'dw-ex-1',
        chapterOrder: 1,
        title: 'Attention Residue Log',
        prompt: 'Identify the top three digital triggers that pull you out of focus during deep work. How many times an hour do you check them, and what boundary will you put in place tomorrow?'
      },
      {
        id: 'dw-ex-2',
        chapterOrder: 2,
        title: 'Rhythmic Block Design',
        prompt: 'Design a sacred 90-minute daily deep work block for tomorrow. What single high-value project will you tackle, and how will you signal to colleagues that you are offline?'
      }
    ]
  },
  {
    id: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    coverColor: 'from-emerald-600 to-teal-900',
    coverEmoji: '🧠',
    readingTimeMinutes: 15,
    publishedYear: 2011,
    tags: ['Cognitive Bias', 'Decision Making', 'Behavioral Economics', 'Psychology'],
    onePageSummary: {
      elevatorPitch: 'Nobel laureate Daniel Kahneman reveals the dual cognitive engines that govern human judgment, exposing our predictable irrationalities and systematic biases.',
      coreThesis: 'Human thought is guided by two systems: System 1 (fast, intuitive, emotional, automatic) and System 2 (slow, deliberative, logical, effortful). Most human errors stem from trusting intuitive heuristics when slow analysis is required.',
      keyPillars: [
        'System 1 vs System 2: System 1 operates effortlessly but relies on cognitive shortcuts; System 2 is lazy and avoids heavy computation whenever possible.',
        'Heuristics & Biases: Anchoring, availability heuristic, loss aversion, and framing alter our reality without our conscious awareness.',
        'The Two Selves: The Experiencing Self lives in the moment, but the Remembering Self governs our choices based on peak moments and ending states (Peak-End Rule).'
      ],
      strengths: [
        'The bedrock foundation of modern behavioral economics.',
        'Extensive empirical research debunking the myth of the perfectly rational human.',
        'Reveals why smart people make consistently flawed assessments.'
      ],
      blindSpotsAndCounterarguments: [
        'Some replication crisis controversies around certain social priming studies in Chapter 4.',
        'Knowing biases exist does not automatically inoculate you against committing them.'
      ]
    },
    blinks: [
      {
        id: 'tfs-blink-1',
        order: 1,
        headline: 'System 1 and System 2: The Two Drivers of the Mind',
        content: `System 1 runs automatically and quickly, with little or no effort and no sense of voluntary control (e.g., detecting anger in a voice, reading billboard words, ducking a flying object). 

System 2 allocates attention to effortful mental operations, including complex computations, critical thinking, and agency (e.g., calculating 17 x 24, checking the validity of a complex argument). Because System 2 is metabolically expensive and inherently lazy, it routinely endorses System 1 impressions without scrutiny.`,
        keyTakeaway: 'Recognize when high-stakes decisions require deliberately summoning lazy System 2 to override fast gut reactions.',
        audioSnippetText: 'System 1 and System 2: The two drivers of the mind. System 1 is fast and emotional; System 2 is slow and analytical. Most errors happen when we let fast intuition answer complex questions.'
      },
      {
        id: 'tfs-blink-2',
        order: 2,
        headline: 'WYSIATI: What You See Is All There Is',
        content: `System 1 excels at constructing the most coherent story possible from whatever fragments of information are immediately visible. It cannot represent what it does not know. 

This phenomenon—What You See Is All There Is (WYSIATI)—explains why people are wildly overconfident in initial judgments based on sparse evidence. We judge the quality of an explanation by the narrative coherence it generates rather than its statistical completeness.`,
        keyTakeaway: 'Always ask: "What evidence is missing from this narrative that would completely change my conclusion?"',
        audioSnippetText: 'What You See Is All There Is. Our minds construct coherent stories from partial fragments and mistake narrative consistency for objective reality.'
      },
      {
        id: 'tfs-blink-3',
        order: 3,
        headline: 'Loss Aversion and Prospect Theory',
        content: `Human beings are biologically asymmetric in their emotional responses to gains and losses. Losses loom roughly twice as large as equivalent gains: the psychological agony of losing $100 is twice as potent as the pleasure of finding $100.

This asymmetry leads to irrational risk aversion when facing potential gains, but reckless gamble-seeking when trying to escape certain losses.`,
        keyTakeaway: 'Loss aversion causes investors to sell winners too early and hold losers too long. Reframe decisions objectively.',
        audioSnippetText: 'Loss aversion and Prospect Theory. The psychological pain of a loss is twice as strong as the joy of a gain, driving systematic irrationality in decisions.'
      },
      {
        id: 'tfs-blink-4',
        order: 4,
        headline: 'The Peak-End Rule and the Two Selves',
        content: `Kahneman demonstrates a profound rift between the Experiencing Self (who lives through each moment) and the Remembering Self (who keeps score and makes decisions).

The Remembering Self does not compute the mathematical sum of an experience; instead, it evaluates memories through the Peak-End Rule: the emotional intensity of the peak moment and the closing moment. Duration neglect means long discomfort is forgiven if the finish is peaceful.`,
        keyTakeaway: 'Design experiences and learning sessions with memorable peaks and exceptional endings.',
        audioSnippetText: 'The Peak-End Rule. How an experience ends and its most intense moment dictate our memories far more than its total duration.'
      }
    ],
    mindMap: {
      id: 'tfs-root',
      label: 'Cognitive Architecture',
      children: [
        {
          id: 'tfs-systems',
          label: 'Dual Systems',
          children: [
            { id: 'tfs-s1', label: 'System 1', description: 'Fast, automatic, associative, heuristic' },
            { id: 'tfs-s2', label: 'System 2', description: 'Slow, logical, effortful, lazy' }
          ]
        },
        {
          id: 'tfs-biases',
          label: 'Primary Heuristics',
          children: [
            { id: 'tfs-wysiati', label: 'WYSIATI', description: 'Narrative coherence over statistical validity' },
            { id: 'tfs-anchoring', label: 'Anchoring Effect', description: 'Disproportionate influence of initial numbers' },
            { id: 'tfs-loss', label: 'Loss Aversion', description: 'Losses hurt 2x more than gains feel good' }
          ]
        }
      ]
    },
    reflectionExercises: [
      {
        id: 'tfs-ex-1',
        chapterOrder: 1,
        title: 'WYSIATI Decision Audit',
        prompt: 'Recall a recent important choice you made quickly. What were three critical facts or data points that you did NOT know at the time, which could have changed your verdict?'
      }
    ]
  },
  {
    id: 'psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    coverColor: 'from-violet-600 to-indigo-900',
    coverEmoji: '💵',
    readingTimeMinutes: 15,
    publishedYear: 2020,
    tags: ['Wealth', 'Investing', 'Financial Freedom', 'Behavioral Finance'],
    onePageSummary: {
      elevatorPitch: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
      coreThesis: 'Financial success is not a hard science; it is a soft skill where your behavior, patience, and humility matter far more than spreadsheet math or financial modeling.',
      keyPillars: [
        'Compounding Over Heroics: The greatest investment skill is staying in the game long enough for compound interest to do the heavy lifting.',
        'Wealth is What You Do Not See: Riches are fancy cars and watches; wealth is unspent assets that grant freedom, autonomy, and flexibility.',
        'Room for Error: The most important part of every plan is planning for your plan not going according to plan.'
      ],
      strengths: [
        'Masterful storytelling that cuts through Wall Street jargon.',
        'Reframes wealth around sovereign time and freedom rather than conspicuous consumption.',
        'Accessible, timeless wisdom for anyone at any income level.'
      ],
      blindSpotsAndCounterarguments: [
        'Pragmatic index-fund indexing may feel uninspiring for active entrepreneurs seeking outsized alpha.'
      ]
    },
    blinks: [
      {
        id: 'pom-blink-1',
        order: 1,
        headline: 'No one is crazy: Financial backgrounds shape worldview',
        content: `Your personal experiences with money make up maybe 0.00000001% of what has happened in the world, but maybe 80% of how you think the world works. 

Someone who grew up during hyperinflation views risk differently than someone who grew up during a historic tech bull market. When people make financial choices, they are answering the question: "Does this make sense given my lived experience and emotional wiring?"`,
        keyTakeaway: 'Respect diverse perspectives on financial risk; behavior is driven by personal narrative, not pure mathematics.',
        audioSnippetText: 'No one is crazy. Your personal experiences with money shape your worldview. What seems irrational to you often makes complete sense to someone with a different history.'
      },
      {
        id: 'pom-blink-2',
        order: 2,
        headline: 'The compounding miracle of endurance',
        content: `More than 99% of Warren Buffett’s wealth was accumulated after his 50th birthday. His skill is investing, but his secret is time: he has been compounding consistently for over three-quarters of a century.

Good investing isn’t about earning the highest possible annual returns; it is about earning pretty good returns that you can stick with for the longest unbroken duration.`,
        keyTakeaway: 'Longevity and emotional resilience are the true drivers of compounding. Never interrupt compounding unnecessarily.',
        audioSnippetText: 'The miracle of endurance. Warren Buffett accumulated ninety-nine percent of his wealth after age fifty. His real superpower is uninterrupted time.'
      },
      {
        id: 'pom-blink-3',
        order: 3,
        headline: 'Freedom: The highest dividend money pays',
        content: `The highest form of wealth is the ability to wake up every morning and say: "I can do whatever I want today."

Having a strong financial cushion buys something more valuable than luxury goods: it buys control over your calendar, independence from toxic environments, and the ability to choose projects on your own terms.`,
        keyTakeaway: 'Use money to buy back your sovereignty and peace of mind.',
        audioSnippetText: 'Freedom: The highest dividend money pays. The highest form of wealth is the ability to wake up every morning with complete control over your own time.'
      }
    ],
    mindMap: {
      id: 'pom-root',
      label: 'The Psychology of Money',
      children: [
        {
          id: 'pom-pillars',
          label: 'Core Tenets',
          children: [
            { id: 'pom-behavior', label: 'Behavior Over IQ', description: 'Financial success is a soft skill' },
            { id: 'pom-freedom', label: 'True Wealth', description: 'Unspent options and time sovereignty' },
            { id: 'pom-margin', label: 'Margin of Safety', description: 'Room for error protects compounding' }
          ]
        }
      ]
    },
    reflectionExercises: [
      {
        id: 'pom-ex-1',
        chapterOrder: 1,
        title: 'Defining "Enough"',
        prompt: 'What lifestyle standard defines "enough" for you? Where are you currently tempted to move the goalposts, and what would it mean to prioritize time autonomy over extra status?'
      }
    ]
  },
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    category: 'Philosophy',
    coverColor: 'from-amber-700 to-stone-900',
    coverEmoji: '🏛️',
    readingTimeMinutes: 15,
    publishedYear: 180,
    tags: ['Stoicism', 'Philosophy', 'Resilience', 'Mindset'],
    onePageSummary: {
      elevatorPitch: 'The private personal journal of Rome’s philosopher-emperor, articulating timeless Stoic wisdom on mastering your inner citadel in a chaotic universe.',
      coreThesis: 'You have power over your mind—not outside events. Realize this, and you will find unstoppable inner strength.',
      keyPillars: [
        'Dichotomy of Control: Focus exclusively on your own character, actions, and judgments; external circumstances are indifferent.',
        'Amor Fati: Embrace fate as a partner rather than an adversary.',
        'The Obstacle is the Way: The impediment to action advances action. What stands in the way becomes the way.'
      ],
      strengths: [
        'Profound psychological resilience forged in actual historical crises (plague, betrayal, war).',
        'Raw, honest self-talk without academic pretense.',
        'Provides an unshakeable moral compass.'
      ],
      blindSpotsAndCounterarguments: [
        'Extreme emotional detachment can occasionally flirt with passive fatalism if misapplied.'
      ]
    },
    blinks: [
      {
        id: 'med-blink-1',
        order: 1,
        headline: 'The Inner Citadel: Guarding the Dichotomy of Control',
        content: `Marcus Aurelius reminds himself that the world outside his mind cannot touch him unless he grants it permission. People will be meddling, ungrateful, arrogant, and dishonest. Yet none of these behaviors can injure you because they cannot force you into dishonor or corrupt your reason.

Divide the world cleanly into what is within your control (your opinions, desires, virtues, reactions) and what is not (the past, other people, the future). Invest 100% of your energy into the former.`,
        keyTakeaway: 'You cannot control the weather, the market, or other people; you can always control your reaction.',
        audioSnippetText: 'The Inner Citadel. You have power over your mind, not outside events. Realize this, and you will find strength.'
      },
      {
        id: 'med-blink-2',
        order: 2,
        headline: 'The Obstacle is the Way',
        content: `When a path is blocked, do not despair. The obstacle itself becomes the material for virtue. If someone opposes you, they give you the opportunity to practice patience. If plans fall apart, you are handed a chance to cultivate adaptability. 

Just as a fire turns everything thrown into it into flame, a disciplined mind converts friction into forward velocity.`,
        keyTakeaway: 'Every roadblock is an invitation to exercise virtue and resilience.',
        audioSnippetText: 'The obstacle is the way. The impediment to action advances action. What stands in the way becomes the path forward.'
      }
    ],
    mindMap: {
      id: 'med-root',
      label: 'Stoic Principles',
      children: [
        {
          id: 'med-virtues',
          label: 'The Four Virtues',
          children: [
            { id: 'med-wisdom', label: 'Wisdom', description: 'Discerning good, bad, and indifferent' },
            { id: 'med-courage', label: 'Courage', description: 'Endurance in the face of fear and hardship' },
            { id: 'med-justice', label: 'Justice', description: 'Duty toward the common good' },
            { id: 'med-temperance', label: 'Temperance', description: 'Self-mastery and restraint' }
          ]
        }
      ]
    },
    reflectionExercises: [
      {
        id: 'med-ex-1',
        chapterOrder: 1,
        title: 'Morning Premeditation',
        prompt: 'What frustrating situation or difficult personality are you likely to encounter today? How can you reframe this friction into an opportunity to practice patience?'
      }
    ]
  }
];

export const SEED_IDEAS: IdeaCard[] = [
  ...(ATOMIC_HABITS_BOOK.ideaCards || []),
  {
    id: 'idea-3',
    bookId: 'deep-work',
    bookTitle: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    type: 'mental-model',
    headline: 'Attention Residue lingers after every quick check',
    body: 'Every time you glance at your inbox or phone, part of your attention remains stuck on that message. You never operate at 100% capacity in a state of fractured focus.',
    actionItem: 'Batch all communication into two dedicated 30-minute daily windows.',
    tags: ['Focus', 'Attention', 'Cognitive Bandwidth'],
    isStashed: true,
    stashBoardIds: ['board-focus'],
    createdAt: Date.now() - 86400000 * 3
  },
  {
    id: 'idea-4',
    bookId: 'thinking-fast-and-slow',
    bookTitle: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: 'Psychology',
    type: 'mental-model',
    headline: 'WYSIATI: What You See Is All There Is',
    body: 'Our minds construct coherent stories from partial fragments and mistake narrative consistency for objective truth.',
    quote: 'We are prone to overestimate how much we understand about the world and to underestimate the role of chance.',
    tags: ['Cognitive Bias', 'Decision Making', 'Mental Models'],
    isStashed: true,
    stashBoardIds: ['board-models'],
    createdAt: Date.now() - 86400000 * 4
  },
  {
    id: 'idea-5',
    bookId: 'psychology-of-money',
    bookTitle: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    type: 'quote',
    headline: 'True wealth is the ability to control your calendar',
    body: 'The highest dividend money pays is the ability to wake up every morning and say: "I can do whatever I want today."',
    quote: 'Doing well with money has a little to do with how smart you are and a lot to do with how you behave.',
    tags: ['Wealth', 'Freedom', 'Lifestyle'],
    isStashed: true,
    stashBoardIds: ['board-wealth'],
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: 'idea-6',
    bookId: 'meditations',
    bookTitle: 'Meditations',
    author: 'Marcus Aurelius',
    category: 'Philosophy',
    type: 'quote',
    headline: 'The impediment to action advances action',
    body: 'What stands in the way becomes the way. Every obstacle is simply new raw material for exercising patience, virtue, and ingenuity.',
    quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    tags: ['Stoicism', 'Resilience', 'Mindset'],
    isStashed: true,
    stashBoardIds: ['board-models'],
    createdAt: Date.now() - 86400000 * 6
  }
];

export const SEED_BOARDS: StashBoard[] = [
  {
    id: 'board-models',
    name: 'Mental Models',
    description: 'Frameworks for sharper reasoning and decision making',
    icon: '🧠',
    color: 'bg-emerald-500',
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'board-focus',
    name: 'Peak Focus & Flow',
    description: 'Tactics for deep work, distraction defense, and high output',
    icon: '⚡',
    color: 'bg-blue-500',
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: 'board-wealth',
    name: 'Financial Sovereignty',
    description: 'Long-term compounding, frugality, and autonomy',
    icon: '💎',
    color: 'bg-purple-500',
    createdAt: Date.now() - 86400000 * 5
  }
];

