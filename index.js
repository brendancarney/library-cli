#!/usr/bin/env node
const program = require("caporal");
const build = require("./src/build");
const test = require("./src/test");

program
  .version("0.0.1")
  .command("build", "build the package")
  .action(build)
  .command("test", "test the package")
  .argument("[files]", "files")
  .action(test);

program.parse(process.argv);
