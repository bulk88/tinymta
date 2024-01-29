module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 1 },
        },
      },
    },
    {
      name: "removeAttrs",
      params: {attrs: "(id|data-name)"}
    },
    //never turn on removeStyleElement or blue color goes away
    //"removeStyleElement",
    "removeTitle",
    "removeDesc",
    "removeUselessDefs",
    "removeViewBox",
    "removeRasterImages",
    "collapseGroups",
    "cleanupIds",
    "removeEmptyContainers",
    "removeEmptyAttrs",
    "cleanupAttrs"
  ],
};