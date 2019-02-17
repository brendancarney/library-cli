import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import size from "rollup-plugin-size";

const path = require("path");
const here = p => path.join(__dirname, p);

export default {
  input: "src/index.js",
  plugins: [
    resolve({ preferBuiltins: false }),
    babel({
      configFile: here("./babel.config.js"),
      exclude: /node_modules/
    }),
    commonjs({ include: /node_modules/ }),
    size()
  ]
};
