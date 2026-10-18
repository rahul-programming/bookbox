---
name: book-content-synthesizer
description: >-
  Synthesize rich, substantive book content (at least 20% character depth of the original book)
  from Antigravity agent memory into engaging, witty chapter-by-chapter deep dives, visual diagram models
  (cycles, pipelines, 2x2 matrices, side-by-side comparisons, timelines), atomic idea cards, reflection worksheets,
  and concept mind maps for BookBox.
---

# Book Content Synthesizer Skill

This skill guides the Antigravity agent in extracting, synthesizing, and populating complete, publication-grade book knowledge from memory into the BookBox ecosystem. It ensures that summaries are deeply substantive, entertaining to read, and accompanied by visual diagrams for every chapter.

---

## 1. Core Principles & Benchmarks

### 1.1 The 20% Substantive Character Depth Rule
Generic summaries often reduce a 300-page masterpiece to 5 superficial bullet points. This skill strictly prohibits superficial summaries.
- **Quantitative Target**:
  - A standard non-fiction book contains ~300,000 to 450,000 characters (~50,000 to 70,000 words).
  - The synthesized content must reach **at least 20% of the actual character count**:
    $$\text{Target Character Volume} \ge 60,000 \text{ to } 90,000 \text{ characters } (\approx 10,000 \text{ to } 15,000 \text{ words})$$
- **How to Achieve Substantive Depth**:
  - Cover **every individual chapter** or major conceptual section (typically 8 to 18 chapters).
  - Extract detailed psychological experiments, historical anecdotes, clinical trials, and mathematical models cited by the author.
  - Explain the *counter-intuitive nuances* and *edge cases* where the advice fails.
  - Provide concrete, step-by-step diagnostic workflows and practical heuristics.

---

### 1.2 Tone & Voice: "Coffee with a Brilliant, Witty Friend"
Never output dry academic textbook statements or monotonous recitations.
- **Engaging & Punchy**: Use active verbs, lively cadence, and colorful metaphors.
- **Relatable Modern Context**: Contrast timeless principles against modern struggles (e.g., iPhone doomscrolling, Slack interruptions, crypto hype, gym guilt, imposter syndrome).
- **Thought Experiments**: Open sections with vivid hypothetical scenarios ("Imagine your willpower is a smartphone battery starting the morning at 42%...").
- **Humor & Candor**: Be honest about human irrationality, procrastination traps, and self-delusion.

---

### 1.3 Chapter-by-Chapter Visual Diagrams
Every single chapter breakdown in the Deep Dive section must conclude with a **visually appealing mental model diagram** that renders in `<ChapterDiagramViewer />`.

Supported diagram types:
1. **`cycle` (Feedback / Habit / Reinforcement Loops)**:
   - For recursive processes where the outcome feeds the next trigger (e.g. Cue $\rightarrow$ Craving $\rightarrow$ Response $\rightarrow$ Reward).
2. **`flow` (Action Pipelines & Decision Trees)**:
   - For sequential methodologies, algorithms, or protocols (e.g. Capture $\rightarrow$ Clarify $\rightarrow$ Organize $\rightarrow$ Reflect).
3. **`matrix` (2x2 Frameworks)**:
   - For quadrants contrasting two variables (e.g. Urgent vs Important, Skill vs Challenge, High Leverage vs Low Leverage).
4. **`comparison` (Side-by-Side Mental Model Contrasts)**:
   - Contrasting fragile vs resilient behaviors (e.g. Outcome-Based vs Identity-Based Habits, Shallow Work vs Deep Work).
5. **`timeline` (Compounding Curves & Mastery Milestones)**:
   - For progressive stages over time (e.g. Valley of Latent Potential $\rightarrow$ Critical Threshold $\rightarrow$ Compounding Returns).

---

### 1.4 Expanded 1-Page Master Summary Architecture
The 1-Page Summary must not be a mere two-sentence elevator pitch. It must serve as a comprehensive, publication-grade executive briefing:
- **Executive Narrative (`executiveSummary`)**: 3 to 5 substantive paragraphs explaining the societal context, intellectual origins, psychological mechanisms, and real-world implications of the book.
- **Detailed Pillars (`keyPillars`)**: Each pillar must be a structured entity with a `title`, a rich multi-sentence `description`, and a concrete `actionableTakeaway`.
- **Signature Operating Model (`frameworkSteps`)**: Break down the author's primary system or algorithm into numbered procedural steps with practical execution tips.
- **Reading Roadmap (`readingRoadmap`)**: Pragmatic navigational guides tailored for different personas (e.g., immediate tactical intervention, long-term mastery, managers/leaders).
- **Critical Assessment**: Balanced evaluation containing 4 to 6 distinct strengths and 4 to 6 nuanced counterarguments/edge cases.

