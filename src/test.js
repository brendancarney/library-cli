const config = [
  "--config",
  JSON.stringify(require("../config/jest.config")),
  "--no-cache"
];

module.exports = function(args, options, logger) {
  process.env.NODE_ENV = "test";
  require("jest").run([...config, args.files || "."]);
};
