const functions = require('firebase-functions');
const scrapeWebsite = require('./pptr');

exports.scrape = functions
  .runWith({
    timeoutSeconds: 120,
    memory: '2GB',
  })
  .region('us-central1')
  .https.onRequest(async (req, res) => {
    const url = req.query.url;
    const buffer = await scrapeWebsite(url);
    
    res.type('image/png').send(buffer);
  });