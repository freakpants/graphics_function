const puppeteer = require('puppeteer');

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


const scrapeWebsite = async (data) => {
  let base64 = {};
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
    ],
  });

  try {
    const page = await browser.newPage();

    if(data.insta) {
      await page.setViewport({ width: 1080, height: 1080 });
    } else {
      await page.setViewport({ width: 3840, height: 2160 });
    }


    // Change the user agent of the scraper
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
    );


    const background = data.background;
    let url = `https://freakpants.ch/fut/php/export_ratings.php?background=${background}`;

    if(data.title !== "") {
      url += '&title=' + data.title;
    }
    if(data.emphasis !== "") {
      url += '&emphasis=' + data.emphasis;
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
    if(data.max_rating !== "") {
      url += `&max_rating=${data.max_rating}`;
    }
    if(data.min_rating !== "") {
      url += `&min_rating=${data.min_rating}`;
    }
    if(data.orderby !== "") {
      url += `&order_by=${data.orderby}`;
    }
    if(data.scale !== "") {
      url += `&scale=${data.scale}`;
    }
    if(data.counter) {
      url += '&counter=1';
    }
    if(data.packable) {
      url += '&restriction=packable';
    }
    if(data.promo !== "") {
      url += `&promo=${data.promo}`;   
     }
     if(data.insta) {
      url += '&insta=1';
    }

    console.log(url);

    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    // DO NOT USE PNG, AS IT WILL GENERATE IMAGES THAT ARE BIGGER THAN 10MB, which is the limit for HTTP REQUESTS
    base64 = await page.screenshot({fullPage: true, encoding: 'base64', type: 'jpeg', quality: 100});


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