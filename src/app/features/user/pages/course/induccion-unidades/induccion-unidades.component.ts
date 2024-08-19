import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-induccion-unidades',
  templateUrl: './induccion-unidades.component.html',
  styleUrls: ['./induccion-unidades.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class InduccionUnidadesComponent implements OnInit {
  activeTab: string = 'inicio';
  sections: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

  
  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.resetSections(); 
  }

  
  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

  
  navigateTo(tab: string) {
    if (tab === 'inicio') {
      this.router.navigate(['/induccion']);
    } else {
      this.setActiveTab(tab);
    }
  }

  
  private resetSections() {
    this.sections = {
      objetivos: false,
      contenidos: false,
      conceptos: false,
      actividades: false,
      evaluacion: false
    };
  }

  
  ngOnInit() {

    this.setActiveTab('unidad1');
  }
}
