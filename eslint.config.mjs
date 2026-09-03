import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: [
      "components/react-bits/DepthCarousel.jsx",
      "components/react-bits/MaskedHeading.jsx",
      "components/react-bits/ScrollExpand.jsx",
    ],
    rules: {
      "react-hooks/refs": "off",
    },
  },
  {
    files: ["components/three/**/*.tsx"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  globalIgnores([".next/**", "out/**"]),
]);
