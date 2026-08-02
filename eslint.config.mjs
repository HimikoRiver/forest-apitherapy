import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/prisma/**",
  ]),

  {
    files: [
      "src/components/admin/AdminOrdersManager.jsx",
      "src/components/cart/CartQuantityControl.jsx",
      "src/components/home/hero/MobileHeroMenu.jsx",
      "src/components/services/LazyOrmedBookSlider.jsx",
      "src/components/services/OrmedBookSlider.jsx",
    ],

    rules: {
      /*
       * В этих компонентах состояние намеренно синхронизируется
       * с серверными данными, маршрутом или браузерным API.
       */
      "react-hooks/set-state-in-effect": "off",
    },
  },

  {
    files: [
      "src/components/services/OrmedBookSlider.jsx",
    ],

    rules: {
      /*
       * React Three Fiber использует императивное изменение
       * BufferGeometry и typed arrays внутри useFrame.
       */
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;