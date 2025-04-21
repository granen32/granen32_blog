module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "tailwindcss"],
  rules: {
    // 코드 블록 사이에 빈 줄을 요구
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      { blankLine: "always", prev: "directive", next: "*" },
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "any", prev: "import", next: "import" },
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "function", next: "*" },
    ],
    // 일관된 들여쓰기를 강제
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ["TemplateLiteral > *", "ConditionalExpression > *"],
      },
    ],
    // 함수 호출 시 일관된 괄호 간격
    "function-call-argument-newline": ["error", "consistent"],
    // React props에서 객체 spread 허용
    "react/jsx-props-no-spreading": "off",

    // React 17+ 사용 시 React import 생략 가능
    "react/react-in-jsx-scope": "off",
    // 사용하지 않는 변수는 경고로 처리
    "no-unused-vars": "warn",
    // TypeScript에서 타입 지정 강제
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 임시로 any 타입 허용 (점진적으로 제거 권장)
    "@typescript-eslint/no-explicit-any": "warn",
    // 표현식만 있는 화살표 함수에서 중괄호 불필요
    "arrow-body-style": ["error", "as-needed"],
    // Tailwind CSS 관련 규칙
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        whitelist: ["typo-.*", "cn-.*"],
      },
    ],
    "tailwindcss/no-contradicting-classname": "error",

    // TypeScript 타입 정의에서 사용되는 변수명 무시
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_|[iI]gnored|key|_",
        argsIgnorePattern: "^_|key|_",
        ignoreRestSiblings: true,
        args: "none", // 함수 매개변수에 대한 unused vars 경고 비활성화
      },
    ],

    // TypeScript 사용 시 prop-types 검증 비활성화
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    tailwindcss: {
      config: "tailwind.config.ts",
      cssFiles: ["**/*.css", "**/*.scss", "!**/node_modules/**"],
      classRegex: "^class(Name)?$|^tw$",
    },
  },
};
