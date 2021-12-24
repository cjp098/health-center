const addAppointments = require("./appointments/addAppointments");

exports.handler = async (event) => {
  switch (event.queryStringParameters["appointmentParams"]) {
    case "addAppointment":
      if (event.httpMethod === "POST") {
        return await addAppointments(event);
      }
  }
};
