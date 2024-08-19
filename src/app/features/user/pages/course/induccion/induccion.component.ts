import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressComponent } from '../../../components/progress/progress.component';

@Component({
  selector: 'app-induccion',
  templateUrl: './induccion.component.html',
  styleUrls: ['./induccion.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressComponent],
})
export default class InduccionComponent {
  activeTab: string = 'resultados'; // Inicializar con una pestaña de contenido

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    if (tab.startsWith('unidad')) {
      this.router.navigate(['/induccion/unidades']);
    }
    setTimeout(() => {
      this.activeTab = tab;
    }, 100);
  }

  navigateTo(tab: string) {
    if (tab === 'inicio') {
      this.router.navigate(['/induccion']);
    } else if (tab.startsWith('unidad')) {
      this.router.navigate(['/induccion/unidades']);
    } else {
      // Handle other cases if necessary
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