---

### 1.5 High-Density Atomic Idea Cards (15–20 Cards per Book)
Each book must generate a comprehensive deck of **at least 15 to 20 Atomic Idea Cards** (`IdeaCard`):
- `mental-model` (4–6 cards): Reusable decision heuristics and cognitive frameworks.
- `actionable` (4–6 cards): Concrete protocols with step-by-step rules you can execute immediately.
- `quote` (3–5 cards): Iconic quotations paired with insightful contextual commentary.
- `concept` (3–5 cards): Deep psychological or philosophical paradigm shifts.
Every card must provide an unmistakable headline, an in-depth explanatory body, and practical metadata.

---

### 1.6 In-Depth Conceptual Mind Map (25–40+ Nodes with Full Explanations)
A mind map must not simply list naked chapter titles. It must function as an interactive conceptual encyclopedia:
- **Structural Breadth**: 4 to 6 primary conceptual pillars radiating from the central root.
- **Hierarchical Depth**: Each pillar must branch into 3 to 5 sub-concepts (totaling 25 to 40+ nodes).
- **Concept Detail in Diagram**: **Every single node must provide a substantive, multi-sentence `description`**. In BookBox's detailed diagram mode, these explanations render directly on the canvas nodes, allowing readers to study the interconnected concepts at a glance.

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
  readingTimeMinutes: number;         // Estimated full deep dive reading time (e.g. 45-60 min)
  publishedYear: number;
  tags: string[];

  // Dimension 1: Comprehensive 1-Page Master Summary
  onePageSummary: {
    elevatorPitch: string;            // 1-2 punchy sentences for library preview
    executiveSummary: string;         // 3-5 substantive narrative paragraphs
    coreThesis: string;               // The fundamental shift in worldview
    keyPillars: Array<{               // Detailed conceptual pillars
      title: string;
      description: string;
      actionableTakeaway?: string;
    }>;
    frameworkName?: string;           // E.g. "The 4 Laws of Behavior Change"
    frameworkSummary?: string;
    frameworkSteps?: Array<{
      step: number;
      name: string;
      summary: string;
      executionTip: string;
    }>;
    readingRoadmap?: Array<{
      goalOrAudience: string;
      recommendedChapters: string;
      rationale: string;
    }>;
    strengths: string[];              // 4-6 critical superpowers
    blindSpotsAndCounterarguments: string[]; // 4-6 rigorous critiques
  };

  // Dimension 2: Chapter-by-Chapter Deep Dive & Key Insights
  blinks: Array<{
    id: string;
    order: number;
    headline: string;                 // Punchy, provocative chapter title
    content: string;                  // In-depth multi-paragraph narrative (3-6 substantive paragraphs)
    keyTakeaway: string;              // 1-sentence memorable synthesis
    audioSnippetText: string;         // Spoken audio preview
    diagram: ChapterDiagram;          // Visually appealing diagram model (cycle, flow, matrix, comparison, timeline)
  }>;

  // Dimension 3: Concept Mind Map (25-40+ Detailed Concept Nodes)
  mindMap: MindMapNode;               // Central root with 4-6 pillars, each with 3-5 descriptive sub-nodes

  // Dimension 4: High-Yield Idea Cards (15-20 Cards Deck)
  ideaCards?: IdeaCard[];

  // Dimension 5: Practical Action Items & Implementation Protocols
  actionItems?: ActionItem[];

  // Dimension 6: Historical Stories & Clinical Anecdotes
  stories?: BookStory[];

  // Dimension 7: Reflection Worksheets
  reflectionExercises: ReflectionExercise[];
}
```

---

## 3. Step-by-Step Execution Workflow

When a user requests to populate content for a book (e.g., *"Populate Deep Work by Cal Newport"*):

### Step 1: Memory Extraction & Chapter Mapping
1. Query your internal knowledge base for:
   - Full table of contents and chapter architecture.
   - Core research studies, lab experiments, and case studies cited.
   - Signature analogies and terminologies (e.g., Deep Work: *Monastic vs Bimodal philosophy*, *Any-Benefit fallacy*, *Craftsman approach*).
2. Outline the complete list of chapters (at least 8 to 15 chapters).

### Step 2: High-Volume Narrative Generation ($\ge 20\%$ Check)
1. Write the chapter-by-chapter breakdowns in the energetic, witty voice.
2. For each chapter, draft 400 to 800 words across 3 to 6 paragraphs:
   - **Paragraph 1: The Trap & Hook**: Describe the common failure pattern with humor and relatability.
   - **Paragraph 2: The Core Mechanism**: Break down the science, psychology, or logic behind why it happens.
   - **Paragraph 3: Case Study / Anecdote**: Cite the author's real-world example or experiment in vivid detail.
   - **Paragraph 4: Tactical Protocol**: Exact implementation steps, rules of thumb, and scripts.
   - **Paragraph 5: Edge Case & Nuance**: Where people over-apply this advice or get it wrong.
3. Track total character count to ensure the aggregate across all chapters meets the $\ge 60,000$ character benchmark.

### Step 3: Visual Diagram Modeling for Each Chapter
Assign the optimal diagram type for each chapter's mental model:

#### Example: Cycle Diagram (for Feedback Loops)
```json
{
  "type": "cycle",
  "title": "The Habit Loop Architecture",
  "caption": "The 4-stage neurological feedback loop underlying all human behavior",
  "nodes": [
    { "id": "cue", "label": "1. Cue", "sublabel": "Environmental trigger alerting the brain of a reward", "color": "blue" },
    { "id": "craving", "label": "2. Craving", "sublabel": "Motivational force and desire for a change in state", "color": "purple" },
    { "id": "response", "label": "3. Response", "sublabel": "The actual habit executed (physical or mental)", "color": "amber" },
    { "id": "reward", "label": "4. Reward", "sublabel": "Dopamine payoff satisfying the craving and teaching the brain", "color": "emerald" }
  ]
}
```

#### Example: Comparison Diagram (for Contrasting Frameworks)
```json
{
  "type": "comparison",
  "title": "Outcome vs. Identity-Based Systems",
  "caption": "Why focusing on who you become outlasts focusing on what you get",
  "comparison": {
    "sideA": {
      "title": "Outcome-Based (Fragile)",
      "badge": "Shallow Motivation",
      "subtitle": "Focused on what you want to achieve",
      "items": [
        "Goal: 'I want to write a book'",
        "Driven by fleeting willpower and external validation",
        "Habits collapse once the goal is hit or missed",
        "Constant internal friction: 'I am a procrastinator trying to write'"
      ]
    },
    "sideB": {
      "title": "Identity-Based (Resilient)",
      "badge": "Compounding System",
      "subtitle": "Focused on who you believe you are",
      "items": [
        "Identity: 'I am a writer'",
        "Driven by self-image and core values",
        "Every single sentence written is a vote for your identity",
        "Friction disappears: action is in natural harmony with self"
      ]
    }
  }
}
```

#### Example: 2x2 Matrix Diagram (for Prioritization)
```json
{
  "type": "matrix",
  "title": "The High-Impact Leverage Matrix",
  "caption": "Filter activities based on cognitive demand and leverage",
  "quadrants": [
    { "title": "Deep Craft (High Leverage, High Focus)", "description": "Writing core software, designing architecture, deep strategic writing. Protect at all costs.", "color": "emerald" },
    { "title": "Strategic Leverage (High Leverage, Low Focus)", "description": "High-level delegation, selecting tech stacks, decisive capital allocation.", "color": "blue" },
    { "title": "Administrative Drag (Low Leverage, Low Focus)", "description": "Answering emails, status updates, routine scheduling. Batch or eliminate.", "color": "amber" },
    { "title": "The Procrastination Trap (Low Leverage, High Focus)", "description": "Pixel-pushing formatting, unnecessary refactors without tests, bike-shedding.", "color": "rose" }
  ]
}
```

### Step 4: Idea Cards & Mind Map Construction
1. Create 8 to 15 `IdeaCard` records linked to the book.
2. Build the `mindMap` object starting from the book's root thesis, expanding to 4-6 primary thematic branches, with each branch containing 2-4 concrete sub-branches.

### Step 5: Verification & Population
1. Validate JSON schema syntax and ensure no fields are missing.
2. Check that the character count satisfies the $\ge 20\%$ rule.
3. Update `src/data/seedBooks.ts` or generate an exportable `.json` backup file that can be restored into BookBox IndexedDB via the **Sync & Data** modal.

---

## 4. Quality Checklist

Before finalizing any book synthesis:
- [ ] **Character Volume**: Does the book contain $\ge 60,000$ total characters across its sections?
- [ ] **Tone**: Is the writing lively, engaging, and witty rather than dry summary bullets?
- [ ] **Completeness**: Are all major chapters broken down individually?
- [ ] **Visual Diagrams**: Does *every single chapter* have an intuitive `cycle`, `flow`, `matrix`, `comparison`, or `timeline` diagram?
- [ ] **Actionability**: Are the reflection prompts and idea cards genuinely practical?
- [ ] **Zero Competitor Names**: Are all labels clean of external brand references?

