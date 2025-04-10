const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/posts', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://truthsocial.com/@realDonaldTrump', {
      waitUntil: 'networkidle2'
    });

    await page.waitForTimeout(5000);

    const posts = await page.evaluate(() => {
      const elements = document.querySelectorAll('[data-testid="postContent"]');
      return Array.from(elements).map(el => ({
        content: el.innerText.trim()
      }));
    });

    await browser.close();
    res.json(posts);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});