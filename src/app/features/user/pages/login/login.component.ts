import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Redirige al usuario al componente CourseList
    this.router.navigate(['/courselist']);
  }
}
