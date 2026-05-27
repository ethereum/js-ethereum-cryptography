module.exports = function (config) {
  config.set({
    frameworks: ["mocha"],
    files: ["./test-builds/main.js"],
    colors: true,
    logLevel: config.LOG_INFO,
    // Do not expose the Karma test server on all interfaces.
    hostname: "127.0.0.1",
    listenAddress: "127.0.0.1",
    browsers: ["ChromeHeadless"],
    browserDisconnectTimeout: 100000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 100000,
    autoWatch: false,
    concurrency: Infinity,
    reporters: ["mocha"],
    client: {
      captureConsole: true,
    },
  });
};
