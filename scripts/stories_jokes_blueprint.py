#!/usr/bin/env python3
"""
BookBox Stories & Jokes Blueprint Generator
Creates src/data/stories_jokes_tracker.json with 400 distinct situational volumes:
- 200 Story Volumes x 50 detailed stories = 10,000+ stories
- 200 Joke Volumes x 50 crafted jokes/bits = 10,000+ jokes
Across 20 Situation Pillars (10 Story volumes + 10 Joke volumes per pillar).
"""

import json
import os
import re

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKER_PATH = os.path.join(WORKSPACE_DIR, "src/data/stories_jokes_tracker.json")

# 20 Situation Pillars -> each has 10 concrete Story Volume angles & 10 Joke Volume angles
BLUEPRINT = [
    {
        "subcategory": "Keynotes & Public Speaking",
        "story_themes": [
            ("Opening Hooks That Silence a Restless Room", "30-to-90s dramatic cold opens before a keynote thesis"),
            ("Tech-Fail & Stage Mishap Recovery Tales", "True-to-life stories about slides crashing, mics dying, and winning the room back"),
            ("Unforgettable Turning Points for Closing Keynotes", "Emotional, high-stakes final stories that leave audiences standing"),
            ("Surprising Historical Paradoxes for Thought Leaders", "Counter-intuitive real-world history anecdotes that anchor big ideas"),
            ("Audience Vulnerability Stories That Build Instant Trust", "Self-revelation stories speakers use when facing skeptical listeners"),
            ("Bridge Stories for Heavy Data Slides", "Humanizing spreadsheets, KPIs, and quarterly metrics with vivid people stories"),
            ("Handling Hostile Q&A Through Parable", "Deflecting tough, confrontational questions with wisdom and calm"),
            ("Conference Panel Standout Anecdotes", "Short crisp 60-second stories tailored for multi-speaker panels"),
            ("Origin Stories for Founders & Visionaries", "Crafting the exact moment an obsession or mission began without sounding arrogant"),
            ("Graduation, Awards & Ceremonial Tales", "Uplifting, memorable human stories for milestone speeches and trophies")
        ],
        "joke_themes": [
            ("Stand-Out Stage Icebreakers for Cold Crowds", "Clean, sharp opening jokes that win over quiet audiences in 15 seconds"),
            ("Slide Deck, Clicker & Mic Fail Jokes", "Immediate, self-aware quips when AV, Zoom, or microphones glitch mid-talk"),
            ("Latecomers, Coffee Breaks & Lunch-Coma Savers", "Waking up sleepy 2 PM conference rooms and playfully teasing late arrivals"),
            ("Hostile Q&A & Tough Question Defusers", "Witty comic pivots when someone asks a 4-minute disguised monologue"),
            ("Corporate Keynote & Conference Cliché Satire", "Mocking buzzwords, 'next slide please', and overly dramatic stage entrances"),
            ("Introducer & Bio Humility Bit Collection", "Playful jokes reacting to overly flattering stage introductions"),
            ("Panel Discussion One-Liners & Cross-Talk", "Quick, respectful zingers to chime in smoothly on crowded panels"),
            ("Virtual Webinar & Hybrid Crowd Laughs", "Relatable humor tailored for muted cameras, chat delays, and remote events"),
            ("Interactive Hand-Raise Setup Bits", "Call-and-response comedic prompts that force high engagement"),
            ("Encore & Memorable Exit Lines", "Crisp closing laughs that end a speech on high energy before Q&A")
        ]
    },
    {
        "subcategory": "Leadership & Team Morale",
        "story_themes": [
            ("Rallying Teams After Missed Quarters", "Authentic setback-to-grit stories for tough all-hands meetings"),
            ("Trust, Autonomy & Stepping Back", "Stories demonstrating why micromanagement breaks talent and trust unlocks ownership"),
            ("Leading Through Chaos & Restructuring", "Steadying nervous teams during pivots, mergers, or strategy shifts"),
            ("Small Gestures That Built Fierce Loyalty", "Everyday leadership moments where quiet care outperformed grand speeches"),
            ("Spotting Hidden Potential in Overlooked People", "Stories of mentors betting on dark-horse talent"),
            ("Ownership & Accountability Without Blame", "Narratives illustrating extreme ownership over finger-pointing"),
            ("Cross-Team Silos & Shared Victory Stories", "Breaking turf wars by showing two rival groups winning together"),
            ("Burnout Warnings & Sustainable Tempo", "Cautionary human stories about hustle traps and protecting recovery"),
            ("Setting High Standards With Empathy", "Coaching stories that balance tough truth with deep belief in the person"),
            ("Promotion, Transition & New-Manager Growing Pains", "Relatable tales of stepping up from individual contributor to leader")
        ],
        "joke_themes": [
            ("All-Hands & Town Hall Tension Breakers", "Lightening the mood before serious updates or annual goal rollouts"),
            ("Strategy Buzzword & Vision Statement Roast", "Smart, safe humor poking fun at synergy, alignment, and north stars"),
            ("Middle-Management Paradox One-Liners", "Relatable wit about translating exec priorities to exhausted builders"),
            ("Monday Standup & Friday 5 PM Team Humor", "Punchy bits for weekly rituals and retro check-ins"),
            ("Brainstorming & Offsite Retreat Comedy", "Whiteboard sticky-note satire and team-building exercise jokes"),
            ("Manager Self-Deprecating Icebreakers", "Quick humility jokes bosses use to make themselves approachable"),
            ("Goal-Setting, OKRs & KPI Humor", "Making metrics reviews painless with clever observational comedy"),
            ("Cross-Functional Handoff Comedy", "Playful teasing between Product, Sales, Ops, and Finance"),
            ("Onboarding & New-Hire Orientation Laughs", "Warm humor welcoming new teammates into company quirks"),
            ("Recognition, Slack Kudos & Trophy Bits", "Playful jokes for team shoutouts and milestone celebrations")
        ]
    },
    {
        "subcategory": "Sales, Pitches & Persuasion",
        "story_themes": [
            ("Before-and-After Customer Transformation Tales", "Dramatic pain-to-relief case stories prospects immediately see themselves in"),
            ("The Hidden Cost of Waiting (Status Quo Stories)", "Stories showing how doing nothing proved far costlier than acting"),
            ("Overcoming Price & Budget Pushback", "Value-framing anecdotes comparing cheap regret vs enduring ROI"),
            ("Building Trust When You Are the Underdog", "Winning flagship deals against giant incumbents through speed and care"),
            ("Walking Away From a Bad-Fit Deal", "High-integrity stories that make buyers respect and chase you"),
            ("Founder Conviction & Late-Night Demo Saves", "Scrappy customer-rescue tales illustrating obsession with client success"),
            ("Social Proof Without Name-Dropping Clichés", "Peer stories tailored for cautious enterprise committees"),
            ("Spotting the Real Bottleneck Nobody Mentioned", "Diagnostic discovery stories where the stated symptom masked the real issue"),
            ("Long-Term Partnership Loyalty After the Ink Dries", "Post-sale commitment stories that seal renewals and referrals"),
            ("Handling Skeptical Procurement & CFO Rooms", "Crisp numerical + human stories for analytical decision makers")
        ],
        "joke_themes": [
            ("Cold-Call & Pattern-Interrupt Openers", "First-10-second disarming humor that earns 2 more minutes on the phone"),
            ("Discovery Call Warmup & Icebreakers", "Easy human laughs before asking tough diagnostic questions"),
            ("Price & Budget Objection Defusers", "Respectful, sharp wit that shifts focus from cost to value cleanly"),
            ("Demo Glitch & Screen-Share Survival Jokes", "Effortless saves when staging environments freeze mid-pitch"),
            ("Ghosting & Follow-Up Revival Humor", "Lighthearted lines for reviving stalled email threads without desperation"),
            ("Pitch-Deck & VC Investor Room Laughs", "Smart self-awareness around hockey-stick graphs and TAM slides"),
            ("Procurement, Legal & Redline Wait Comedy", "Relatable banter during painfully slow contract closing weeks"),
            ("Commission, Quota & Pipeline Banter", "Playful insider humor for sales kickoffs and team standups"),
            ("Competitor Comparison Diplomatic Zingers", "Graceful wit when prospects bring up a noisy rival"),
            ("Referral-Ask Lighteners After Big Wins", "Charming transitions into asking happy clients for introductions")
        ]
    },
    {
        "subcategory": "Negotiation & Conflict",
        "story_themes": [
            ("De-Escalating Explosive Rooms With One Question", "Stories of listening under fire and flipping adversaries into allies"),
            ("Expanding the Pie When Both Sides Say No", "Creative third-option breakthroughs in deadlocked deals"),
            ("The Silence Power-Play That Closed the Gap", "Moments where strategic patience outperformed fast talking"),
            ("Saving Pride to Win the Agreement", "Stories about letting the other side keep dignity while protecting core terms"),
            ("Catching the Unspoken Fear Behind Stubbornness", "Uncovering emotional blockers beneath seemingly rational demands"),
            ("Walking Out Gracefully—And Getting Called Back", "Stories of firm boundaries earning unexpected concessions"),
            ("Apology & Ownership That Repaired Ruined Trust", "Restoring broken vendor/partner relationships cleanly"),
            ("Co-Founder & Partnership Alignment Rescues", "Resolving deeply personal equity/role disputes before blowup"),
            ("Diplomatic Boundary Stories With VIPs", "Saying no to unreasonable power players without burning bridges"),
            ("Cross-Cultural Negotiation Misunderstandings Solved", "Bridging hidden cultural assumptions at the bargaining table")
        ],
        "joke_themes": [
            ("Breaking Awkward Bargaining Deadlocks", "Neutral tension-cutters when two sides stare at an impasse"),
            ("Diplomatic 'Wait, Let's Step Back' Quips", "Polite humor lowering defensiveness mid-argument"),
            ("Anchor-Reset & Extreme Offer Reacts", "Dry deadpan lines responding calmly to absurd initial demands"),
            ("Sibling, Roommate & Lease Compromise Humor", "Everyday relatable negotiation comedy outside the boardroom"),
            ("Contract Fine-Print & Lawyer Banter", "Safe teasing about 40-page NDAs for a 20-minute coffee"),
            ("Split-the-Difference & Compromise Zingers", "Clever wit around fair trades and fake concessions"),
            ("Tense Status-Call & Escalation Coolers", "De-escalating heat on urgent customer calls without sounding dismissive"),
            ("Vendor & Freelancer Scope-Creep Bits", "Lighthearted lines defending boundaries on extra unpaid asks"),
            ("Car-Lot, Market & Haggle Humor", "Classic back-and-forth haggling observations"),
            ("Cooling Heated Debates With Absurd Agreement", "Using playful exaggeration to show how trivial a fight has become")
        ]
    },
    {
        "subcategory": "Workplace Politics & Tough Talks",
        "story_themes": [
            ("Managing Up Without Flattery or Friction", "Tactful stories of steering stubborn execs toward better calls"),
            ("Delivering Tough Performance Truths With Care", "Hard feedback talks that actually saved a colleague's trajectory"),
            ("Saying No to Urgent Busywork", "Stories showing how protecting focus won long-term respect"),
            ("Navigating Credit-Stealing Gracefully", "Smart, composed responses when someone hijacks your idea in a room"),
            ("Surviving Reorgs & Shifting Reporting Lines", "Adapting smoothly while keeping integrity intact"),
            ("Whistleblowing & Speaking Truth to Power Safely", "Courageous moments flagging hidden risks early"),
            ("Handling Micromanaging Stakeholders", "Building proactive update rituals that ended suffocating check-ins"),
            ("Rebuilding Reputation After an Unfair Label", "Turning a rough first impression around through steady execution"),
            ("Departing With Class & Leaving Doors Open", "Exiting tough jobs gracefully so bridges turn into future allies"),
            ("Peer Envy & Quiet Alliances", "Turning competitive peers into loyal collaborators")
        ],
        "joke_themes": [
            ("Corporate Calendar & Meeting Overload Bits", "Observational laughs about 45-minute meetings to schedule another meeting"),
            ("Email Etiquette, 'Per My Last Email' & CC Wars", "Subtle dry wit around passive-aggressive corporate inbox prose"),
            ("Jargon Translation Comedy ('Circle Back', 'Bandwidth')", "Decoding office-speak into brutally honest plain English"),
            ("Performance Review & Self-Eval Satire", "Relatable humor about pretending your weaknesses are strengths"),
            ("Printer, Kitchen & Fridge Office Territory Jokes", "Classic workplace micro-politics comedy"),
            ("Slack Status, Green Dots & WFH Theatre", "Modern remote-office political theater bits"),
            ("Saying No Politely With Humor", "Disarming lines to push back on Friday 4 PM urgent favors"),
            ("Promotions, Titles & Org-Chart Comedy", "Witty observations about title inflation and reporting lines"),
            ("HR Policy & Mandatory Training Laughs", "Lighthearted compliance & handbook comedy"),
            ("Exit-Interview & Farewell Email Bits", "Clever, gracious parting shots that keep bridges glowing")
        ]
    },
    {
        "subcategory": "Networking & Small Talk",
        "story_themes": [
            ("Turning Elevator Small Talk Into Real Connection", "Curious 30-second observations that spark genuine conversations"),
            ("Memorable Answers to 'What Do You Do?'", "Short, vivid mini-stories that beat boring job titles instantly"),
            ("Unexpected Connections From Random Warmth", "True-feeling tales of a tiny favor or question changing a career"),
            ("Recovering From Forgetting Someone's Name", "Charming honesty stories that turn awkward blanks into warmth"),
            ("Introducing Two Strangers Like a Pro", "Connector stories showing how generous intros build lasting karma"),
            ("Surviving Roomfuls of Strangers as an Introvert", "Relatable tactics turned into warm human anecdotes"),
            ("Listening Past the Surface Headline", "Moments when one thoughtful follow-up question unlocked a fascinating tale"),
            ("Coffee-Chat Stories That Earned Mentors", "Respectful curiosity anecdotes for reaching out to busy seniors"),
            ("Conference Hallway Encounters", "Serendipity outside the main stage that beat every planned panel"),
            ("Thank-You Notes & Long-Game Follow-Ups", "Small deliberate callbacks months later that sealed big opportunities")
        ],
        "joke_themes": [
            ("Better Answers to 'So, What Do You Do?'", "Witty, memorable replies for mixers and casual intros"),
            ("Lanyard, Name-Tag & Cocktail-Napkin Openers", "Instant icebreakers when holding an awkward plate and drink"),
            ("Forgetting Names With Charm", "Honest, likable save-lines when a familiar face walks right up"),
            ("Weather, Traffic & Monday Banter Upgrades", "Replacing dull small talk with unexpected smart twists"),
            ("LinkedIn & Business-Card Era Comedy", "Relatable laughs around networking cringe and QR-code scans"),
            ("Introvert at a Crowded Mixer Bits", "Self-aware observations that instantly bond with fellow guests"),
            ("Compliments & Wardrobe Icebreakers", "Safe, clever lines to open chats naturally"),
            ("Graceful Drink-Refill & Exit Transitions", "Polite funny excuses to circulate without seeming rude"),
            ("Airport Lounge & Uber Driver Conversations", "Short traveler small-talk gems"),
            ("Neighborhood Dog-Walk & Coffee-Line Bits", "Effortless community icebreakers")
        ]
    },
    {
        "subcategory": "Dinner Parties & Hosting",
        "story_themes": [
            ("Fascinating Culinary & Wine Origin Tales", "Short, captivating histories behind dishes, spices, and drinks"),
            ("Disaster Kitchen Saves Turned Legends", "Burnt roasts and power-outage dinners saved by improvisation"),
            ("Stranger-at-the-Table Conversation Sparks", "Surprising true human stories tailored for cozy multi-course nights"),
            ("Unforgettable Hosts & Hospitality Folklore", "Warm stories celebrating generosity, late-night talks, and open doors"),
            ("Secret Family Recipe Stories", "Nostalgic tales of grandmothers, secret ingredients, and pride"),
            ("Mystery & Curiosity Table Stories", "Intriguing 2-minute real-world puzzles that get the whole table debating"),
            ("Cultural Dining Etiquette Blunders", "Charming cross-cultural meal mistakes laughed off gracefully"),
            ("Last-Minute Guest List Miracles", "Unexpected combinations of people clicking effortlessly"),
            ("Late-Night Patio & Cheeseboard Confessions", "Winding-down reflective stories over coffee and dessert"),
            ("Thanksgiving & Feast Table Traditions", "Heartfelt, unpretentious gathering stories")
        ],
        "joke_themes": [
            ("Cooking Disaster & Takeout Coverup Bits", "Self-deprecating host humor when the soufflé collapses"),
            ("Wine Snob & Menu Pretension Satire", "Lighthearted poking at oak notes, tiny portions, and $18 water"),
            ("Dietary Restriction & Potluck Comedy", "Relatable dinner-group jokes around allergies, keto, and mystery salads"),
            ("Restaurant Check-Splitting & Ordering Chaos", "Universal dining-out observational bits"),
            ("Overstaying Guests & Subtle Host Hints", "Classic funny closing-the-night lines"),
            ("Fancy Charcuterie & Plating Absurdity", "Jokes about wooden boards, slate tiles, and edible foam"),
            ("Kitchen Gadget Obsession Humor", "Air fryers, espresso machines, and unused bread makers"),
            ("Candlelight, Playlist & Ambiance Mishaps", "Funny host behind-the-scenes chaos"),
            ("Buffet Line & Appetizer Strategy Bits", "Relatable social eating observations"),
            ("Dessert-Table Rationalization Jokes", "Guilt-free sweet-tooth humor to pass the cake")
        ]
    },
    {
        "subcategory": "Weddings, Toasts & Celebrations",
        "story_themes": [
            ("Best-Man & Groom Friendship Arcs", "Funny-to-heartfelt stories showing how loyal friendship endured chaos"),
            ("Maid-of-Honor Childhood & Sisterhood Tales", "Warm, clean emotional stories that make families tear up happily"),
            ("The Exact Moment They Knew (Meet-Cute Stories)", "Vivid origin stories of how a couple fell together against odds"),
            ("Milestone Birthday Reflections (30th, 40th, 50th, 60th)", "Wise, celebratory stories honoring grit, youth, and growth"),
            ("Retirement Sendoffs Celebrating Legacy", "Human stories honoring a colleague's quiet kindness over decades"),
            ("Silver & Golden Anniversary Wisdom", "Enduring love stories focused on tiny daily habits over grand gestures"),
            ("Graduation Pride & Grit Stories", "Stories highlighting unseen late-night sacrifice behind the cap and gown"),
            ("Housewarming & New-Chapter Toasts", "Warm blessings for new roofs, fresh starts, and shared memories"),
            ("Promotion & Big-Win Celebration Tales", "Saluting someone's long patience before the breakthrough arrived"),
            ("Short 30-Second Prosecco Toasts for Any Table", "Universal warm raising-the-glass micro-stories")
        ],
        "joke_themes": [
            ("Best-Man Clean Roast & Praise Bits", "affectionate teasing of the groom that delights both grandmas"),
            ("Maid-of-Honor & Bridesmaid Laughs", "Charming, warm laughs honoring the bride and surviving wedding prep"),
            ("Wedding Seating, Open Bar & Dancefloor Bits", "Universal reception comedy any table relates to"),
            ("Marriage Advice & Newlywed One-Liners", "Clever, affectionate tips on dishwashers, thermostats, and 'yes dear'"),
            ("Retirement Speech Gold-Watch Humor", "Playful jokes about waking up at 10 AM and finally ignoring Slack"),
            ("Milestone Birthday Age-Gap Bits (30/40/50/60)", "Warm age jokes about knees, bedtime, and loud restaurants"),
            ("Baby-Shower & New-Parent Toast Humor", "Funny realities of tiny clothes, zero sleep, and unsolicited advice"),
            ("Short 10-Second Icebreaker Toasts", "Instant table-warmers before raising a glass"),
            ("Parent-of-the-Bride / Groom Heartfelt Laughs", "Sweet parental humor about wallet tears and proud moments"),
            ("Holiday Office-Party Toast Savers", "Clean, upbeat group laughs without HR panic")
        ]
    },
    {
        "subcategory": "Dating, Romance & Relationships",
        "story_themes": [
            ("First-Date Disasters That Became Great Stories", "Showing resilience and humor when plans go sideways"),
            ("Tiny Thoughtful Gestures That Won Hearts", "Stories of attentive listening beating flashy grand gestures"),
            ("Honest Miscommunication Rescues", "Turning relationship tension around through calm vulnerability"),
            ("Long-Distance Patience & Reunion Tales", "Bittersweet, rewarding stories of commitment across miles"),
            ("Surviving Meeting the Parents", "Nervous, relatable tales of cultural differences and winning approval"),
            ("Co-Living Compromises & Shared Quirk Wisdom", "Moving in together: learning patience over toothpaste caps"),
            ("Rebuilding Spark After Busy Routine Seasons", "Choosing presence when life gets hectic"),
            ("The Unlikely Spark: Friends Turning Lovers", "Stories of sudden realization after years of shared laughter"),
            ("Healthy Rejection & Timing Grace", "Mature perspective stories when paths diverge kindly"),
            ("Grandparents' Enduring Love Habits", "Old-school devotion anecdotes that ground modern dating")
        ],
        "joke_themes": [
            ("Dating App Profiles & Bio Decoders", "Witty observational comedy on blurry photos and 'love to laugh'"),
            ("First-Date Nerves & Awkward Moments", "Playful tension-breakers across the coffee table"),
            ("Texting, Read-Receipts & Overthinking Bits", "Modern romance decoding laughs"),
            ("Long-Term Couple Domestic Quirks", "Thermostat wars, 'what do you want for dinner?', and duvet theft"),
            ("Meeting the In-Laws Comedy", "Nervous small talk and trying way too hard to impress"),
            ("Valentines, Anniversaries & Gift Guessing", "Classic gift-hint misread humor"),
            ("Wedding-Guest Singles Table Jokes", "Relatable humor at the catch-the-bouquet table"),
            ("Ex-Story Recovery & Smooth Subject Changes", "Funny pivots when awkward history slips out"),
            ("Split-Bill, Menu & Waiter Date Banter", "Charming little table quips"),
            ("Playful Flirting & Witty Comebacks", "Quick, warm teasing lines with zero creepiness")
        ]
    },
    {
        "subcategory": "Parenting & Family Chaos",
        "story_themes": [
            ("Brutal Honesties From Kids Under Seven", "Heartwarming stories where toddlers say the unexpected truth"),
            ("Teenage Silence & Midnight Kitchen Breakthroughs", "Patient parenting stories of winning trust slowly"),
            ("Sibling Rivalry Turning Into Fierce Loyalty", "Moments brothers and sisters unexpectedly protect each other"),
            ("Holiday Family Chaos Remembered Fondly", "Travel jams, burnt pies, and why imperfections become memories"),
            ("Passing Down Quirky Family Values", "Lessons taught through odd jobs, repairs, and quiet example"),
            ("Grandparent Wisdom in Plain Words", "Memorable generational hand-me-down stories"),
            ("Letting Kids Fail Safely", "Step-back stories where resilience grew from small scrapes"),
            ("First-Day-of-School & Empty-Nest Milestones", "Emotional transition tales every parent feels deeply"),
            ("Neighborhood Sports & Recital Sideline Tales", "Funny and proud moments from chaotic weekend bleachers"),
            ("Admitting You Were Wrong to Your Child", "Humility stories that model accountability for kids")
        ],
        "joke_themes": [
            ("Toddler Negotiations & Bedtime Stalls", "Comedy about negotiating with tiny irrational dictators over socks"),
            ("Teenager Logic, Eye-Rolls & Sarcasm", "Observational laughs on living with grumpy mini-adults"),
            ("School Run, Homework & Science-Fair Panic", "Sunday 9 PM poster-board emergency humor"),
            ("Family Group-Chat & Boomer Texting Bits", "Wrong emojis, voice notes, and 40 accidental thumbs-ups"),
            ("Holiday Road-Trips & Relative Debates", "Surviving Aunt Linda's questions cleanly"),
            ("Unsolicited Parenting Advice Reacts", "Dry comebacks to playground experts"),
            ("Chores, Allowances & Dishes Economics", "Mocking household economics and selective hearing"),
            ("New-Parent Sleep Deprivation Bits", "Delirious midnight diaper and stroller engineering comedy"),
            ("Pet vs Kids Favoritism Humor", "Why the dog is the easiest child in the house"),
            ("Grocery-Aisle Negotiations With Kids", "Cereal-aisle bargaining bits")
        ]
    },
    {
        "subcategory": "Failure, Humility & Comebacks",
        "story_themes": [
            ("Public Flops That Unlocked Unexpected Doors", "Embarrassing launches and talks that led to best opportunities"),
            ("Getting Fired & Finding Real Craft", "Career setback arcs with gritty rebuilding"),
            ("The Expensive Mistake I'm Grateful For", "Early costly errors that built lifelong discernment"),
            ("Impostor Syndrome in Rooms Full of Experts", "Honest human stories about learning to belong through curiosity"),
            ("Second Acts After Peak Identity Loss", "Athletes, founders, and artists reinventing themselves cleanly"),
            ("Apologizing Fast When Ego Wanted to Hide", "Humility stories turning crisis into deep credibility"),
            ("Missed Shots & 100 Rejections Before Yes", "Persistence folklore anchored by concrete small steps"),
            ("Learning the Hard Way From Ignoring Warnings", "Pride-before-the-fall stories told with winning self-awareness"),
            ("Bouncing Back Quietly Without Announcements", "Understated grit tales free of hustle-porn bragging"),
            ("mentors Who Forgave Rookie Blunders", "Paying grace forward after botching early chances")
        ],
        "joke_themes": [
            ("Self-Deprecating Ego-Deflators", "Warm, confident jokes where you poke fun at your own status first"),
            ("Confidence vs Reality Expectations Bits", "Gym mirror vs reality, DIY hubris, and recipe failures"),
            ("Humblebrag Spotter & Satire", "Mocking 'so humbled and honored to announce' corporate flexing"),
            ("Minor Disasters Told With Poker Face", "Cooking, DIY, and haircut tragedies delivered deadpan"),
            ("Rookie Mistake Confession Comedy", "Funny career day-one horror tales"),
            ("Overthinking & Self-Sabotage Quips", "Laughing at 2 AM anxious brain rehearsals"),
            ("Lost Bet & Bad-Prediction Owns", "Charming jokes when your bold prediction flops badly"),
            ("Impostor-Syndrome Office Bits", "Everyone pretending to know how Excel macros work"),
            ("Failed New Year Resolution Humor", "Quitting habits by January 4th with full rationalization"),
            ("Public Embarrassment Recovery One-Liners", "Instant saves right after tripping or spilling water")
        ]
    },
    {
        "subcategory": "Tech, Engineering & Startups",
        "story_themes": [
            ("The 3 AM Production Outage War Story", "Gripping debug mystery from alert panic to root-cause eureka"),
            ("Deleting the Database—And the Hero Backup", "High-stakes engineering horror stories with clean lessons"),
            ("The Feature Nobody Used vs the Hack Everyone Loved", "Humbling product-market-fit discovery stories"),
            ("Legacy Code Archaeology & Forgotten Comments", "Discovering why weird load-bearing code existed"),
            ("Scrappy MVP Launches Built in a Weekend", "Startup resourcefulness tales overcoming tiny budgets"),
            ("Saying No to Scope Creep Before Demo Day", "Product focus stories saving teams from burnout"),
            ("AI Hallucinations & Automation Ironies", "Modern human-in-the-loop cautionary tales"),
            ("Bridging Engineers and Non-Tech Stakeholders", "Translation stories turning tech debt into clear business value"),
            ("The One-Line Fix After Three Days of War Rooms", "Classic debugging humility stories"),
            ("Founder Pivot Moments When Cash Ran Low", "Tactical survival pivots grounded in real customer truth")
        ],
        "joke_themes": [
            ("It Works on My Machine & Prod Deploy Jokes", "Relatable developer/DevOps comedy"),
            ("Agile, Scrum, Standup & Jira Satire", "Two-week sprints for a 5-minute CSS button change"),
            ("AI Hype, Prompting & Slop Parodies", "Sharp tech wit mocking 'AI-powered toothbrushes'"),
            ("Naming Variables, Tabs & StackOverflow Bits", "Classic programmer inside jokes understandable even to PMs"),
            ("PM vs Engineer vs Designer Banter", "Friendly three-way product-team roasting"),
            ("Startup Pitch Deck & VC Buzzword Bits", "'Uber for X', pre-revenue valuations, and ping-pong tables"),
            ("Dark Mode, Mechanical Keyboards & Setup Pride", "Tech lifestyle observational comedy"),
            ("Legacy Code & Documentation Lies", "Comments saying 'fix later' from 2014"),
            ("Password Rules, 2FA & Captcha Torture", "Everyday digital frustration comedy"),
            ("Hackathon & All-Nighter Pizza Survival", "Energetic coding-culture laughs")
        ]
    },
    {
        "subcategory": "Money, Finance & Careers",
        "story_themes": [
            ("Stealth Wealth vs Loud Debt Stories", "Eye-opening contrasts between flashy appearances and real security"),
            ("The Boring Compounding Miracle", "Patient investing & career-compounding stories over flashy gambles"),
            ("Negotiating Twice Your Ask With Silence", "Real-world salary and freelance rate-bump stories"),
            ("Financial Discipline Through Sudden Windfalls", "Lessons from staying grounded during booms"),
            ("Buying Back Time Over Buying More Stuff", "Lifestyle trade-off stories sparking instant reflection"),
            ("Spotting Financial Bubbles Before Friends Did", "Independent-thinking stories during market euphoria"),
            ("Starting From Zero With One Side Skill", "Accessible wealth-building stories free of privilege"),
            ("Career Switching at 35 or 45 Successfully", "Proving sunk-cost fallacy wrong with steady planning"),
            ("Firing a Toxic High-Paying Client", "Financial courage that unlocked better long-term work"),
            ("Teaching Kids Value Without Fear", "Warm family money lessons that stuck for decades")
        ],
        "joke_themes": [
            ("Payday Rich vs Day-22 Reality Bits", "Universal budgeting & subscription shock laughs"),
            ("Crypto Bro, Stock Tip & Guru Satire", "Mocking unsolicited barber-shop investing advice"),
            ("Inflation, $9 Coffee & Tip-Screen Anxiety", "Turning around the iPad tip screen comedy"),
            ("Salary Review & Bonus Math Comedy", "Pizza party vs inflation raise reality checks"),
            ("Tax Season & Receipt Shoebox Panics", "April tax-filing procrastination bits"),
            ("Impulse Buy & 'Treat Yourself' Excuses", "Rationalizing $300 purchases with '$10 saved on shipping'"),
            ("Side-Hustle & Passive-Income Fantasy Jokes", "When passive income takes 60 hours a week"),
            ("Real-Estate & Landlord vs Renting Wit", "Tiny studio rent absurdities"),
            ("Retirement-Calculator Existential Laughs", "Retiring comfortably at age 114"),
            ("Expensive Hobbies vs Free-Sample Hunting", "Funny personal frugality contradictions")
        ]
    },
    {
        "subcategory": "Teaching, Coaching & Mentorship",
        "story_themes": [
            ("The Metaphor That Made a Complex Idea Click", "Brilliant teaching analogies from physics, sports, and carpentry"),
            ("Changing One Word to Unlock a Student", "Coaching moments where reframing broke self-doubt"),
            ("The Quiet Practice Nobody Clapped For", "Stories showing unseen reps behind effortless mastery"),
            ("Unlearning Old Habits Before Scaling", "Why experts stumble when fundamentals get sloppy"),
            ("Teachers Who Noticed Potential Early", "Tribute-ready stories celebrating patient educators"),
            ("Socratic Questions Over Preaching Lectures", "Guiding someone to their own realization smoothly"),
            ("Breaking Fear of Looking Stupid", "Beginner-mindset stories for nervous workshops"),
            ("Feedback Framed Around Craft Not Ego", "Separating the draft from the person cleanly"),
            ("Cohort & Study-Group Synergy Stories", "Learning faster together than grinding isolated"),
            ("Passing the Torch to the Next Cohort", "Graduation and capstone closing tales")
        ],
        "joke_themes": [
            ("Classroom & Workshop Energizers", "Waking up students right after syllabus or agenda slides"),
            ("Procrastination & All-Nighter Excuses", "Relatable studying and deadline-panic comedy"),
            ("Course-Syllabus vs Actual Exam Jokes", "Class material 2+2 vs exam calculus absurdity"),
            ("Workshop Breakout-Room Comedy", "Awkward Zoom breakout silences and volunteer dodging"),
            ("Coach Clichés & Motivational Poster Bits", "Playful teasing of 'there is no I in team' lines"),
            ("Group Project Trauma Humor", "One person doing 95% while everyone signs the cover"),
            ("Adult-Learning & Trying New Hobbies at 30+", "Hilarious beginner struggles at guitar, pottery, or coding"),
            ("Over-Highlighting & Buying Stationery Habits", "Buying 14 notebooks before reading page 1"),
            ("Question-Dodging & Fake Confident Nodding", "Classic student survival moves"),
            ("Graduation & Degree Reality Checks", "Clean comedic bits for educators and students")
        ]
    },
    {
        "subcategory": "Travel & Cultural Mishaps",
        "story_themes": [
            ("Lost in Translation—Found in Kindness", "Traveling abroad without the language and discovering human warmth"),
            ("Missed Trains That Led to Best Detours", "How wrecked itineraries produced unforgettable discoveries"),
            ("Local Hospitality Over Tourist Traps", "Quiet back-street adventures beating guidebook checklists"),
            ("Airport Disaster Camaraderie", "Strangers bonding over 8-hour delays and lost luggage"),
            ("Cultural Etiquette Blunders Forgiven Warmly", "Humble, funny cross-cultural learning stories"),
            ("Solo Travel Courage Moments", "Stepping out nervous and returning fundamentally changed"),
            ("Navigating Street Markets & Friendly Haggles", "Playful human exchanges across borders"),
            ("Overpacking vs Traveling With a Backpack", "Freedom stories from shedding excess baggage"),
            ("Weather Ruining Plans Into Pure Magic", "Storms forcing unexpected indoor discoveries"),
            ("Returning Home Seeing Your City Fresh", "Perspective stories after long trips away")
        ],
        "joke_themes": [
            ("Budget Airlines, Middle Seats & Baggage Fees", "Universal boarding-group & tiny-tray-table comedy"),
            ("Hotel Check-In, Pillows & Mini-Bar Math", "$14 cashews and shower-knob puzzle comedy"),
            ("Vacation Planner vs Relaxer Couple Bits", "6 AM itinerary spreadsheets vs sleeping until noon"),
            ("Overpacking & Sitting on Suitcases", "Six outfits for a 2-night trip"),
            ("Google Translate Menu Disasters", "Hilarious dish mistranslations abroad"),
            ("TSA, Gate-Change Sprint & Lost Luggage", "Airport terminal cardio jokes"),
            ("Road-Trip Navigation & Rest-Stop Drama", "Passenger-seat DJ and wrong-turn banter"),
            ("Jet-Lag Delirium & Weird Timezone Calls", "Confusing 3 PM and 3 AM cleanly"),
            ("All-Inclusive Resort Buffet Comedy", "Competitive vacation lounging bits"),
            ("Souvenir & Airport Duty-Free Absurdities", "Giant Toblerone economics")
        ]
    },
    {
        "subcategory": "Awkward Moments & Quick Saves",
        "story_themes": [
            ("Waving Back at Someone Waving Behind You", "Turning public cringe into instant group charm"),
            ("Sending the Message to the Wrong Person", "Panic-to-resolution true-feeling recovery stories"),
            ("Walking Into the Wrong Conference Room", "Owning minor blunders with total poise"),
            ("Reading the Emotional Room Five Seconds Too Late", "Stories about pausing, apologizing cleanly, and resetting"),
            ("Spilling Coffee Before the Biggest Meeting", "Improvised composure under absurd pressure"),
            ("The Unmuted Mic Confession", "Surviving digital hot-mic cringe gracefully"),
            ("Saying 'You Too' When Waiter Says 'Enjoy Meal'", "Classic everyday brain-freeze relatability"),
            ("Laughing First When Everything Goes Off-Script", "Disarming tension before embarrassment freezes everyone"),
            ("Mispronouncing a Name—And Making It Right", "Dignified correction stories"),
            ("Gracefully Exiting Endless Conversations", "Polite art-of-the-exit stories without awkward lingering")
        ],
        "joke_themes": [
            ("Instant 'Enjoy Your Meal — You Too' Comedies", "Short micro-relatable cringe bits"),
            ("Goodbyes That Repeat Twice Walking Same Way", "Walking 40 yards together after saying 'take care!'"),
            ("Instant Saves After Tripping or Stumbling", "Sharp 5-second poise lines ('Gravity check passed!')"),
            ("Awkward Elevator & Quiet Hallway Lines", "Friendly tension-cutters when four strangers stare at numbers"),
            ("Auto-Correct & Voice-Text Disasters", "Clean hilarious text misreads"),
            ("Hot-Mic & Camera-On Zoom Saves", "Witty recovery lines when caught making weird faces"),
            ("Fake-Remembering Someone's Story Bits", "Playful poker-face confusion comedy"),
            ("Small-Talk Dead-End Rescuers", "Funny questions to revive dying conversations"),
            ("Accidental Like on 2018 Photo Panic", "Social-media stealth fails"),
            ("Holding Door Too Early From 30 Feet Away", "Forces-someone-to-jog-politely comedy")
        ]
    },
    {
        "subcategory": "Health, Fitness & Aging",
        "story_themes": [
            ("Tiny 10-Minute Walks That Saved Mental Health", "Low-ego habit transformation stories"),
            ("Waking Up After Burnout Warning Signs", "Listening to the body before a crash happens"),
            ("The Humbling First Day at a Gym or Yoga Mat", "Belonging stories overcoming fitness intimidation"),
            ("Doctor Visits That Sparked Real Lifestyle Shifts", "Wake-up calls turned practical turning points"),
            ("Running Late-Age Marathons & Quiet Grit", "Inspiring 50s/60s/70s vitality stories"),
            ("Sleep Discipline Transforming Mood & Focus", "Stories proving rest beats extra late-night grind"),
            ("Mindful Eating & Cultural Food Wisdom", "Healthy relationship with meals without guilt"),
            ("Rehab & Patience After Injury", "Respecting slow healing when ego wants speed"),
            ("Digital Sunset & Nervous System Reset", "Quiet evening routine stories reclaiming peace"),
            ("Laughing Through Grey Hair & Reading Glasses", "Warm celebration of growing wiser over chasing youth")
        ],
        "joke_themes": [
            ("Gym Membership Guilt & January Crowds", "Treadmill dignity & protein-shaker obsession bits"),
            ("Turning 30, 40 & 50 Bodily Updates", "Pulling a muscle while sneezing and checking sleeping postures"),
            ("Nutrition Fads & Kale Smoothie Satire", "Mocking $16 celery juice and mysterious superfoods"),
            ("Sleep Trackers Telling You You're Tired", "Paying $400 for a ring to tell you you slept badly"),
            ("Doctor Waiting Room & WebMD Panic", "Googling a mild headache into rare tropical syndromes"),
            ("Yoga Class Balance Failures", "Pretending collapsing was 'child's pose'"),
            ("Caffeine Addiction & Morning Silence", "Don't speak to me before cup two comedy"),
            ("Step-Counter Obsession Bits", "Pacing circles in the kitchen at 11:55 PM for 10,000 steps"),
            ("Hydration Bottles the Size of Fire Extinguishers", "Emotional support water jugs comedy"),
            ("Hangover & Late-Night Recovery After Age 30", "Two-day recovery from one glass of wine")
        ]
    },
    {
        "subcategory": "Deadpan, Wordplay & Sharp Retorts",
        "story_themes": [
            ("Historical One-Line Comebacks That Echoed", "True laconic wit stories (Spartans, Churchill, Twain, Wilde style)"),
            ("Understated British & Dry Humor Narratives", "Deadpan stories where the calmer the telling, the funnier it hits"),
            ("Twist Ending Micro-Stories Under 60 Seconds", "Tight setup stories culminating in a razor-sharp ironic twist"),
            ("Clever Courtroom & Parliamentary Wit Tales", "Sharp verbal sparring stories full of poise"),
            ("Literary & Cafe Repartee Folklore", "Quick-thinking writers and thinkers trading friendly barbs"),
            ("Malicious Compliance Told Gently", "Delightful stories where following bad rules literally exposes absurdity"),
            ("Unexpected Wisdom From Quiet Observers", "Short tales of calm observers outsmarting loud braggarts"),
            ("Double-Meaning Misunderstandings", "Crisp narrative wordplay stories"),
            ("Ironic Karma & Poetic Justice Tales", "Clean satisfying comeback narratives"),
            ("Laconic Two-Sentence Legends", "Tight storytelling exercises in economy of words")
        ],
        "joke_themes": [
            ("Steven-Wright Style Deadpan Observations", "Surreal, ultra-dry deadpan setups with sudden straight-faced twists"),
            ("Clever Puns & Elevated Wordplay", "Smart linguistic double-entendres (zero groan-only cheese)"),
            ("Polite Sharp Retorts for Loud Boasters", "Surgical, smiling comebacks that stop interruptions gracefully"),
            ("Understated Irony & Paradox One-Liners", "Tight 10-second intellectual zingers"),
            ("Grammar, Language & Idiom Absurdities", "Taking English phrases hilariously literally"),
            ("Deadpan Reactions to Ridiculous Questions", "Calm literal answers that highlight silly asks"),
            ("Three-Step Rule-of-Three Wordplay Bits", "Classic setup-setup-subvert linguistic structures"),
            ("Smart Cocktail-Party Epigrams", "Oscar-Wilde-inspired modern witty aphorisms"),
            ("Customer-Service Polite Sarcasm", "Subtle dry wit behind customer smiles"),
            ("Philosophical Shower-Thought Zingers", "Punchy mind-bend jokes delivered flatly")
        ]
    },
    {
        "subcategory": "Philosophy & Modern Absurdity",
        "story_themes": [
            ("Ancient Zen, Sufi & Stoic Tales Updated Today", "Timeless wisdom parables retold cleanly for modern life"),
            ("The Paradox of Chasing Happiness Too Hard", "Stories revealing peace through letting go"),
            ("Slowing Down in an Algorithm-Driven World", "Waking up from endless distraction cycles"),
            ("Perspective Shifts From Astronauts & Monks", "Awe stories shrinking petty ego drama cleanly"),
            ("The Fisherman & Businessman Parable Variations", "Enoughness stories questioning endless hustle"),
            ("What Matters at Age 85 (Reverse Perspective)", "Grounding stories clarifying priorities instantly"),
            ("Stoic Composure Under Trivial Annoyances", "Stories illustrating Marcus Aurelius calm in traffic"),
            ("Echo Chambers & Humble Truth-Seeking", "Changing one's mind publicly without shame"),
            ("Craft Over Clout in a Viral World", "Choosing enduring quality over fleeting attention"),
            ("Quiet Generosity Nobody Filmed", "Unseen integrity stories that restore faith")
        ],
        "joke_themes": [
            ("Existential Dread Meets Tuesday Chores", "Mixing deep cosmic nihilism with buying dishwasher pods"),
            ("Doomscrolling & Screen-Time Report Shame", "Weekly iPhone screen-time betrayal laughs"),
            ("Mindfulness App & Meditation Naps", "Paying apps to remind you to breathe"),
            ("Overthinking Simple Choices (10-Page Reviews)", "Spending 4 hours researching a $19 toaster"),
            ("Stoicism vs Stubbing Your Toe", "Trying to stay Zen until stepping on Lego"),
            ("Time Perception After Age 25", "March lasted 4 years, June was 12 minutes"),
            ("Algorithm Knows Me Too Well Comedy", "Targeted ads calling out 2 AM habits"),
            ("Minimalism vs Secret Junk Drawer", "Holding onto empty iPhone boxes since 2016"),
            ("Self-Help Book Addiction Ironies", "Reading 40 productivity books instead of cleaning the desk"),
            ("Modern Convenience That Makes Everything Harder", "QR menus & 14-step smart light bulbs")
        ]
    },
    {
        "subcategory": "Everyday Observations & Slice-of-Life",
        "story_themes": [
            ("Overhead Conversations in Coffee Shops", "Charming human vignettes revealing everyday grace and humor"),
            ("Neighborhood Characters Who Made the Block", "Warm community portraits everyone recognizes"),
            ("Late-Night Diner & Taxi Reflections", "Unexpected human honesty at odd hours"),
            ("Tiny Acts of Strangers That Saved Tough Days", "Faith-in-humanity stories grounded in ordinary errands"),
            ("The Mystery of Lost Objects Found Years Later", "Warm nostalgic surprises in attics and coat pockets"),
            ("Weathering Storms Together on a Commute", "Strangers suddenly dropping walls during transit hiccups"),
            ("Sunday Morning Quiet Rituals", "Celebrating unhurried small pleasures"),
            ("Pets Teaching Humans How to Live Present", "Heartwarming and funny animal companionship tales"),
            ("Local Shopkeepers & Craft Pride", "Respectful stories of quiet masters of everyday trades"),
            ("Small Victories Worth Celebrating", "Everyday triumphs that remind listeners life is good")
        ],
        "joke_themes": [
            ("Grocery Cart, Self-Checkout & Unexpected Item", "'Unexpected item in bagging area' fury comedy"),
            ("Coffee Shop Order Complexity Satire", "Nine-word drink orders and misspelled cup names"),
            ("Weather Apps Lying Straight to Your Face", "0% chance of rain while standing in a monsoon"),
            ("Waiting Room, DMV & Hold Music Bits", "'Your call is very important to us' for 48 minutes"),
            ("Pet Ownership: Paying Rent for Unemployed Roommates", "Cat aloofness and dog doorbell paranoia comedy"),
            ("Weekend Errands & IKEA Assembly Marriages", "Testing relationships via Allen wrenches and missing screws"),
            ("Smartphone Battery 1% Heroics", "Why 1% lasts 2 hours while 20% dies in 4 minutes"),
            ("Neighborhood HOA, Trash Bin & Lawn Politics", "Subtle suburban territorial wars"),
            ("Group Chat Mute & Notification Chaos", "37 unread messages debating dinner for Thursday"),
            ("Tupperware Lids & Mystery Fridge Containers", "Domestic physics mysteries everyone shares")
        ]
    }
]

