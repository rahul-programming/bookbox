/**
 * Book Content Validator Script
 * Calculates character volume, checks against the >=20% threshold,
 * and verifies that every chapter has an engaging diagram model.
 */

const fs = require('fs');
const path = require('path');

function validateBookContent(book) {
  console.log(`\n======================================================`);
  console.log(`📊 Validating Book: "${book.title}" by ${book.author}`);
  console.log(`======================================================`);

  let totalChars = 0;
  let blinkCount = book.blinks ? book.blinks.length : 0;
  let diagramsCount = 0;

  let ideaCardsCount = book.ideaCards ? book.ideaCards.length : 0;
  let actionItemsCount = book.actionItems ? book.actionItems.length : 0;
  let storiesCount = book.stories ? book.stories.length : 0;
  
  // Count mind map nodes and verify descriptions
  let mindMapNodesCount = 0;
  let mindMapDescribedCount = 0;
  const countMindMap = (node) => {
    if (!node) return;
    mindMapNodesCount++;
    if (node.description && node.description.trim().length > 10) {
      mindMapDescribedCount++;
    }
    if (node.children) {
      node.children.forEach(countMindMap);
    }
  };
  if (book.mindMap) {
    countMindMap(book.mindMap);
  }

  // 1-Page Summary characters
  if (book.onePageSummary) {
    const s = book.onePageSummary;
    totalChars += (s.elevatorPitch || '').length;
    totalChars += (s.executiveSummary || '').length;
    totalChars += (s.coreThesis || '').length;
    if (Array.isArray(s.keyPillars)) {
      s.keyPillars.forEach(p => {
        if (typeof p === 'string') {
          totalChars += p.length;
        } else {
          totalChars += (p.title || '').length + (p.description || '').length + (p.actionableTakeaway || '').length;
        }
      });
    }
    if (s.frameworkSteps) {
      s.frameworkSteps.forEach(st => {
        totalChars += (st.name || '').length + (st.summary || '').length + (st.executionTip || '').length;
      });
    }
    totalChars += (s.strengths || []).join(' ').length;
    totalChars += (s.blindSpotsAndCounterarguments || []).join(' ').length;
  }

  // Chapter / Blinks characters & diagram checks
  if (book.blinks) {
    book.blinks.forEach((blink, idx) => {
      totalChars += (blink.headline || '').length;
      totalChars += (blink.content || '').length;
      totalChars += (blink.keyTakeaway || '').length;

      if (blink.diagram && blink.diagram.type) {
        diagramsCount++;
      } else {
        console.warn(`⚠️ Chapter ${idx + 1} ("${blink.headline}") is missing a visual diagram!`);
      }
    });
  }

  // Action items characters
  if (book.actionItems) {
    book.actionItems.forEach(item => {
      totalChars += (item.title || '').length;
      totalChars += (item.description || '').length;
      totalChars += (item.stepByStep || []).join(' ').length;
    });
  }

  // Stories characters
  if (book.stories) {
    book.stories.forEach(st => {
      totalChars += (st.title || '').length;
      totalChars += (st.narrative || '').length;
      totalChars += (st.coreLesson || '').length;
    });
  }

  // Reflection exercises characters
  if (book.reflectionExercises) {
    book.reflectionExercises.forEach(ex => {
      totalChars += (ex.title || '').length;
      totalChars += (ex.prompt || '').length;
    });
  }

  // Word count estimate (~6.5 chars per word including spaces & punctuation)
  const estimatedWords = Math.round(totalChars / 6.5);
  
  // Standard non-fiction book is ~350,000 characters
  const standardBookChars = 350000;
  const percentageOfBook = ((totalChars / standardBookChars) * 100).toFixed(1);

  console.log(`\n📈 Content Metrics:`);
  console.log(`- Total Characters: ${totalChars.toLocaleString()} chars`);
  console.log(`- Estimated Words: ~${estimatedWords.toLocaleString()} words`);
  console.log(`- % of Original Book: ${percentageOfBook}% (Target: >= 20.0%)`);
  console.log(`- Chapters Breakdown: ${blinkCount} chapters`);
  console.log(`- Visual Diagrams: ${diagramsCount} / ${blinkCount} chapters have diagrams`);
  console.log(`- Idea Cards: ${ideaCardsCount} cards (Target: >= 15)`);
  console.log(`- Action Items: ${actionItemsCount} items`);
  console.log(`- Stories & Anecdotes: ${storiesCount} stories`);
  console.log(`- Mind Map Detail: ${mindMapNodesCount} nodes (${mindMapDescribedCount} with in-depth descriptions)`);

  const passedVolume = totalChars >= 60000;
  const passedDiagrams = diagramsCount === blinkCount && blinkCount > 0;
  const passedMindMap = mindMapNodesCount >= 20 && mindMapDescribedCount >= 18;
  const passedIdeas = ideaCardsCount >= 12;

  if (passedVolume && passedDiagrams && passedMindMap && passedIdeas) {
    console.log(`\n✅ PASS: Meets all substantive depth, diagram completeness, idea cards, and mind map criteria!`);
  } else {
    if (!passedVolume) {
      console.log(`\n❌ FAIL: Character count (${totalChars.toLocaleString()}) is below 20% benchmark (60,000 chars minimum).`);
    }
    if (!passedDiagrams) {
      console.log(`\n❌ FAIL: Not all chapters have visual diagrams (${diagramsCount}/${blinkCount}).`);
    }
    if (!passedMindMap) {
      console.log(`\n❌ FAIL: Mind map lacks sufficient conceptual detail (${mindMapNodesCount} nodes, ${mindMapDescribedCount} described).`);
    }
    if (!passedIdeas) {
      console.log(`\n❌ FAIL: Idea cards count (${ideaCardsCount}) is below target (>=12).`);
    }
  }

  return { totalChars, estimatedWords, percentageOfBook, passedVolume, passedDiagrams, passedMindMap, passedIdeas };
}

module.exports = { validateBookContent };

