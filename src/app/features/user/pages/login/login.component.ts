import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  /* onLogin() {
    this.router.navigate(['/courselist']);
  }
 */
  loginGoogle() {
    this.authService.loginGoogle();
  }
}
