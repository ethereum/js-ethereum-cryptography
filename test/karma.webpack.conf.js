module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],
    files: ["../test-builds/webpack-build.js"],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    browserDisconnectTimeout: 100000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 100000,
    autoWatch: false,
    concurrency: Infinity,
    reporters: ["mocha"],
    client: {
      captureConsole: true
    }
  });
};
