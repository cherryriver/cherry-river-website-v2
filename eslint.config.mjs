import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".cursor/**",
      ".next/**",
      "build/**",
      "node_modules/**",
      "out/**",
    ],
  },
];

export default eslintConfig;
