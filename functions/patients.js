const { firebaseDb, firestoreUnion } = require("./firebaseAdmin");

const updateAppointment = async (id) => {
  try {
    const document = firebaseDb.collection("appointments").doc(id);

    await document.update({
      isAppointment: false,
    });
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify(error),
    });
  }
};

const addDiagnosedToPatient = async (callback, patientId, id) => {
  try {
    const document = firebaseDb.collection("patient").doc(patientId);

    await document.update({
      diagnosis: firestoreUnion.FieldValue.arrayUnion(id),
      isDiagnosed: true,
    });
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify(error),
    });
  }
};

exports.handler = async (event, context, callback) => {
  try {
    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "updatePatient"
    ) {
      const config = JSON.parse(event.body);

      const document = firebaseDb.collection("patient").doc(config.id);

      await document.update({ ...config, dateUpdated: new Date() }).then(() => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify("Successfully Updated"),
        });
      });
    }

    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "diagnosis"
    ) {
      const config = JSON.parse(event.body);

      const document = firebaseDb.collection("diagnosis");

      await document
        .add({
          ...config,
          date_created: new Date(),
        })
        .then(async (docRef) => {
          await addDiagnosedToPatient(callback, config.patientId, docRef.id);
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify("Sucessfully diagnosed"),
          });
        });
    }

    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "patientInfo"
    ) {
      const config = JSON.parse(event.body);

      const document = firebaseDb.collection("patient").doc();

      await document
        .set({
          ...config,
          dateCreated: new Date(),
        })
        .then(async () => {
          await updateAppointment(config.id);
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify("Successfully created"),
          });
        });
    }
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify(error),
    });
  }
};
