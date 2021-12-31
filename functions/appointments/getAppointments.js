const callback = require("../callback");
const { firebaseDb } = require("../firebaseAdmin");

module.exports = async () => {
  try {
    const document = firebaseDb.collection("appointments");

    const getDocument = await document.get();
    const data = getDocument.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    // const datas = document.onSnapshot((snapshot) => {
    //   snapshot.forEach((item) => {
    //     return item.data();
    //   });
    // });

    // console.log(datas);

    return callback(200, data);
  } catch (error) {
    return callback(405, error.message);
  }
};
