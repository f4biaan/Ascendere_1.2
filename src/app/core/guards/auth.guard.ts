// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { switchMap, take } from 'rxjs';
// import { UserService } from '../services/user.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

// export const authGuard: CanActivateFn = (route, state) => {
//   const auth = inject(AngularFireAuth);
//   const userService = inject(UserService);
//   const router = inject(Router);

//   // return true;
//   return auth.authState.pipe(
//     take(1),
//     switchMap(async (authState) => {
//       if (authState) {
//         await userService.getUserById(authState.uid).subscribe((user) => {
//           if (user) {
//             userService.setUser(user);
//             return true;
//           } else {
//             router.navigate(['/login']);
//             // console.log('No existe el usuario');
//             return false;
//           }
//         });
//         return true;
//       } else {
//         localStorage.clear();
//         router.navigate(['/login']);
//         return false;
//       }
//     })
//   );
// };
