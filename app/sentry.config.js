const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  // Your existing Next.js configuration here
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);