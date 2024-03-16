// import { NextRequest, NextResponse } from "next/server";

// import apiServer from "./services/api-back-end";


// export async function middleware(request: NextRequest){
//   const url = request.nextUrl.pathname;

//   const response = NextResponse.next();
//   if(url.startsWith('/app')){
//     const token = request.cookies.get('token');
//     if(token){
//       const res = await apiServer('token', 'POST', token);
//       const auth = await res.json();
//       if (auth.status == 1) {
//         // const response = NextResponse.next({
//         //   request: {
//         //     headers: new Headers(request.headers)
//         //   }
//         // })
//         await response.cookies.set('user', JSON.stringify(auth.userData));
//         // response.headers.set('my-custom-cookie', 'ajhsdjahsdg');
//         // console.log(response.headers);
//         // return response;
//         return response;
//       }else{
//        return NextResponse.rewrite(new URL('/', request.url))
//       }
//     }else{
//      return NextResponse.rewrite(new URL('/', request.url))
//     }
//   }

//   return NextResponse.next();
// }
