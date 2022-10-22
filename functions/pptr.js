const puppeteer = require('puppeteer');

const scrapeWebsite = async (url) => {
  let buffer = {};
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 3840, height: 2160 });

    // Change the user agent of the scraper
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    );

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    });

    buffer = await page.screenshot({fullPage: true});


  } catch (error) {
    console.log(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  return buffer;
};

module.exports = scrapeWebsite;