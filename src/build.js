const chalk = require("chalk");
const path = require("path");
const spawn = require("cross-spawn");
const readPkgUp = require("read-pkg-up");
const { resolveBin, hasFile, fromRoot } = require("./utils");

const here = p => path.join(__dirname, p);

const pkg = readPkgUp.sync().pkg;

function build({ format, file, external }) {
  const config = hasFile("rollup.config.js")
    ? fromRoot("rollup.config.js")
    : here("../config/rollup.config.js");

  return spawn.sync(
    resolveBin("rollup"),
    [
      ...[
        "--external",
        ["react", "react-dom", "prop-types", "stream", ...external].join(",")
      ],
      ...["--config", config],
      ...["--format", format],
      ...["--file", file]
    ],
    { stdio: "inherit" }
  );
}

module.exports = function(args, options, logger) {
  const hasConfig = hasFile("rollup.config.js");

  if (hasConfig) {
    logger.info(chalk.yellow("Using local rollup config"));
  }

  const external = Object.keys(pkg.peerDependencies || {});

  build({ format: "cjs", file: pkg.main, external });

  if (pkg.module) {
    build({ format: "esm", file: pkg.module, external });
  } else {
    logger.debug(
      chalk.yellow(
        "No `module` field found in `package.json`, skipping esm build."
      )
    );
  }
};
