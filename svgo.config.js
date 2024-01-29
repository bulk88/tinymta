module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupNumericValues: { floatPrecision: 1 },
          removeViewBox: false,
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
//height width req for Safari 5/AOSP 4 browser, acknowleged bug
//    "removeDimensions",
//viewBox required for IE img scale logic
//    "removeViewBox",
    "removeRasterImages",
    "collapseGroups",
    "cleanupIds",
    "removeEmptyContainers",
    "removeEmptyAttrs",
    "cleanupAttrs"
  ],
};