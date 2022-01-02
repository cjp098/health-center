const { firebaseAuth, firebaseDb } = require("./firebaseAdmin");

const insertDetails = (uid, config) => {
  const document = firebaseDb.collection("user").doc();
  return Promise.resolve(
    document.set({
      uid: uid,
      ...config,
      dateCreated: new Date(),
    })
  );
};

const loginUser = async (event, callback) => {
  try {
    const { email, password } = JSON.parse(event.body);

    //console.log({ email, password });

    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password
    );
    const customToken = await firebaseAuth.createCustomToken(user.uid);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(customToken),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify("ERROR 405 Something went wrong :("),
    });
  }
};
//*! We must delete the user by id in firebase authentication

const deleteUser = async (event, callback) => {
  try {
    const { id } = JSON.parse(event.body);

    const document = firebaseDb.collection("user").doc(id);

    await document.delete();

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify("Successfully Deleted"),
    });
  } catch (error) {
    return callback(null, {
      statusCode: 405,
      body: JSON.stringify("ERROR 405 Something went wrong :("),
    });
  }
};

exports.handler = async (event, context, callback) => {
  try {
    if (
      event.queryStringParameters["name"] === "delete" &&
      event.httpMethod === "POST"
    ) {
      return await deleteUser(event, callback);
    }

    if (
      event.queryStringParameters["name"] === "login" &&
      event.httpMethod === "POST"
    ) {
      return await loginUser(event, callback);
    }

    if (event.httpMethod === "POST") {
      const config = JSON.parse(event.body);

      const fullName =
        config.firstname + " " + config.middlename + " " + config.lastname;

      //console.log(email, password);

      await firebaseAuth
        .createUser({
          email: config.email,
          password: config.password,
          displayName: fullName,
          emailVerified: true,
          disabled: false,
        })
        .then(async (response) => {
          await insertDetails(response.uid, config);
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
