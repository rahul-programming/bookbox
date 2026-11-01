import json, glob, re

with open('src/data/synthesis_tracker.json') as f:
    tracker = json.load(f)

VALID_TAXONOMY = {
    'Productivity': [
        'Habits & Routines', 'Focus & Deep Work', 'Time Management', 'Beating Procrastination',
        'Organization & Minimalism', 'Energy & Burnout', 'Goal Setting & Execution',
        'Digital Detox & Attention', 'Daily Systems & Workflows', 'Speed Reading & Learning'
    ],
    'Psychology': [
        'Human Behavior', 'Cognitive Biases & Logic', 'Mental Health & Healing', 'Emotional Intelligence',
        'Anxiety & Stress Relief', 'Decision Making', 'Social Psychology', 'Personality & Shadow Work',
        'Brain & Neuroscience', 'Evolutionary Psychology'
    ],
    'Communication': [
        'Difficult Conversations', 'Nonviolent Communication', 'Relationships & Love', 'Body Language & Non-Verbal',
        'Active Listening & Empathy', 'Boundaries & Assertiveness', 'Parenting & Family', 'Conflict Resolution',
        'Remote & Digital Communication', 'Social Skills & Charisma'
    ],
    'Leadership & Career': [
        'Team Leadership', 'Management & Operations', 'Company Culture', 'Career Growth & Promotion',
        'Executive Presence', 'Hiring & Talent Development', 'Workplace Politics', 'Personal Brand & Reputation',
        'Mentorship & Coaching', 'Change Management & Vision'
    ],
    'Business & Strategy': [
        'Strategy & Competitive Moats', 'Entrepreneurship & Startups', 'Economics & Market Dynamics',
        'Innovation & Disruption', 'Scaling & Growth', 'Product Management & Design',
        'Business Models & Pricing', 'Risk & Antifragility', 'Corporate Case Studies', 'Future Tech & Trends'
    ],
    'Sales & Persuasion': [
        'Persuasion & Influence', 'Negotiation Tactics', 'Sales Strategy & Closing', 'Storytelling in Sales',
        'Prospecting & Outreach', 'Buyer Psychology', 'Marketing & Brand Strategy', 'Objection Handling',
        'Pricing & Value Propositions', 'Relationship Selling'
    ],
    'Money & Investing': [
        'Personal Finance & Budgeting', 'Investing & Asset Allocation', 'Money Psychology', 'Wealth Building & Compounding',
        'Financial Independence & FIRE', 'Real Estate & Cash Flow', 'Macroeconomics & Markets', 'Taxes & Financial Defense',
        'Retirement & Legacy Planning', 'Behavioral Finance'
    ],
    'Health & Longevity': [
        'Sleep & Circadian Rhythms', 'Longevity & Vitality', 'Fitness & Strength', 'Nutrition & Metabolism',
        'Breathwork & Somatics', 'Stress Reduction & Nervous System', 'Mind-Body Connection', 'Gut Health & Microbiome',
        'Fasting & Cellular Health', 'Mental Stamina & Biohacking'
    ],
    'Personal Growth': [
        'Purpose & Meaning', 'Resilience & Mental Toughness', 'Mindset & Growth', 'Self-Confidence & Courage',
        'Overcoming Trauma & Adversity', 'Life Transitions & Reinvention', 'Authenticity & Self-Worth',
        'Motivation & Drive', 'Discipline & Self-Control', 'Life Design & Vision'
    ],
    'Philosophy': [
        'Stoicism & Ancient Wisdom', 'Ethics & Moral Reasoning', 'Existentialism & Meaning', 'Critical Thinking & Truth',
        'Eastern Philosophy', 'Political & Social Philosophy', 'Epistemology & Knowledge', 'Philosophical Life Guides',
        'Dilemmas & Thought Experiments', 'Modern & Applied Philosophy'
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
        'Creativity & Artistry', 'Writing & Storytelling', 'Public Speaking & Keynotes', 'Ideation & Brainstorming',
        'Overcoming Creative Resistance', 'Craftsmanship & Mastery', 'Logic, Rhetoric & Argument',
        'Design Thinking & Aesthetics', 'Humor & Wit in Speaking', 'Performance & Flow'
    ]
}

