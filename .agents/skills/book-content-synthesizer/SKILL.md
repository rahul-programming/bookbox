---
name: book-content-synthesizer
description: >-
  Synthesize rich, substantive book content (at least 20% character depth of the original book)
  from Antigravity agent memory into engaging, witty chapter-by-chapter deep dives, visual diagram models
  (cycles, pipelines, 2x2 matrices, side-by-side comparisons, timelines), atomic idea cards, reflection worksheets,
  and concept mind maps for BookBox.
---

# Book Content Synthesizer Skill

This skill guides the Antigravity agent in extracting, synthesizing, and populating complete, publication-grade book knowledge from memory into the BookBox ecosystem. It ensures that summaries are deeply substantive, entertaining to read, and accompanied by visual diagrams for every chapter, adhering strictly to the gold standard established by *Atomic Habits*.

---

## 1. Absolute Core Principles & Benchmarks

### 1.1 The 20% Substantive Character Depth Rule (Zero-Tolerance for Summaries)
Generic summaries often reduce a 300-page masterpiece to 5 superficial bullet points. This skill strictly prohibits superficial summaries.
- **Quantitative Target by Book Size**:
  - **Standard Books (200–300 pages, ~350k–500k chars)**: Target $\ge 70,000 \text{ to } 100,000$ characters ($\approx 12,000 \text{ to } 16,000$ words).
  - **Substantial Books (300–450 pages, ~500k–750k chars)**: Target $\ge 100,000 \text{ to } 150,000$ characters ($\approx 16,000 \text{ to } 25,000$ words).
  - **Tome / Masterpiece Works (450–600+ pages, ~800k–1.2M chars, e.g. *Thinking, Fast and Slow*)**: Target $\ge 180,000 \text{ to } 240,000$ characters ($\approx 30,000 \text{ to } 40,000$ words).
- **Proportional Benchmark**: The aggregate character count of the synthesized TypeScript module must reach **at least 20% of the actual original published book character count**.

---

### 1.2 Mandatory 1-to-1 Chapter Coverage (No Chapter Compression)
- **Original Book Table of Contents Matching**:
  - The synthesized `blinks` array must reflect the **exact chapter architecture** of the published book.
  - If a book has 20 chapters (like *Atomic Habits*), there must be **20 distinct chapter modules** in `blinks`.
  - If a book has 38 chapters (like *Thinking, Fast and Slow* across 5 parts), there must be **38 distinct chapter modules** in `blinks`.
  - Merging, condensing multiple chapters into one, or omitting chapters is strictly prohibited. Every single chapter deserves its own standalone analysis, key takeaway, audio snippet, and mental model diagram.

---

### 1.3 Tone & Voice: Crystal-Clear, Simple & Captivating (Plain English, Zero Academic Jargon, Generic Real-World Analogies)
Never write like an academic textbook, college professor, or syllabus exam sheet. No boring, stuffy, or pretentious words.
- **Simple Language & Short Sentences**: Write in clean, punchy, plain English that anyone can grasp effortlessly in seconds. Keep sentences short, crisp, and direct (averaging 8–15 words). No tangled academic clauses or passive academic phrasing.
- **Universal, Generic Everyday Analogies (NOT Childish or Juvenile)**:
  - Explain concepts using universally relatable real-world analogies drawn from everyday life, practical mechanics, nature, and universal human experience:
    - **Daily life & home**: Leaky buckets, brewing coffee, organizing a cluttered closet, driving in heavy traffic, tuning an instrument, packing luggage, adjusting a thermostat.
    - **Simple mechanics & tools**: Levers, sieves/filters, magnets, domino chains, compass needles, flashlights, dams, shock absorbers.
    - **Nature & biology**: Rivers carving canyons, trees bending in a storm, seeds germinating, snowballs rolling downhill, waves eroding shorelines.
    - **Sports & physical craft**: Archery target practice, marathon pacing, swimming against the current, cycling uphill vs. downhill, woodworking.
  - **NOT Childish / NOT 10-Year-Old Boy Themed**: Do NOT make the tone juvenile or child-centric. Avoid playground recess, cartoons, elementary school homework, candy, or toy metaphors. The reader is an intelligent person who wants ideas explained with crystal clarity, zero pretentiousness, and mature everyday relevance.
  - **DO NOT rely solely on video games**: Ban over-concentrated gaming tropes (no "boss battles", "cheat codes", "multiplayer maps", "XP", "respawns", "health bars"). Keep metaphors broadly relatable to everyday life.
