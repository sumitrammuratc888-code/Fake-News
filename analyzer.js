/**
 * Aegis AI — Client-Side Fake News Analysis Engine
 * Performs heuristic NLP analysis on news text
 */

const CLICKBAIT_PATTERNS = [
  /you won'?t believe/i, /shocking/i, /breaking.*!/i, /exposed/i,
  /what they don'?t want you to know/i, /miracle/i, /secret(s)? revealed/i,
  /this (one )?(simple |weird )?trick/i, /doctors hate/i, /exposed!/i,
  /gone wrong/i, /is dead/i, /exposed the truth/i, /\b(insane|unbelievable|jaw.?dropping)\b/i,
  /click here/i, /share before.*deleted/i, /mainstream media won'?t/i,
  /big pharma/i, /they'?re hiding/i, /wake up/i, /exposed!/i
];

const EMOTIONAL_WORDS = [
  'shocking','horrifying','terrifying','unbelievable','incredible','outrageous',
  'disgusting','devastating','catastrophic','explosive','bombshell','sensational',
  'alarming','scandalous','corrupt','evil','destroy','doom','chaos','panic',
  'fury','rage','nightmare','betrayal','conspiracy','coverup','hoax','scam',
  'sinister','dangerous','urgent','emergency','warning','alert','breaking'
];

const TRUSTED_SOURCES = [
  'reuters','associated press','ap news','bbc','npr','pbs','the guardian',
  'the washington post','the new york times','bloomberg','al jazeera',
  'afp','france24','dw','the economist','nature','science','lancet',
  'who','cdc','nih','nasa','noaa','fbi','interpol','un.org','gov'
];

const UNRELIABLE_INDICATORS = [
  'unknown blog','viral post','truthseeker','infowars','naturalnews',
  'beforeitsnews','yournewswire','worldnewsdailyreport','theonion',
  'clickhole','babylon bee','dailybuzzlive','huzlers'
];

const HEDGE_WORDS = ['allegedly','reportedly','sources say','unconfirmed',
  'rumored','claimed','purportedly','supposedly','might','could possibly'];

const ABSOLUTIST_WORDS = ['always','never','everyone','nobody','all',
  'none','guaranteed','proven','definitely','certainly','undeniable','100%'];

function analyzeNews(text) {
  if (!text || text.trim().length < 10) {
    return {
      verdict: "Misleading",
      confidence: "30%",
      reason: "Text is too short to perform a meaningful analysis.",
      red_flags: ["Insufficient content for analysis"],
      suggestion: "Provide the full article text for a more accurate assessment."
    };
  }

  const t = text.toLowerCase();
  const words = t.split(/\s+/);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const flags = [];
  let score = 50; // Start neutral

  // 1. Clickbait pattern detection
  let clickbaitHits = 0;
  CLICKBAIT_PATTERNS.forEach(p => { if (p.test(t)) clickbaitHits++; });
  if (clickbaitHits > 0) {
    score -= clickbaitHits * 12;
    flags.push(`Clickbait language detected (${clickbaitHits} pattern${clickbaitHits>1?'s':''})`);
  }

  // 2. Emotional language density
  let emotionalCount = 0;
  EMOTIONAL_WORDS.forEach(w => { if (t.includes(w)) emotionalCount++; });
  const emotionalDensity = wordCount > 0 ? emotionalCount / wordCount : 0;
  if (emotionalCount >= 3 || emotionalDensity > 0.05) {
    score -= Math.min(emotionalCount * 5, 25);
    flags.push(`High emotional language density (${emotionalCount} loaded words)`);
  }

  // 3. Excessive punctuation (!!!, ???, CAPS)
  const exclaimCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const capsWords = words.filter(w => w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w)).length;
  if (exclaimCount > 3) { score -= 10; flags.push("Excessive exclamation marks"); }
  if (capsWords > 2) { score -= 10; flags.push("Excessive use of ALL CAPS"); }

  // 4. Source credibility check
  let trustedMention = false;
  TRUSTED_SOURCES.forEach(s => { if (t.includes(s)) trustedMention = true; });
  let unreliableMention = false;
  UNRELIABLE_INDICATORS.forEach(s => { if (t.includes(s)) unreliableMention = true; });
  if (trustedMention) { score += 15; }
  if (unreliableMention) { score -= 20; flags.push("References known unreliable source"); }

  // 5. Lack of specifics (no dates, numbers, names)
  const hasNumbers = /\d{1,}/.test(text);
  const hasQuotes = /[""\u201C\u201D]/.test(text);
  const hasProperNouns = /[A-Z][a-z]{2,}/.test(text.slice(1));
  if (!hasNumbers && !hasQuotes && !hasProperNouns && wordCount > 20) {
    score -= 10;
    flags.push("Lacks verifiable facts (no dates, numbers, or named sources)");
  }
  if (hasQuotes) score += 5;
  if (hasNumbers) score += 5;

  // 6. Absolutist language
  let absolutistCount = 0;
  ABSOLUTIST_WORDS.forEach(w => { if (t.includes(w)) absolutistCount++; });
  if (absolutistCount >= 2) {
    score -= absolutistCount * 4;
    flags.push("Uses absolutist language suggesting bias");
  }

  // 7. Hedge words (can be good or bad depending on context)
  let hedgeCount = 0;
  HEDGE_WORDS.forEach(w => { if (t.includes(w)) hedgeCount++; });
  if (hedgeCount >= 3) {
    score -= 5;
    flags.push("Excessive hedging — claims may be unverified");
  }

  // 8. Sentence structure / readability
  const avgSentLen = wordCount / Math.max(sentences.length, 1);
  if (avgSentLen > 40) {
    score -= 5;
    flags.push("Unusually long sentences — may indicate poor editorial quality");
  }

  // 9. Text length check
  if (wordCount < 20) {
    score -= 10;
    flags.push("Very short text — limited context for analysis");
  }
  if (wordCount > 50) score += 5;

  // 10. URL/link spam
  const urlCount = (text.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) { score -= 8; flags.push("Contains multiple external links"); }

  // Clamp score
  score = Math.max(5, Math.min(95, score));

  // Determine verdict
  let verdict, confidence, reason, suggestion;

  if (score >= 65) {
    verdict = "Real";
    confidence = Math.min(score, 95) + "%";
    reason = flags.length === 0
      ? "The text follows journalistic standards with verifiable information and neutral tone."
      : "The text appears credible but has minor concerns worth noting.";
    suggestion = "Cross-check with trusted outlets like Reuters, AP News, or BBC for confirmation.";
  } else if (score >= 40) {
    verdict = "Misleading";
    confidence = (50 + Math.floor((65 - score) * 1.5)) + "%";
    reason = "The text contains a mix of credible and questionable elements. It may contain partial truths presented in a misleading context.";
    suggestion = "Verify key claims using fact-checking sites like Snopes, PolitiFact, or FactCheck.org. Look for the original source of the claims.";
  } else {
    verdict = "Fake";
    confidence = Math.min(90, 60 + Math.floor((40 - score) * 1.2)) + "%";
    reason = "The text exhibits multiple characteristics commonly associated with misinformation, including sensational language and lack of credible sourcing.";
    suggestion = "Do NOT share this content. Verify with multiple independent, reputable news sources before believing these claims.";
  }

  if (flags.length === 0) flags.push("No significant red flags detected");

  return { verdict, confidence, reason, red_flags: flags, suggestion };
}

// Expose globally
window.analyzeNews = analyzeNews;
