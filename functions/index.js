const functions = require('firebase-functions');
const scrapeWebsite = require('./pptr');

exports.scrape = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '8GB',
  })
  .region('us-central1')
  .https.onCall(async (data, context) => {

    if (context.app == undefined) {
      throw new functions.https.HttpsError(
          'failed-precondition',
          'The function must be called from an App Check verified app.')
    }


    const buffer = await scrapeWebsite(data);
    
    return buffer;
  });