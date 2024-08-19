import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  filter: Signal<string> = toSignal(
    this.route.queryParams.pipe(map((params) => params['filter']))
  );

  constructor(private router: Router, private route: ActivatedRoute) {}

  /**
   * @function setFilter set filter to query params
   * @param type typeofCourse filter
   */
  public setFilter(type: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: type },
      queryParamsHandling: 'merge',
    });
  }
}