def classify_book(book_meta):
    did = book_meta.get('dimensionId', 1)
    sub = book_meta.get('subcategoryName') or book_meta.get('subcategory') or ''
    title = book_meta.get('title') or ''
    author = book_meta.get('author') or ''
    topic_group = book_meta.get('topicGroup') or ''
    clean_sub = book_meta.get('cleanSubcategory') or ''
    sub_l = sub.lower()
    title_l = title.lower()
    author_l = author.lower()
    tg_l = topic_group.lower()

    # Direct Buddhism check: if topicGroup is Buddhist or subcategory is explicitly Buddhism & Zen
    buddhist_topics = [
        '1_insight_meditation_mahasi', '2_nyanaponika_bodhi_analayo', '3_thai_forest_monks',
        '4_mindfulness_gunaratana', '5_dhammapada', '6_tipitaka_abhidhamma',
        '7_buddhanet_publications', '8_dalai_lama', '9_bps_publications', '10_satipatthana_anapanasati'
    ]
    if topic_group in buddhist_topics or 'buddh' in tg_l or clean_sub == 'Buddhism & Zen' or sub == 'Buddhism & Zen':
        return ('Spirituality', 'Buddhism & Zen')

    # Dim 1: Mind, Cognition, Reasoning & Epistemology
    if did == 1:
        if 'focus' in sub_l or 'attention' in sub_l or 'distraction' in title_l:
            return ('Productivity', 'Focus & Deep Work')
        elif 'speed reading' in sub_l or 'second brain' in sub_l or 'note taking' in title_l:
            return ('Productivity', 'Daily Systems & Workflows')
        elif 'memory' in sub_l or 'learning' in sub_l or 'neuroplasticity' in sub_l or 'mind for numbers' in title_l:
            return ('Productivity', 'Speed Reading & Learning')
        elif 'biases' in sub_l or 'critical thinking' in sub_l:
            return ('Psychology', 'Cognitive Biases & Logic')
        elif 'decision' in sub_l or 'forecasting' in sub_l or 'uncertainty' in sub_l or 'superforecasting' in title_l or 'nudge' in title_l:
            return ('Psychology', 'Decision Making')
        elif 'mental models' in sub_l:
            return ('Psychology', 'Cognitive Biases & Logic')
        else:
            return ('Psychology', 'Human Behavior')

    # Dim 2: Argumentation, Dialectic & Debate Architecture
    elif did == 2:
        return ('Creativity & Expression', 'Logic, Rhetoric & Argument')

    # Dim 3: Applied Human Psychology & Behavioral Science
    elif did == 3:
        if 'evolutionary' in sub_l:
            return ('Psychology', 'Evolutionary Psychology')
        elif 'dark triad' in sub_l or 'toxic' in sub_l:
            return ('Psychology', 'Personality & Shadow Work')
        elif 'social' in sub_l or 'group' in sub_l:
            return ('Psychology', 'Social Psychology')
        elif 'brain' in sub_l or 'cognitive limits' in sub_l:
            return ('Psychology', 'Brain & Neuroscience')
        else:
            return ('Psychology', 'Human Behavior')

    # Dim 4: Emotional Mastery & Nervous System Regulation
    elif did == 4:
        if 'anxiety' in sub_l or 'panic' in sub_l or 'stress' in sub_l:
            return ('Psychology', 'Anxiety & Stress Relief')
        elif 'anger' in sub_l or 'boundary' in sub_l:
            return ('Psychology', 'Mental Health & Healing')
        elif 'depression' in sub_l or 'anhedonia' in sub_l:
            return ('Psychology', 'Mental Health & Healing')
        else:
            return ('Psychology', 'Emotional Intelligence')

    # Dim 5: Habit Architecture & Behavioral Engineering
    elif did == 5:
        if 'extinction' in sub_l or 'addiction' in sub_l or 'dopamine' in sub_l or 'smoking' in title_l or 'drinking' in title_l:
            return ('Productivity', 'Beating Procrastination')
        elif 'micro-habits' in sub_l or 'kaizen' in sub_l:
            return ('Productivity', 'Habits & Routines')
        elif 'pre-commitment' in sub_l or 'accountability' in sub_l:
            return ('Productivity', 'Goal Setting & Execution')
        else:
            return ('Productivity', 'Habits & Routines')

    # Dim 6: Time, Energy & Peak Productivity
    elif did == 6:
        if 'energy' in sub_l or 'rhythms' in sub_l or 'chronobiology' in sub_l:
            return ('Productivity', 'Energy & Burnout')
        elif 'procrastination' in sub_l or 'activation inertia' in sub_l:
            return ('Productivity', 'Beating Procrastination')
        elif 'workflow' in sub_l or 'systematic' in sub_l:
            return ('Productivity', 'Daily Systems & Workflows')
        else:
            return ('Productivity', 'Time Management')

    # Dim 7: Physical Vitality, Somatics & Longevity
    elif did == 7:
        if 'sleep' in sub_l or 'circadian' in sub_l or 'sleep' in title_l:
            return ('Health & Longevity', 'Sleep & Circadian Rhythms')
        elif 'movement' in sub_l or 'strength' in sub_l or 'vo2' in sub_l:
            return ('Health & Longevity', 'Fitness & Strength')
        elif 'nutrition' in sub_l or 'fasting' in sub_l or 'metabolic' in sub_l or 'food' in title_l:
            return ('Health & Longevity', 'Nutrition & Metabolism')
        elif 'breath' in sub_l or 'breathwork' in sub_l or 'breath' in title_l:
            return ('Health & Longevity', 'Breathwork & Somatics')
        else:
            return ('Health & Longevity', 'Longevity & Vitality')

    # Dim 8: Purpose, Identity & Existential Navigation
    elif did == 8:
        if 'forty rules of love' in title_l or 'rumi' in title_l or 'sufi' in title_l:
            return ('Spirituality', 'Sufism & Divine Love')
        elif any(k in title_l or k in author_l for k in ['bhakti', 'narada', 'kirtan', 'mirabai', 'kabir', 'chaitanya', 'surdas', 'tulsidas']):
            return ('Spirituality', 'Bhakti Marga & Devotion')
        elif 'shadow' in sub_l or 'archetypes' in sub_l or 'individuation' in sub_l:
            return ('Psychology', 'Personality & Shadow Work')
        elif 'ikigai' in sub_l or 'core values' in sub_l:
            return ('Personal Growth', 'Purpose & Meaning')
        elif 'reinvention' in sub_l or 'transition' in sub_l:
            return ('Personal Growth', 'Life Transitions & Reinvention')
        elif 'authenticity' in sub_l or 'approval' in sub_l or 'disliked' in title_l or 'imperfection' in title_l:
            return ('Personal Growth', 'Authenticity & Self-Worth')
        else:
            return ('Personal Growth', 'Purpose & Meaning')

    # Dim 9: Interpersonal Communication & Dialogue Dynamics
    elif did == 9:
        if 'digital' in sub_l or 'remote' in sub_l or 'asynchronous' in sub_l:
            return ('Communication', 'Remote & Digital Communication')
        elif 'nvc' in sub_l or 'nonviolent' in sub_l or 'empathetic' in sub_l or 'listen' in title_l or 'hear' in title_l:
            return ('Communication', 'Active Listening & Empathy')
        elif 'crucial' in sub_l or 'difficult' in sub_l or 'stakes' in sub_l or 'fierce' in title_l:
            return ('Communication', 'Difficult Conversations')
        elif 'boundary' in sub_l or 'assertiveness' in sub_l or 'when i say no' in title_l or 'boundaries' in title_l:
            return ('Communication', 'Boundaries & Assertiveness')
        else:
            return ('Communication', 'Conversations & Dialogue')

    # Dim 10: Influence, Persuasion & Behavioral Compliance
    elif did == 10:
        if 'nudging' in sub_l or 'priming' in sub_l or 'invisible' in title_l:
            return ('Sales & Persuasion', 'Buyer Psychology')
        elif 'dark psychology' in sub_l or 'manipulation' in sub_l:
            return ('Sales & Persuasion', 'Objection Handling')
        else:
            return ('Sales & Persuasion', 'Persuasion & Influence')

    # Dim 11: Body Language, Kinesics & Non-Verbal Intelligence
    elif did == 11:
        if 'micro-expressions' in sub_l or 'facs' in sub_l:
            return ('Communication', 'Body Language & Non-Verbal')
        elif 'vocalics' in sub_l or 'voice' in sub_l or 'presence' in title_l:
            return ('Communication', 'Social Skills & Charisma')
        else:
            return ('Communication', 'Body Language & Non-Verbal')

    # Dim 12: Public Speaking, Oratory & Narrative Performance
    elif did == 12:
        if 'narrative' in sub_l or 'story' in sub_l or 'storytelling' in title_l:
            return ('Creativity & Expression', 'Writing & Storytelling')
        elif 'wit' in sub_l or 'humor' in sub_l or 'impromptu' in sub_l:
            return ('Creativity & Expression', 'Humor & Wit in Speaking')
        else:
            return ('Creativity & Expression', 'Public Speaking & Keynotes')

    # Dim 13: Personal Branding, Reputation Architecture & Status Signaling
    elif did == 13:
        if 'status' in sub_l or 'signaling' in sub_l:
            return ('Leadership & Career', 'Workplace Politics')
        elif 'positioning' in sub_l or 'category of one' in sub_l:
            return ('Leadership & Career', 'Executive Presence')
        else:
            return ('Leadership & Career', 'Personal Brand & Reputation')

    # Dim 14: Love, Intimacy, Family & Parenting
    elif did == 14:
        if 'parenting' in sub_l or 'family' in sub_l or 'child' in title_l:
            return ('Communication', 'Parenting & Family')
        elif 'uncoupling' in sub_l or 'heartbreak' in sub_l:
            return ('Communication', 'Conflict Resolution')
        else:
            return ('Communication', 'Relationships & Love')

    # Dim 15: Wealth, Money Psychology & Financial Sovereignty
    elif did == 15:
        if 'trauma' in sub_l or 'psychology' in sub_l or 'psychology of money' in title_l:
            return ('Money & Investing', 'Money Psychology')
        elif 'compounding' in sub_l or 'asset' in sub_l or 'invest' in title_l:
            return ('Money & Investing', 'Investing & Asset Allocation')
        elif 'fire' in sub_l or 'sovereignty' in sub_l or 'simple path' in title_l:
            return ('Money & Investing', 'Financial Independence & FIRE')
        else:
            return ('Money & Investing', 'Personal Finance & Budgeting')

    # Dim 16: Career Mastery, Leadership & Professional Excellence
    elif did == 16:
        if 'executive' in sub_l or 'leadership' in sub_l:
            return ('Leadership & Career', 'Team Leadership')
        elif 'culture' in sub_l or 'organization' in sub_l:
            return ('Leadership & Career', 'Company Culture')
        elif 'politics' in sub_l or 'upward' in sub_l:
            return ('Leadership & Career', 'Workplace Politics')
        else:
            return ('Leadership & Career', 'Career Growth & Promotion')

    # Dim 17: Creativity, Craftsmanship & Flow
    elif did == 17:
        if 'resistance' in sub_l or 'war of art' in title_l:
            return ('Creativity & Expression', 'Overcoming Creative Resistance')
        elif 'craft' in sub_l or 'mastery' in sub_l:
            return ('Creativity & Expression', 'Craftsmanship & Mastery')
        elif 'ideation' in sub_l or 'rituals' in sub_l:
            return ('Creativity & Expression', 'Ideation & Brainstorming')
        else:
            return ('Creativity & Expression', 'Creativity & Artistry')

    # Dim 18: Adversity, Resilience & Antifragility
    elif did == 18:
        if 'burnout' in sub_l:
            return ('Productivity', 'Energy & Burnout')
        elif 'stoic' in sub_l or 'fortitude' in sub_l or 'obstacle is the way' in title_l or 'can\'t hurt me' in title_l:
            return ('Personal Growth', 'Resilience & Mental Toughness')
        else:
            return ('Personal Growth', 'Overcoming Trauma & Adversity')

    # Dim 19: Applied Philosophy & Wisdom Traditions
    elif did == 19:
        if 'stoic' in sub_l or 'stoicism' in sub_l or 'meditations' in title_l or 'seneca' in author_l:
            return ('Philosophy', 'Stoicism & Ancient Wisdom')
        elif 'eastern' in sub_l or 'taoism' in sub_l or 'zen' in sub_l:
            return ('Philosophy', 'Eastern Philosophy')
        elif 'existentialism' in sub_l or 'absurdism' in sub_l or 'camus' in author_l or 'sartre' in author_l:
            return ('Philosophy', 'Existentialism & Meaning')
        else:
            return ('Philosophy', 'Philosophical Life Guides')

    # Dim 20: Spiritual Awakening, Mindfulness & Non-Duality
    elif did == 20:
        buddhist_keywords = [
            'buddh', 'zen', 'vipassana', 'vipassanā', 'gunaratana', 'goldstein', 'kornfield', 'salzberg',
            'thich nhat hanh', 'dharma', 'dhamma', 'brach', 'tift', 'harding', 'analayo', 'anālayo',
            'mahasi', 'sayadaw', 'bodhi', 'nyanaponika', 'chah', 'ajahn', 'thanissaro', 'sumedho',
            'amaro', 'jayasaro', 'pasanno', 'munindo', 'abhinando', 'anan', 'soma thera', 'piya tan',
            'goenka', 'ledi', 'pa-auk', 'dalai lama', 'suzuki', 'dogen', 'rinpoche', 'khandro',
            'chogyam trungpa', 'pema chodron', 'sheng yen', 'hsuan hua', 'yin shun', 'buddhadasa',
            'sangharakshita', 'walpola rahula', 'narada thera', 'u tejaniya', 'satipatthana',
            'satipaṭṭhāna', 'anapanasati', 'ānāpānasati', 'sutta', 'nikaya', 'nikāya', 'tipitaka',
            'tipiṭaka', 'tripitaka', 'abhidhamma', 'abhidharma', 'dhammapada', 'theravada', 'theravāda',
            'mahayana', 'mahāyāna', 'vajrayana', 'vajrayāna', 'tibetan', 'nirvana', 'nibbana',
            'bodhisattva', 'samatha', 'śamatha', 'jhana', 'jhāna', 'dhyana', 'brahmavihara',
            'brahmavihāra', 'metta', 'mettā', 'karuna', 'mudita', 'upekkha', 'four noble truths',
            'eightfold path', 'anatta', 'anattā', 'anicca', 'dukkha', 'paticcasamuppada',
            'dependent origination', 'dependent arising', 'kamma', 'karma', 'sangha', 'bhikkhu',
            'bhikkhuni', 'arahant', 'arhat', 'visuddhimagga', 'bps', 'buddhanet', 'middle way',
            'koan', 'shikantaza', 'zazen', 'chan', 'pure land', 'wheel of dhamma', 'progress of insight',
            'manual of insight'
        ]
        if any(k in title_l or k in author_l or k in sub_l for k in ['bhakti', 'narada', 'kirtan', 'japa', 'chaitanya', 'mirabai', 'kabir', 'surdas', 'tulsidas', 'tukaram', 'devotion', 'ramakrishna', 'vivekananda bhakti']):
            return ('Spirituality', 'Bhakti Marga & Devotion')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['nisargadatta', 'ramana', 'ashtavakra', 'advaita', 'shankara', 'upanishad', 'mandukya', 'avadhuta', 'ribhu']):
            return ('Spirituality', 'Advaita Vedanta')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['shaivism', 'kashmir', 'shiva sutra', 'pratyabhijna', 'spanda', 'abhinavagupta', 'lakshmanjoo']):
            return ('Spirituality', 'Kashmir Shaivism')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['tantra', 'tantric', 'vijnana bhairava', 'wallis', 'shakti']):
            return ('Spirituality', 'Tantra & Sacred Energy')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['kundalini', 'chakra', 'prana', 'nadis', 'subtle body', 'serpent power']):
            return ('Spirituality', 'Kundalini & Prana')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['yoga sutra', 'patanjali', 'raja yoga', 'bhagavad gita', 'yogananda', 'kriya']):
            return ('Spirituality', 'Classical Yoga & Sutras')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['sufi', 'rumi', 'hafiz', 'forty rules of love']):
            return ('Spirituality', 'Sufism & Divine Love')
        elif any(k in title_l or k in author_l or k in sub_l for k in ['tao', 'lao tzu', 'chuang tzu', 'wu wei']):
            return ('Spirituality', 'Taoism & Eastern Wisdom')
        elif any(k in title_l or k in author_l or k in sub_l for k in buddhist_keywords):
            return ('Spirituality', 'Buddhism & Zen')
        else:
            return ('Spirituality', 'Universal Non-Duality')

    # Dim 21: Environmental Design, Minimalism & Life Logistics
    elif did == 21:
        if 'digital' in sub_l or 'information diet' in sub_l:
            return ('Productivity', 'Digital Detox & Attention')
        else:
            return ('Productivity', 'Organization & Minimalism')

    # Dim 22: Sales Mastery, Deal Architecture & Pipeline Engineering
    elif did == 22:
        if any(k in title_l for k in ['negotiat', 'never split', 'getting to yes', 'bargain', 'start with no', 'positive no']):
            return ('Sales & Persuasion', 'Negotiation Tactics')
        elif 'prospecting' in sub_l or 'outreach' in sub_l:
            return ('Sales & Persuasion', 'Prospecting & Outreach')
        elif 'buyer psychology' in sub_l or 'closing' in sub_l:
            return ('Sales & Persuasion', 'Sales Strategy & Closing')
        else:
            return ('Sales & Persuasion', 'Sales Strategy & Closing')

    # Dim 23: Business Strategy, Unit Economics & Market Dominance
    elif did == 23:
        if 'pricing' in sub_l or 'unit economics' in sub_l:
            return ('Business & Strategy', 'Business Models & Pricing')
        elif 'gtm' in sub_l or 'product-market fit' in sub_l or 'scale' in sub_l:
            return ('Business & Strategy', 'Scaling & Growth')
        elif 'startup' in title_l or 'lean startup' in title_l or 'zero to one' in title_l or 'hard thing' in title_l:
            return ('Business & Strategy', 'Entrepreneurship & Startups')
        elif 'capital allocation' in sub_l or 'corporate finance' in sub_l:
            return ('Business & Strategy', 'Economics & Market Dynamics')
        else:
            return ('Business & Strategy', 'Strategy & Competitive Moats')

    return ('Personal Growth', 'Mindset & Growth')

if __name__ == '__main__':
    # Validate all books in tracker
    errors = 0
    for b in tracker.get('books', []):
        cat, subcat = classify_book(b)
        if cat not in VALID_TAXONOMY:
            print(f"Invalid category: {cat} for {b['title']}")
            errors += 1
        elif subcat not in VALID_TAXONOMY[cat]:
            print(f"Invalid subcategory: {subcat} under {cat} for {b['title']}")
            errors += 1

    print(f"Total tracker books validated: {len(tracker.get('books', []))}, Errors: {errors}")

