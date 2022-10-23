const puppeteer = require('puppeteer');

const scrapeWebsite = async (data) => {
  let base64 = {};
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


    const background = data.background;
    let url = `https://freakpants.ch/fut/php/export_ratings.php?background=${background}`;

    if(data.title !== "") {
      url += `&title=${data.title}`;
    }
    if(data.emphasis !== "") {
      url += `&emphasis=${data.emphasis}`;
    }
    if(data.rarity !== "") {
      url += `&rarity=${data.rarity}`;
    }
    if(data.limit !== "") {
      url += `&limit=${data.limit}`;
    }
    if(data.prices !== "") {
      url += '&prices=1';
    }

    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    base64 = await page.screenshot({fullPage: true, encoding: 'base64', type: 'jpeg', quality: 95});


  } catch (error) {
    console.log(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  return base64;
};

module.exports = scrapeWebsite;