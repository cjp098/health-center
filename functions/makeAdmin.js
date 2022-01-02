const { firebaseAuth, firebaseDb } = require("./firebaseAdmin");

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod === "POST") {
      const { email, status, uid } = JSON.parse(event.body);

      await firebaseAuth
        .getUserByEmail(email)
        .then(async (user) => {
          await firebaseAuth.setCustomUserClaims(user.uid, {
            admin: status,
          });
        })
        .then(async () => {
          await firebaseDb.collection("user").doc(uid).update({
            isAdmin: status,
          });
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(
              `Successfully ${email} has been made an admin`
            ),
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
