const { firebaseDb } = require("./firebaseAdmin");

const fetchInformation = async (event, callback) => {
  const { id } = JSON.parse(event.body);
  const document = firebaseDb.collection("user").doc(id);

  const fetch = await document.get();

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(fetch.data()),
  });
};

const updateStafInformation = async (event, callback) => {
  const config = JSON.parse(event.body);
  const document = firebaseDb.collection("user").doc(config.id);

  await document.update({ ...config }).then(() => {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify("Successfully Updated"),
    });
  });
};

exports.handler = (event, context, callback) => {
  try {
    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "updateData"
    ) {
      return updateStafInformation(event, callback);
    }

    if (
      event.httpMethod === "POST" &&
      event.queryStringParameters["name"] === "fetchData"
    ) {
      return fetchInformation(event, callback);
    }

    if (event.httpMethod === "GET") {
      const document = firebaseDb.collection("user");

      document.onSnapshot((snapshot) => {
        const dataArray = [];
        snapshot.forEach((item) => {
          dataArray.push({ ...item.data(), id: item.id });
        });

        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(dataArray),
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
