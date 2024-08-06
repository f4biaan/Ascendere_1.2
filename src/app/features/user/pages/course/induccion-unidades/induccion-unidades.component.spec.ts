import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InduccionUnidadesComponent } from './induccion-unidades.component';

describe('InduccionUnidadesComponent', () => {
  let component: InduccionUnidadesComponent;
  let fixture: ComponentFixture<InduccionUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InduccionUnidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InduccionUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
