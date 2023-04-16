module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:react/recommended", "eslint:recommended"],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        quotes: ["error", "double"],
        "react-native/no-inline-styles": ["off"],
        "react/jsx-max-props-per-line": [2, { maximum: 5, when: "always" }],
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "sort/imports": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
        "react/prop-types": ["off"],
        "@typescript-eslint/no-empty-interface": ["off"],
        "@typescript-eslint/no-non-null-assertion": ["off"],
    },
};
