const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "6pcas7",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
