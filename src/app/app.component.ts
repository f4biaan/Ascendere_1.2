import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { filter } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ascendere1.2';
  showHeader: boolean = true;
  showSidebar: boolean = false;
  isScreenBlocked: boolean = false;

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.showHeader = event.urlAfterRedirects !== '/login';
        this.showSidebar = event.urlAfterRedirects === '/courselist';
      });

    this.monitorWindowFocus();
  }

  monitorWindowFocus() {
    // Escuchar cambios de visibilidad
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.triggerScreenOverlay();
      } else {
        this.hideScreenOverlay();
      }
    });

    // Detectar cuando el navegador pierde el foco
    window.addEventListener('blur', () => {
      this.triggerScreenOverlay();
    });

    // Detectar cuando el navegador recupera el foco
    window.addEventListener('focus', () => {
      this.hideScreenOverlay();
    });
  }

  triggerScreenOverlay() {
    const overlay = document.querySelector('.screen-blocker') as HTMLElement;
    overlay.classList.add('active');
    this.isScreenBlocked = true;
  }

  hideScreenOverlay() {
    const overlay = document.querySelector('.screen-blocker') as HTMLElement;
    overlay.classList.remove('active');
    this.isScreenBlocked = false;
  }
}
