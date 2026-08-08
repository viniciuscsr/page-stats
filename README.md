# Landing Page Stats

A small script that measures how a landing page is built. It counts things like words, images, videos, headlines, and emojis, then gives you numbers you can use to compare pages side by side.

Useful if you want to study how professionally designed landing pages tend to look, or benchmark your own page against others.

## What it measures

| Metric | What it means |
|---|---|
| chars | Total visible text length |
| words | Total visible word count |
| imgs | Number of images |
| screens | How many scrolls it takes to see the whole page |
| words/screen | Text density while scrolling |
| imgs/screen | Visual density while scrolling |
| textCoverage | Percent of the page filled with text |
| aboveFoldWords | Words visible before any scrolling |
| videos | Video elements and embeds (YouTube, Vimeo, Wistia) |
| svgs | Icons, logos, and illustrations |
| buttons | Buttons and button-styled links |
| formFields | Inputs, text areas, dropdowns |
| emojis | Emoji symbols used in text |
| h1, h2, h3 | Headline counts by size |
| avgHeadingLength | Average headline length |
| fontCount | Number of different fonts used |

## How to run it

**Option 1: Browser console**

1. Open the landing page you want to measure.
2. Right-click anywhere on the page and select **Inspect**.
3. Click the **Console** tab.
4. Paste the script and press Enter.
5. Copy the results row and paste it wherever you're tracking data.

**Option 2: Bookmarklet (faster)**

1. Create a new bookmark in your browser.
2. Paste the bookmarklet code as the URL.
3. Name it something like "Page Stats."
4. Visit any landing page and click the bookmark. The results are copied to your clipboard automatically.

## A few notes

- Keep your browser window the same size across pages you're comparing. Resizing changes the screen-based metrics.
- Scroll to the bottom of the page once before running the script, in case any content loads lazily.
