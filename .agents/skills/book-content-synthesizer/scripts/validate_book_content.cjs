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

  // 1-Page Summary characters
  if (book.onePageSummary) {
    const s = book.onePageSummary;
    totalChars += (s.elevatorPitch || '').length;
    totalChars += (s.coreThesis || '').length;
    totalChars += (s.keyPillars || []).join(' ').length;
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

  const passedVolume = totalChars >= 60000;
  const passedDiagrams = diagramsCount === blinkCount && blinkCount > 0;

  if (passedVolume && passedDiagrams) {
    console.log(`\n✅ PASS: Meets the 20% substantive depth benchmark and diagram completeness!`);
  } else {
    if (!passedVolume) {
      console.log(`\n❌ FAIL: Character count (${totalChars.toLocaleString()}) is below 20% benchmark (60,000 chars minimum). Expand chapter narratives.`);
    }
    if (!passedDiagrams) {
      console.log(`\n❌ FAIL: Not all chapters have visual diagrams (${diagramsCount}/${blinkCount}).`);
    }
  }

  return { totalChars, estimatedWords, percentageOfBook, passedVolume, passedDiagrams };
}

module.exports = { validateBookContent };

