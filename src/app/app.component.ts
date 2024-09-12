import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { filter } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';
import { UserActivityService } from './core/services/user-activity.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _userActivityService = inject(UserActivityService);
  title = 'Ascendere1.2';
  showHeader: boolean = true;
  showSidebar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los eventos del router para detectar cambios en la navegación
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Actualizar la visibilidad del header y sidebar basado en la ruta actual
        this.showHeader = event.urlAfterRedirects !== '/login';
        // this.showSidebar = event.urlAfterRedirects === '/courselist';
        this.showSidebar = event.urlAfterRedirects.startsWith('/courselist');

        // Depuración
        console.log('Ruta actual:', event.urlAfterRedirects);
        console.log('Mostrar Header:', this.showHeader);
        console.log('Mostrar Sidebar:', this.showSidebar);
      });
  }
}
