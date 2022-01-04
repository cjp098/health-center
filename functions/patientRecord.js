const { firebaseDb } = require("./firebaseAdmin");

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod === "GET") {
      const document = firebaseDb
        .collection("patient")
        .where("isDiagnosed", "==", true);

      const getDocument = await document.get();
      const data = getDocument.docs.map((doc) => {
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
