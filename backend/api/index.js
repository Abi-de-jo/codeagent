const app = require("../index.js");

module.exports = (req, res) => {
  return app(req, res); // simply pass to express
};
