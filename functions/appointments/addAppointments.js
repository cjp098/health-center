const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

module.exports = async (event) => {
  try {
    const config = JSON.parse(event.body);

    const document = firebaseDb.collection("appointments").doc();

    await document.set({
      ...config,
      date_created: new Date(),
    });

    return callback(200, "Successfully Added Schedule");
  } catch (error) {
    return callback(405, {});
  }
};
