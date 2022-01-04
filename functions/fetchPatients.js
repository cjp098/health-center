const { firebaseDb } = require("./firebaseAdmin");

exports.handler = async (event, context, callback) => {
  try {
    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "patientName"
    ) {
      const { id } = JSON.parse(event.body);

      const document = firebaseDb.collection("patient").doc(id);

      const result = await document.get();

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.data()),
      });
    }

    if (
      event.httpMethod === "GET" &&
      event.queryStringParameters["name"] === "getPatients"
    ) {
      const document = firebaseDb.collection("patient");

      const getDocument = await document.get();
      const data = getDocument.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    }

    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "getPatientsInfo"
    ) {
      const { id } = JSON.parse(event.body);

      const document = firebaseDb.collection("patient").doc(id);

      const result = await document.get();

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.data()),
      });
    }

    if (event.httpMethod === "POST") {
      const { id } = JSON.parse(event.body);

      const document = firebaseDb.collection("appointments").doc(id);

      const result = await document.get();

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.data()),
      });
    }
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify(error),
    });
  }
};
