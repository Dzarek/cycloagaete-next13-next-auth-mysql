export { default } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.redirect(new URL("/protected", req.url));
//   },
//   {
//     callbacks: {
//       authorized({ req, token }) {
//         if (token) return true; // If there is a token, the user is authenticated
//       },
//     },
//     pages: {
//       signIn: "/auth/signin",
//       error: "/",
//       signOut: "/",
//     },
//   }
// );

export const config = { matcher: ["/contact"] };
