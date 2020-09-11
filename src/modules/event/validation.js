const moment = require("moment");

const createEventValidation = (args) => {
  const errors = [];
  const { name, location, ticketQuantity, startDate, endDate, active } = args;
  if (!name) errors.push("name:required");
  if (!Object.prototype.hasOwnProperty.call(location, "name"))
    errors.push("location.name:required");
  if (!Object.prototype.hasOwnProperty.call(location, "lat"))
    errors.push("location.lat:required");
  if (!Object.prototype.hasOwnProperty.call(location, "lang"))
    errors.push("location.lang:required");
  if (!ticketQuantity && ticketQuantity <= 0)
    errors.push("ticketQuantity:required");
  if (!startDate) errors.push("startDate:required");
  else if (!moment(startDate).isValid()) errors.push("startDate:invalid");
  if (!endDate) errors.push("endDate:required");
  else if (!moment(endDate).isValid()) errors.push("endDate:invalid");
  if (active === null) errors.push("active:required");
  else if (typeof active !== "boolean") errors.push("active:format");
  return errors;
};

module.exports = {
  createEventValidation,
};
