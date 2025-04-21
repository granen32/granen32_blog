export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home/:path*",
    "/ticket/:path*",
    "/event/:path*",
    // 추가 보호가 필요한 경로들...
  ],
};
