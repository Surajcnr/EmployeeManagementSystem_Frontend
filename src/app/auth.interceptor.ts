// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = sessionStorage.getItem('jwt'); // <-- use sessionStorage and 'jwt'
 
//   if (token) {
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(clonedRequest);
//   }
//   return next(req);

// };

import { HttpInterceptorFn } from '@angular/common/http';
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('X-Skip-Interceptor')) {
    const headers = req.headers.delete('X-Skip-Interceptor');
    const cloned = req.clone({ headers });
    return next(cloned); // Skip adding Authorization
  }
 
  const token = sessionStorage.getItem('jwt');
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }
 
  return next(req);
};
 
