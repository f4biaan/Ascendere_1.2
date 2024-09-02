import { Component } from '@angular/core';


@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent {
navigateTo(arg0: string) {
throw new Error('Method not implemented.');
}
  activeTab: string = 'unidad1'; // Unidad por defecto
  sections: { [key: string]: boolean } = {
    objetivos: true,
    contenidos: false,
    conceptos: false,
    actividades: false,
    evaluacion: false,
  };

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }
}
