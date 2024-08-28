import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable, map, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .pipe(
              map((data) => data as User) // transform the unknown data into a User
            );
        } else {
          return of(null);
        }
      })
    );
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  // loginMicrosoft() {
  //   const microsoftAuthProvider = new firebase.auth.OAuthProvider(
  //     'microsoft.com'
  //   );

  //   microsoftAuthProvider.setCustomParameters({
  //     tenant: '6eeb49aa-436d-43e6-becd-bbdf79e5077d',
  //     // tenant: environment.msalConfig.auth.tenantId,
  //   });
  //   microsoftAuthProvider.addScope('user.read');
  //   microsoftAuthProvider.addScope('openid');
  //   microsoftAuthProvider.addScope('profile');
  //   microsoftAuthProvider.addScope('mail.send');
  //   this.loginProvider(microsoftAuthProvider);
  // }

  async loginGoogle() {
    const googleAuthProvider = new firebase.auth.OAuthProvider('google.com');
    // this.loginProvider(googleAuthProvider);

    googleAuthProvider.setCustomParameters({
      prompt: 'select_account',
    });
    googleAuthProvider.addScope('profile');
    googleAuthProvider.addScope('email');
    // this.loginProvider(googleAuthProvider);

    return await this.afAuth
      .signInWithPopup(googleAuthProvider)
      .then((response: any) => {
        if (response.additionalUserInfo?.isNewUser === true) {
          const usuario: User = {
            id: response.user?.uid,
            mail: response.user?.email,
            displayName: response.user?.displayName,
            givenName: response.additionalUserInfo.profile?.given_name,
            surname: response.additionalUserInfo.profile?.family_name,
            photo_url: response.user?.photoURL,
            role: 'estudiante',
          };
          this.agregarUsuario(usuario)
            .then(() => {
              this.router.navigateByUrl('/courselist');
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
          const { redirect } = window.history.state;
          this.router.navigateByUrl(redirect || '/courselist');
        }
      });
  }

  loginUserAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async loginProvider(provider: any) {
    return await this.afAuth
      .signInWithPopup(provider)
      .then((response: any) => {
        console.log(response);
        if (response.additionalUserInfo?.isNewUser === true) {
          const usuario: User = {
            id: response.user?.uid,
            mail: response.additionalUserInfo.profile?.userPrincipalName,
            displayName: response.additionalUserInfo.profile?.displayName,
            givenName: response.additionalUserInfo.profile?.givenName,
            surname: response.additionalUserInfo.profile?.surname!,
            photo_url: response.user?.photoURL!,
            role: 'estudiante',
          };
          this.agregarUsuario(usuario!);
          // this.router.navigateByUrl('/auth/carreras');
        } else {
          // const { redirect } = window.history.state;
          // this.router.navigateByUrl(redirect || '/auth/carreras');
        }
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }

  async logout() {
    localStorage.clear();
    this.router.navigateByUrl('/inicio');
    await this.afAuth.signOut();
  }

  agregarUsuario(usuario: User) {
    return this.firestore.collection('users').doc(usuario.id).set(usuario);
  }
}
