const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

module.exports = async (event) => {
  try {
    const { id } = JSON.parse(event.body);

    const document = firebaseDb.collection("appointments").doc(id);
    await document.delete();

    return callback(200, "successfully Deleted");
  } catch (error) {
    return callback(405, error.message);
  }
};
