import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
    },    
  },

  // Keep recommended rules
  pluginReact.configs.flat.recommended,

  // Add JSX runtime rules so no React import is required
  pluginReact.configs.flat["jsx-runtime"],

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 'off',
    },
  }
]);