- **Thrilling & Captivating**: Open chapters with mind-blowing questions, shocking paradoxes, or compelling real-world stories. Deliver high-density insights that make the reader think, *"That completely re-frames how I see the world."*
- **Zero Academic Jargon**: Ban words like "epistemic", "heuristic", "probabilistic distribution", "macroeconomic shocks", "dichotomy", "ontological", and "neurochemical". Replace them with plain, precise words: "rule of thumb", "hidden clue", "rules of the game", "major financial crash", and "mental habit".
- **Category-Attuned Tonal Calibration (Voice Matching Genre)**:
  While plain, simple English (short, crisp sentences averaging 8–15 words, zero academic jargon) is mandatory across all books, the **emotional resonance, pacing, and tone must calibrate to the category and genre** of the book:
  - **Fiction, Novels & Literary Works** (e.g., *The Forty Rules of Love*, memoirs, allegories):
    - *Voice*: Poetic, evocative, emotionally resonant, narrative-driven, soulful, observant.
    - *Focus*: Character transformations, emotional conflicts, empathy, relationships, human vulnerability, spiritual journeys.
    - *Tone*: Like a gifted novelist sharing profound truths about the human heart through story.
  - **Finance, Wealth & Economics** (e.g., *The Psychology of Money*, *Poor Charlie's Almanack*, *Fooled by Randomness*):
    - *Voice*: Prudent, grounded, candid, sobering, street-smart, calm.
    - *Focus*: Risk management, survival, emotional discipline, compounding, human folly and greed, true independence over flashy status.
    - *Tone*: Like a seasoned, unshakeable mentor giving candid advice on how money and human nature actually behave.
  - **Self-Help, Productivity, Habits & Performance** (e.g., *Atomic Habits*, *Deep Work*, *Limitless*):
    - *Voice*: Energizing, empowering, practical, encouraging, momentum-building.
    - *Focus*: Overcoming inertia, daily routines, environment design, actionable protocols, human agency.
    - *Tone*: Like a world-class coach breaking down big goals into effortless daily steps.
  - **Philosophy, Stoicism, Mindfulness & Ethics** (e.g., *Meditations*, *Clear Thinking*, *The Scout Mindset*):
    - *Voice*: Contemplative, profound, serene, timeless, clarifying, stoic.
    - *Focus*: Inner peace, duty, emotional self-mastery, perspective, truth over ego, equanimity.
    - *Tone*: Like a wise philosopher reflecting quietly beside a calm mountain lake.
  - **Science, Mathematics, Systems & Complexity** (e.g., *Thinking in Systems*, *Algorithms to Live By*, *Sync*, *Scale*):
    - *Voice*: Curious, illuminating, wonder-filled, lucid, investigative.
    - *Focus*: Hidden patterns, feedback loops, emergent order, interconnected dynamics.
    - *Tone*: Like an enthusiastic scientist showing you the secret mechanics behind everyday reality.
  - **Strategy, Power, Leadership & Decision-Making** (e.g., *7 Powers*, *Decisive*, *Skin in the Game*):
    - *Voice*: Sharp, incisive, tactical, clear-eyed, unsentimental.
    - *Focus*: Competitive moats, incentives, skin in the game, asymmetrical risk, sound execution.
    - *Tone*: Like a master strategist outlining the chessboard with total clarity.

---

### 1.4 Dual-Layer Architecture: "Key Insights" vs. "Deep Dive" (Simple, Sharp & Zero Duplication)
Key Insights and Deep Dive chapters serve distinct user experiences and MUST NEVER be duplicates of each other:
1. **`keyInsight` (The "WOW Factor" — Short, Simple & Sharp)**:
   - **Length**: Short (1 to 2 crisp paragraphs, ~150–250 words / 800–1,200 chars).
   - **Purpose**: Deliver the **mind-bending "WOW factor"** of the chapter — the counterintuitive truth, shocking paradox, or absurd human behavior that makes the reader say, *"Whoa, that completely upends common wisdom!"*
   - **Style**: **Simple, witty, sharp, and plain English** (zero academic jargon, easy to grasp instantly). Write like a brilliant friend sharing an eye-opening truth over coffee.
   - **NOT a Summary**: Do not summarize mechanically. Give the punchy revelation that sticks in the brain forever.
   - **Quotes Rule**: All quotes inside `keyInsight` MUST use clean quotation marks (`"text"`). **Never use double asterisks (`**text**`) for quotes.**

2. **`content` (The Captivating Chapter Deep Dive)**:
   - **Length**: Substantive, thorough chapter journey with rich detail.
   - **Purpose**: A captivating, easy-to-read chapter story told with plain, simple words, compelling real-world examples, and versatile analogies that break down the big idea step-by-step for the **Deep Dive** tab.
   - Accompanied by a dedicated typed visual diagram (`cycle`, `flow`, `matrix`, `comparison`, `timeline`) with simple, jargon-free labels.

---

### 1.5 Strict Quotes Formatting Rule: `"text"` NEVER `**text**`
- **Quotation Marks Only**: Every quote, spoken phrase, or cited statement from the author or subjects MUST be wrapped in standard double quotation marks: `"text"`.
- **Zero Asterisk Quotes**: It is strictly forbidden to format quotes as `**text**` or `**"text"**`. Asterisks are reserved exclusively for inline semantic bold emphasis where appropriate, never for wrapping quotes or statements.

---

### 1.6 Chapter-by-Chapter Visual Diagrams (100% Coverage)
Every single chapter breakdown in `blinks` must conclude with a **visually appealing mental model diagram** that renders in `<ChapterDiagramViewer />`.
Supported diagram types:
1. **`cycle` (Feedback / Reinforcement Loops)**: For recursive processes (e.g., Cue $\rightarrow$ Craving $\rightarrow$ Response $\rightarrow$ Reward).
2. **`flow` (Action Pipelines & Decision Trees)**: For sequential methodologies or diagnostic algorithms.
3. **`matrix` (2x2 Frameworks)**: For quadrants contrasting two variables (e.g., Urgent vs. Important, High vs. Low Leverage).
4. **`comparison` (Side-by-Side Mental Model Contrasts)**: Contrasting fragile vs. resilient behaviors (e.g., Outcome-Based vs. Identity-Based, System 1 vs. System 2).
5. **`timeline` (Compounding Curves & Phased Progression)**: For progressive stages over time (e.g., Valley of Latent Potential $\rightarrow$ Breakthrough).

---

### 1.7 Master Element Quotas per Book Module

Every generated book file (`src/data/books/<bookName>Expanded.ts`) must satisfy the following minimum element quotas:

| Component | Minimum Quota | Key Requirements |
| :--- | :---: | :--- |
| **Blinks / Chapters** | **100% of Original Chapters** (typically 15 to 40) | 3–6 paragraphs per chapter (400–800 words), with a diagram on every single chapter. |
| **Diagrams** | **1 per Chapter** (15 to 40 diagrams) | Valid `cycle`, `flow`, `matrix`, `comparison`, or `timeline` typed object. |
| **1-Page Summary** | **Complete Suite** | 4–6 paragraph `executiveSummary`, 5–7 structured `keyPillars` (with `title`, `description`, `actionableTakeaway`), 4–8 `frameworkSteps`, 3–5 `readingRoadmap` paths, 5+ strengths, 5+ critiques. |
| **Stories & Anecdotes** | **8 to 12 Long-Form Stories** | $\ge 50\%$ narrative length of the original book (600–1,200 words / 4,000–8,000 chars each), with setting, characters, authentic quotes, exact numbers, and psychological breakdown. |
| **Action Items** | **10 to 15 Tactical Protocols** | Spanning all 5 categories (`quick-win`, `daily-routine`, `environment`, `audit`, `system`) with multi-step execution workflows. |
| **Reflection Exercises** | **8 to 12 Exercises** | Deep, self-confronting inquiry prompts with placeholders for user journaling. |
| **Idea Cards** | **16 to 24 Atomic Cards** | Distinct `mental-model`, `actionable`, `quote`, and `concept` cards with headlines and rich commentary. |
| **Mind Map** | **35 to 60+ Nodes** | 4–6 root pillars, branching 2–3 levels deep. **Every single node must provide a rich, multi-sentence `description`** that renders in-place on the canvas. |

---

## 2. Synthesis Architecture Schema

Each synthesized book must populate all interactive dimensions of BookBox:

```typescript
export interface Book {
  id: string;                         // Unique kebab-case slug, e.g. 'atomic-habits'
  title: string;
  author: string;
  category: Category;                 // 'Productivity' | 'Psychology' | 'Finance' | 'Philosophy' | 'Leadership' | 'Strategy'
  coverColor: string;                 // Tailwind gradient, e.g. 'from-amber-500 to-red-600'
  coverEmoji: string;                 // Distinctive book emoji
  readingTimeMinutes: number;         // Estimated full deep dive reading time (e.g. 50-90 min)
  publishedYear: number;
  tags: string[];

  // Dimension 1: Comprehensive 1-Page Master Summary
  onePageSummary: {
    elevatorPitch: string;            // 1-2 punchy sentences for library preview
    executiveSummary: string;         // 4-6 substantive narrative paragraphs
    coreThesis: string;               // The fundamental shift in worldview
    keyPillars: Array<{               // 5-7 detailed conceptual pillars
      title: string;
      description: string;
      actionableTakeaway?: string;
    }>;
    frameworkName?: string;           // E.g. "The 4 Laws of Behavior Change"
    frameworkSummary?: string;
    frameworkSteps?: Array<{          // 4-8 concrete numbered procedural steps
      step: number;
      name: string;
      summary: string;
      executionTip: string;
    }>;
    readingRoadmap?: Array<{          // 3-5 reading routes for different personas
      goalOrAudience: string;
      recommendedChapters: string;
      rationale: string;
    }>;
    strengths: string[];              // 5-6 critical superpowers
    blindSpotsAndCounterarguments: string[]; // 5-6 rigorous edge cases & critiques
  };

  // Dimension 2: Chapter-by-Chapter Deep Dive (100% of Original Book Chapters)
  blinks: Array<{
    id: string;
    order: number;
    headline: string;                 // Original chapter title or provocative expansion
    keyInsight?: string;              // Short, punchy, witty 'wow factor' of the chapter (150-250 words / simple & funny language)
    content: string;                  // 3-6 substantive paragraphs (400-800 words / >=3500 chars) for Deep Dive
    keyTakeaway: string;              // 1-sentence memorable synthesis
    audioSnippetText: string;         // Spoken audio preview
    diagram: ChapterDiagram;          // Visually appealing diagram model (cycle, flow, matrix, comparison, timeline)
  }>;

  // Dimension 3: Concept Mind Map (35-60+ Detailed In-Place Concept Nodes)
  mindMap: MindMapNode;               // Root -> 4-6 pillars -> 3-5 sub-concepts each. EVERY node has a description!

  // Dimension 4: High-Yield Idea Cards (16-24 Cards Deck)
  ideaCards?: IdeaCard[];

  // Dimension 5: Practical Action Items & Implementation Protocols (10-15 Items)
  actionItems?: ActionItem[];

  // Dimension 6: Historical Stories & Clinical Anecdotes (8-12 Long-Form Cases, >= 50% length)
  stories?: BookStory[];

  // Dimension 7: Reflection Worksheets (8-12 Deep Inquiries)
  reflectionExercises: ReflectionExercise[];
}
```

---

## 3. Step-by-Step Execution Workflow

### Step 1: Canonical Chapter & Content Mapping
1. Query agent memory for the **exact published Table of Contents** (all parts and chapters).
2. Outline every chapter name without omission or combination.
3. Identify all primary clinical experiments, historical anecdotes, and mathematical models cited by the author.

### Step 2: High-Volume Narrative Generation ($\ge 20\%$ Check)
1. Write the chapter breakdowns in the witty, punchy, conversational voice.
2. Structure each chapter across 4 to 6 paragraphs:
   - **Paragraph 1: The Trap & Hook**: Relatable everyday friction or cognitive illusion.
   - **Paragraph 2: The Core Mechanism**: The underlying psychology, biology, or economic mathematics.
   - **Paragraph 3: Empirical Evidence / Case Study**: Specific lab experiments, clinical data, historical events.
   - **Paragraph 4: Tactical Protocol**: Actionable heuristics, scripts, and implementation rules.
   - **Paragraph 5: Edge Cases & Nuance**: Where the advice fails, boundary conditions, and risks.
3. Create a dedicated visual diagram for every single chapter.

### Step 3: Historical Anecdotes & Long-Form Case Studies ($\ge 50\%$ Original Depth)
1. Select 8 to 12 iconic stories or clinical trials from the book.
2. Write each narrative across 5 to 9 substantive paragraphs (600 to 1,200 words each).
3. Include historical setting, dramatis personae, authentic dialogue, exact quantitative numbers, and diagnostic psychology.

### Step 4: Tactical Action Items & Reflection Worksheets
1. Formulate 10 to 15 concrete action items distributed across all 5 categories (`quick-win`, `daily-routine`, `environment`, `audit`, `system`).
2. Draft 8 to 12 reflective inquiry prompts for the reflection worksheet.

### Step 5: Idea Cards & Mind Map Construction
1. Create 16 to 24 atomic idea cards across the 4 card types.
2. Build the hierarchical mind map tree with 35 to 60+ nodes, providing full, rich descriptions for every single node.

### Step 6: Verification & Compilation
1. Verify character volume satisfies the $\ge 20\%$ threshold.
2. Check that chapter count matches the original book's published Table of Contents.
3. Confirm TypeScript compilation with `rtk npm run build`.

---

## 4. Quality Checklist

Before finalizing any book synthesis:
- [ ] **Exact Chapter Match**: Does the `blinks` array contain 100% of the published chapters from the original book?
- [ ] **Character Volume Floor**: Does the book satisfy $\ge 20\%$ of the original book's character count ($\ge 70\text{k}$ for compact books, $\ge 100\text{k}$ for standard books, $\ge 180\text{k}$ for massive tomes)?
- [ ] **100% Diagram Coverage**: Does *every single chapter* include a valid, typed visual diagram (`cycle`, `flow`, `matrix`, `comparison`, `timeline`)?
- [ ] **Long-Form Stories**: Are there 8 to 12 long-form case studies reaching $\ge 50\%$ original narrative length (600–1,200 words each)?
- [ ] **Action Items**: Are there 10 to 15 tactical action items spanning all 5 categories?
- [ ] **Reflection Prompts**: Are there 8 to 12 deep reflection exercises?
- [ ] **Atomic Cards**: Are there 16 to 24 idea cards with rich commentary?
- [ ] **Mind Map In-Place Content**: Do all 35 to 60+ nodes in the mind map provide a detailed multi-sentence description?
- [ ] **Compilation**: Does `rtk npm run build` pass cleanly?
