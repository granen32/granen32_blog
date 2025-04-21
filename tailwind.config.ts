import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 삼성 라이온즈 컬러 테마
        primary: {
          default: "#004890", // 라이온즈 메인 블루
          light: "#0063c1",
          dark: "#003b73",
        },
        secondary: {
          DEFAULT: "#FF6600", // 라이온즈 오렌지
          light: "#ff8533",
          dark: "#cc5200",
        },
        background: {
          DEFAULT: "#f8fafc", // 밝은 배경색
          dark: "#0f172a", // 다크 모드 배경색
        },
        accent: {
          DEFAULT: "#FFC72C", // 라이온즈 골드/옐로우
          light: "#ffd35e",
          dark: "#d9a400",
        },
        neutral: {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      components: {
        ".heading-2": {
          fontSize: "32px",
          lineHeight: "48px",
          marginBottom: "20px",
          fontWeight: "600",
          color: "#172B4D",
          letterSpacing: "-0.5px",
        },
        ".heading-3": {
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "4px",
          lineHeight: "36px",
          color: "#172B4D",
        },
        ".heading-4": {
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "600",
          color: "#172B4D",
          marginBottom: "8px",
        },
        ".heading-4 .btn.btn-small": {
          marginLeft: "8px",
        },
        "h3 ~ div": {
          marginTop: "12px",
        },
        ".heading-4 ~ .btn-group": {
          marginTop: "24px",
        },
      },
      spacing: {
        "2.5": "10px",
        "3.5": "14px",
        "4.5": "18px",
        "5.5": "22px",
      },
    },
  },
  plugins: [],
};

export default config;
