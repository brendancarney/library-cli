const config = ["---config", JSON.stringify(require("../config/jest.config"))];

module.exports = function(args, options, logger) {
  require("jest").run([...config]);
};
