const { firebaseAuth, firebaseDb } = require("../firebaseAdmin");
const callback = require("../callback");

module.exports = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    //console.log(email, password);

    const document = firebaseDb.collection("user").doc();

    await firebaseAuth
      .createUser({
        email: email,
        password: password,
        emailVerified: true,
        disabled: false,
      })
      .then((response) => {
        document.set({
          uid: response.uid,
          password,
          email: email,
          dateCreated: new Date(),
        });
      });

    return callback(200, "Successfully Registered");
  } catch (error) {
    return {
      statusCode: 405,
      body: JSON.stringify(error),
    };
  }
};
