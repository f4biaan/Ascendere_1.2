import { Component, Input, Signal } from '@angular/core';
import { Unit } from '../../../../core/interfaces/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units.component.html',
  styleUrl: './units.component.css',
})
export class UnitsComponent {
  @Input({ required: true }) dataUnit!: Signal<Unit | undefined>;
  sections: { [key: string]: boolean } = {};

  setActiveTab(tab: string) {
    this.sections = {}; // Reinicia las secciones abiertas al cambiar de unidad
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }
}
