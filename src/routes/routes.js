const handler = require('../handlers/handler');

module.exports = function (app) {
  app.route('/send').post(handler.send);
};
