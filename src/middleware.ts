import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // Redirect to this page if not authenticated
  },
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/agent-dashboard/:path*', '/admin-dashboard/:path*'],
}
