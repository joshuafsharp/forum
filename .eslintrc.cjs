module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2022,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],

  parser: "vue-eslint-parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": "error",
    curly: "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "~/styleguide/**",
            group: "index",
            position: "after",
          },
          {
            pattern: "~/**",
            group: "index",
            position: "after",
          },
          {
            pattern: "~icons/**",
            group: "index",
            position: "after",
          },
        ],
        "newlines-between": "always",
      },
    ],
    "vue/multi-word-component-names": "off",
  },
};
