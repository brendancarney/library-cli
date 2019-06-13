import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import postcss from "rollup-plugin-postcss";
import size from "rollup-plugin-size";

const path = require("path");
const here = p => path.join(__dirname, p);

export default {
  input: "src/index.js",
  plugins: [
    resolve({ preferBuiltins: false }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        "react-dom/server": ["renderToStaticMarkup"]
      }
    }),
    babel({
      configFile: here("./babel.config.js"),
      runtimeHelpers: true,
      exclude: /node_modules/
    }),
    json(),
    postcss({ extract: "./styles.css", autoModules: true }),
    size()
  ]
};
