import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterModule],
})
export class SidebarComponent {
  constructor(private _sidebarService: SidebarService) {}

  onTypeChange(newType: string) {
    this._sidebarService.setFilter(newType || 'all');
  }
}
