module.exports = function (api) {
  const test = api.env("test");

  api.cache(true);

  const presets = test
    ? [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-react",
      ]
    : ["@babel/preset-env", "@babel/preset-react"];

  const plugins = [
    [
      "module-resolver",
      {
        root: ["./src/"],
        alias: {},
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    "macros",
    "transform-react-remove-prop-types",
  ];

  return {
    presets,
    plugins,
  };
};
