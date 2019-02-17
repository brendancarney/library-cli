#!/usr/bin/env node
const program = require("caporal");
const build = require("./src/build");

program
  .version("0.0.1")
  .command("build", "build the package")
  .option(
    "--external <external>",
    "Comma-separate list of module IDs to exclude",
    program.LIST
  )
  .action(build);

program.parse(process.argv);