def to_slug(text):
    s = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')
    return s[:64].strip('-')

def build_blueprint():
    volumes = []
    idx = 0
    for pillar in BLUEPRINT:
        sub = pillar["subcategory"]
        for v_i, (title, angle) in enumerate(pillar["story_themes"], 1):
            idx += 1
            slug = to_slug(f"stories-{sub}-{v_i}-{title}")
            volumes.append({
                "id": slug,
                "title": f"{title}",
                "author": "BookBox Stage Repertoire",
                "category": "Stories & Jokes",
                "subcategory": sub,
                "bookFormat": "stories",
                "volumeNumber": v_i,
                "angle": angle,
                "targetCount": 50,
                "status": "pending",
                "completedCount": 0,
                "retries": 0
            })

        for v_i, (title, angle) in enumerate(pillar["joke_themes"], 1):
            idx += 1
            slug = to_slug(f"jokes-{sub}-{v_i}-{title}")
            volumes.append({
                "id": slug,
                "title": f"{title}",
                "author": "BookBox Comedy Repertoire",
                "category": "Stories & Jokes",
                "subcategory": sub,
                "bookFormat": "jokes",
                "volumeNumber": v_i,
                "angle": angle,
                "targetCount": 50,
                "status": "pending",
                "completedCount": 0,
                "retries": 0
            })

    tracker = {
        "version": 1,
        "totalVolumes": len(volumes),
        "targetStories": sum(v["targetCount"] for v in volumes if v["bookFormat"] == "stories"),
        "targetJokes": sum(v["targetCount"] for v in volumes if v["bookFormat"] == "jokes"),
        "volumes": volumes
    }

    with open(TRACKER_PATH, "w", encoding="utf-8") as f:
        json.dump(tracker, f, indent=2)

    print(f"✅ Blueprint generated at {TRACKER_PATH}")
    print(f"   Total Volumes : {tracker['totalVolumes']}")
    print(f"   Target Stories: {tracker['targetStories']:,}")
    print(f"   Target Jokes  : {tracker['targetJokes']:,}")

if __name__ == "__main__":
    build_blueprint()
