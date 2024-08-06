import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { filter } from 'rxjs';
import { Router,NavigationEnd, Event } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Ascendere1.2';
  showHeaderAndSidebar: boolean = true;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los eventos del router para detectar cambios en la navegación
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Actualizar la visibilidad del header y sidebar basado en la ruta actual
      this.showHeaderAndSidebar = event.urlAfterRedirects !== '/login';
    });

    // Tu lógica existente para conectarte a Firestore
    this.firestore
      .collection('courses')
      .snapshotChanges()
      .subscribe(
        (data) => {
          console.log('Successfully connected to Firebase Firestore:', data);
        },
        (error) => {
          console.error('Error connecting to Firebase Firestore:', error);
        }
      );
  }
}