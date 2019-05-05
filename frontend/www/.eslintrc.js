module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:react/recommended", "prettier/@typescript-eslint", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ["react-hooks"],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/explicit-function-return-type": "on",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/member-delimiter-style": {
      multiline: { delimiter: "none" },
      singleline: { delimiter: "none" },
    },
    "@typescript-eslint/prefer-interface": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/camelcase": [
      "error",
      {
        properties: "never",
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
