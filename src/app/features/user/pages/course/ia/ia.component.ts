import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export default class IAComponent {
  activeTab: string = 'inicio';

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    if (tab.startsWith('unidad')) {
      this.router.navigate(['/ia/unidades']);
    } else {
      this.activeTab = tab;
    }
  }

  navigateTo(tab: string) {
    if (tab === 'inicio') {
      this.router.navigate(['/ia']);
    } else if (tab.startsWith('unidad')) {
      this.router.navigate(['/ia/unidades']);
    } else {
      // Handle other cases if necessary
    }
  }
}
