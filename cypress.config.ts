import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    REACT_APP_BASE_API_URL: "https://630c349153a833c53425a256.mockapi.io"
  }
});
