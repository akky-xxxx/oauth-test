// eslint-disable no-unused-vars
const OFF = 0
const WARN = 1
const ERROR = 2
// eslint-enable no-unused-vars

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "import",
  ],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "import/extensions": [
      "error",
      {
        "js": "never",
        "ts": "never",
      }
    ],
    "import/prefer-default-export": OFF,
    "jsx-a11y/anchor-is-valid": OFF,
    "react/jsx-filename-extension": OFF,
    "react/prop-types": OFF,
    "react/jsx-fragments": [ERROR, "element"],
    "react-hooks/rules-of-hooks": ERROR,
    "@typescript-eslint/explicit-member-accessibility": OFF,
    "@typescript-eslint/explicit-function-return-type": OFF,
    "prettier/prettier": [
      ERROR,
      {
        printWidth: 120,
        semi: false,
        trailingComma: "all",
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    },
  },
}
