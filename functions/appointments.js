const addAppointments = require("./appointments/addAppointments");
const getAppointments = require("./appointments/getAppointments");
const deleteAppointments = require("./appointments/deleteAppointments");

exports.handler = async (event) => {
  switch (event.queryStringParameters["appointmentParams"]) {
    case "addAppointment":
      if (event.httpMethod === "POST") {
        return await addAppointments(event);
      }
    case "getAppointment":
      if (event.httpMethod === "GET") {
        return await getAppointments();
      }
    case "deleteAppointment":
      if (event.httpMethod === "POST") {
        return await deleteAppointments(event);
      }
  }
};
