function pageStats() {
  const root = document.body;

  // --- text + word density ---
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parentTag = node.parentElement?.tagName;
      if (parentTag === 'SCRIPT' || parentTag === 'STYLE') {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent.trim().length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });

  let charCount = 0;
  let wordCount = 0;
  let aboveFoldWords = 0;
  let textArea = 0;
  let emojiCount = 0;
  const seenEls = new Set();
  const emojiRegex = /\p{Extended_Pictographic}/gu;
  const emojiExclude = new Set(['\u00A9', '\u00AE', '\u2122', '\u2714', '\u2716', '\u260E', '\u2702', '\u270F', '\u2712']);

  let node;
  while ((node = walker.nextNode())) {
    const trimmed = node.textContent.trim();
    const words = trimmed.split(/\s+/).length;
    charCount += trimmed.length;
    wordCount += words;

    const emojiMatches = trimmed.match(emojiRegex);
    if (emojiMatches) {
      emojiCount += emojiMatches.filter((ch) => !emojiExclude.has(ch)).length;
    }

    const el = node.parentElement;
    if (el && !seenEls.has(el)) {
      seenEls.add(el);
      const rect = el.getBoundingClientRect();
      textArea += rect.width * rect.height;
      if (rect.top < window.innerHeight) {
        aboveFoldWords += words;
      }
    }
  }

  // --- media ---
  const imageCount = root.querySelectorAll('img').length;
  const videoCount = root.querySelectorAll(
    'video, iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="wistia"]'
  ).length;
  const svgCount = root.querySelectorAll('svg').length;

  // --- interactivity ---
  const buttonCount = root.querySelectorAll(
    'button, a[class*="btn"], a[class*="button"], [role="button"]'
  ).length;
  const formFieldCount = root.querySelectorAll('input, textarea, select').length;

  // --- typography ---
  const h1Count = root.querySelectorAll('h1').length;
  const h2Count = root.querySelectorAll('h2').length;
  const h3Count = root.querySelectorAll('h3').length;
  const headings = root.querySelectorAll('h1, h2, h3');
  const avgHeadingLength = headings.length
    ? (
        Array.from(headings).reduce((sum, h) => sum + h.textContent.trim().length, 0) /
        headings.length
      ).toFixed(1)
    : 0;

  const fontFamilies = new Set();
  root.querySelectorAll('*').forEach((el) => {
    fontFamilies.add(getComputedStyle(el).fontFamily);
  });
  const fontCount = fontFamilies.size;

  // --- normalized metrics ---
  const screens = document.documentElement.scrollHeight / window.innerHeight;
  const wordsPerScreen = wordCount / screens;
  const imagesPerScreen = imageCount / screens;
  const pageArea = document.documentElement.scrollHeight * window.innerWidth;
  const textCoverageRatio = textArea / pageArea;

  const headers = [
    'chars', 'words', 'imgs', 'screens', 'words/screen', 'imgs/screen', 'textCoverage',
    'aboveFoldWords', 'videos', 'svgs',
    'buttons', 'formFields', 'emojis',
    'h1', 'h2', 'h3', 'avgHeadingLength', 'fontCount'
  ];

  const row = [
    charCount, wordCount, imageCount, screens.toFixed(2), wordsPerScreen.toFixed(1),
    imagesPerScreen.toFixed(2), textCoverageRatio.toFixed(4),
    aboveFoldWords, videoCount, svgCount,
    buttonCount, formFieldCount, emojiCount,
    h1Count, h2Count, h3Count, avgHeadingLength, fontCount
  ];

  console.log(headers.join('\t'));
  console.log(row.join('\t'));
  return row.join('\t');
}
pageStats();
