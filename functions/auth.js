const { firebaseAuth, firebaseDb } = require("./firebaseAdmin");

const insertDetails = (uid, email, fullName, password) => {
  const document = firebaseDb.collection("user").doc();
  return Promise.resolve(
    document.set({
      uid: uid,
      password,
      email: email,
      fullName,
      dateCreated: new Date(),
    })
  );
};

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod === "POST") {
      const { fullName, email, password } = JSON.parse(event.body);

      //console.log(email, password);

      await firebaseAuth
        .createUser({
          email: email,
          password: password,
          displayName: fullName,
          emailVerified: true,
          disabled: false,
        })
        .then(async (response) => {
          await insertDetails(response.uid, email, fullName, password);
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify("Successfully Created"),
          });
        })
        .catch((error) => {
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(error),
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
