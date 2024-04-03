export { default } from "next-auth/middleware";

// //Esto es de la funcion del middleware que identifica el rol y te acceso a una rota
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// //Esta es la funcion
// export async function middleware(req) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!session) {
//     const requestedPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = `/login`;
//     url.search = `p=${requestedPage}`;
//     return NextResponse.redirect(url);
//   }

//   const role = session.user.rol;

//   if (role === "adm" && req.nextUrl.pathname.startsWith("/dashboard/adm")) {
//     return NextResponse.next();
//   } else if (
//     role === "usr" &&
//     req.nextUrl.pathname.startsWith("/dashboard/usr")
//   ) {
//     return NextResponse.next();
//   } else {
//     return new Response("Acceso no autorizado", { status: 401 })
//   }
// }

export const config = {
  matcher: ["/views:path*"], // Protege todas las rutas dentro de views
};
