const moment = require("moment");

// parametros que envia el express-validator
const isDate = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isDate,
};
