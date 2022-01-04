const { firebaseDb } = require("./firebaseAdmin");

/**
 * Tasks
 * [✓] complaints each in every patients
 * hints (fetch data in patients diagnosis attribute and fetch all data in diagnosis collection)
 * [] update patient information
 *
 * [] dashboard
 * [] staff viewing record
 */

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod === "GET") {
      const document = firebaseDb.collection("diagnosis");

      const fetch = await document.get();

      const data = fetch.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    }
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify(error),
    });
  }
};
