import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ia-unidades',
  templateUrl: './ia-unidades.component.html',
  styleUrls: ['./ia-unidades.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export default class IaUnidadesComponent {
  activeTab: string = 'inicio';
  sections: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.sections = {}; // Reinicia las secciones abiertas al cambiar de unidad
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

  navigateTo(tab: string) {
    if (tab === 'inicio') {
      this.router.navigate(['/ia']);
    } else {
      this.setActiveTab(tab);
    }
  }
}
