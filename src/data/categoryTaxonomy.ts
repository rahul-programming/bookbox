import { Category } from '../types';

export const CATEGORIES: Category[] = [
  'Productivity',
  'Psychology',
  'Communication',
  'Leadership & Career',
  'Business & Strategy',
  'Sales & Persuasion',
  'Money & Investing',
  'Health & Longevity',
  'Personal Growth',
  'Philosophy',
  'Spirituality',
  'Creativity & Expression'
];

export const CATEGORY_SUBCATEGORIES: Record<Category, string[]> = {
  'Productivity': [
    'Habits & Routines',
    'Focus & Deep Work',
    'Time Management',
    'Beating Procrastination',
    'Organization & Minimalism',
    'Energy & Burnout',
    'Goal Setting & Execution',
    'Digital Detox & Attention',
    'Daily Systems & Workflows',
    'Speed Reading & Learning'
  ],
  'Psychology': [
    'Human Behavior',
    'Cognitive Biases & Logic',
    'Mental Health & Healing',
    'Emotional Intelligence',
    'Anxiety & Stress Relief',
    'Decision Making',
    'Social Psychology',
    'Personality & Shadow Work',
    'Brain & Neuroscience',
    'Evolutionary Psychology'
  ],
  'Communication': [
    'Difficult Conversations',
    'Nonviolent Communication',
    'Relationships & Love',
    'Body Language & Non-Verbal',
    'Active Listening & Empathy',
    'Boundaries & Assertiveness',
    'Parenting & Family',
    'Conflict Resolution',
    'Remote & Digital Communication',
    'Social Skills & Charisma'
  ],
  'Leadership & Career': [
    'Team Leadership',
    'Management & Operations',
    'Company Culture',
    'Career Growth & Promotion',
    'Executive Presence',
    'Hiring & Talent Development',
    'Workplace Politics',
    'Personal Brand & Reputation',
    'Mentorship & Coaching',
    'Change Management & Vision'
  ],
  'Business & Strategy': [
    'Strategy & Competitive Moats',
    'Entrepreneurship & Startups',
    'Economics & Market Dynamics',
    'Innovation & Disruption',
    'Scaling & Growth',
    'Product Management & Design',
    'Business Models & Pricing',
    'Risk & Antifragility',
    'Corporate Case Studies',
    'Future Tech & Trends'
  ],
  'Sales & Persuasion': [
    'Persuasion & Influence',
    'Negotiation Tactics',
    'Sales Strategy & Closing',
    'Storytelling in Sales',
    'Prospecting & Outreach',
    'Buyer Psychology',
    'Marketing & Brand Strategy',
    'Objection Handling',
    'Pricing & Value Propositions',
    'Relationship Selling'
  ],
  'Money & Investing': [
    'Personal Finance & Budgeting',
    'Investing & Asset Allocation',
    'Money Psychology',
    'Wealth Building & Compounding',
    'Financial Independence & FIRE',
    'Real Estate & Cash Flow',
    'Macroeconomics & Markets',
    'Taxes & Financial Defense',
    'Retirement & Legacy Planning',
    'Behavioral Finance'
  ],
  'Health & Longevity': [
    'Sleep & Circadian Rhythms',
    'Longevity & Vitality',
    'Fitness & Strength',
    'Nutrition & Metabolism',
    'Breathwork & Somatics',
    'Stress Reduction & Nervous System',
    'Mind-Body Connection',
    'Gut Health & Microbiome',
    'Fasting & Cellular Health',
    'Mental Stamina & Biohacking'
  ],
  'Personal Growth': [
    'Purpose & Meaning',
    'Resilience & Mental Toughness',
    'Mindset & Growth',
    'Self-Confidence & Courage',
    'Overcoming Trauma & Adversity',
    'Life Transitions & Reinvention',
    'Authenticity & Self-Worth',
    'Motivation & Drive',
    'Discipline & Self-Control',
    'Life Design & Vision'
  ],
  'Philosophy': [
    'Stoicism & Ancient Wisdom',
    'Ethics & Moral Reasoning',
    'Existentialism & Meaning',
    'Critical Thinking & Truth',
    'Eastern Philosophy',
    'Political & Social Philosophy',
    'Epistemology & Knowledge',
    'Philosophical Life Guides',
    'Dilemmas & Thought Experiments',
    'Modern & Applied Philosophy'
  ],
  'Spirituality': [
    'Advaita Vedanta',
    'Bhakti Marga & Devotion',
    'Classical Yoga & Sutras',
    'Kashmir Shaivism',
    'Tantra & Sacred Energy',
    'Kundalini & Prana',
    'Buddhism & Zen',
    'Taoism & Eastern Wisdom',
    'Sufism & Divine Love',
    'Universal Non-Duality'
  ],
  'Creativity & Expression': [
    'Creativity & Artistry',
    'Writing & Storytelling',
    'Public Speaking & Keynotes',
    'Ideation & Brainstorming',
    'Overcoming Creative Resistance',
    'Craftsmanship & Mastery',
    'Logic, Rhetoric & Argument',
    'Design Thinking & Aesthetics',
    'Humor & Wit in Speaking',
    'Performance & Flow'
  ]
};

