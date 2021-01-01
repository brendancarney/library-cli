import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import postcss from "rollup-plugin-postcss";
import size from "rollup-plugin-size";
const readPkgUp = require("read-pkg-up");
const path = require("path");
const { fromRoot, hasFile } = require('../src/utils');

const pkg = readPkgUp.sync().pkg;
const here = (p) => path.join(__dirname, p);
const peerDependencies = Object.keys(pkg.peerDependencies || {});

const importToPackageName = (importName) => {
  return importName.replace(/^(@[^\/]+\/)?([^\/]+)(?:.+)?/, "$1$2");
};

const isPeerDependency = (id) => {
  const packageName = importToPackageName(id);

  return peerDependencies.some((peerDependency) => {
    if (peerDependency == packageName) {
      return true;
    }
  });
};

const babelConfigSources = ['.babelrc', '.babelrc.json', 'babel.config.json', 'babel.config.js']
const existingBabelConfig = babelConfigSources.find(config => hasFile(config))

export default {
  input: "src/index.js",
  external: (id) => {
    if (isPeerDependency(id)) {
      // mark peer dependencies as external
      return true;
    }
    // todo mark node internals as external
  },
  plugins: [
    resolve({ preferBuiltins: false }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        esrever: ["reverse"],
        "react-dom/server": ["renderToStaticMarkup"],
      },
    }),
    babel({
      configFile: existingBabelConfig ? fromRoot(existingBabelConfig) : here("./babel.config.js"),
      runtimeHelpers: true,
      exclude: /node_modules/,
    }),
    json(),
    postcss({ extract: "./styles.css", autoModules: true }),
    size(),
  ],
};
