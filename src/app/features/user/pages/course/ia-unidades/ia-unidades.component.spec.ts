import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaUnidadesComponent } from './ia-unidades.component';

describe('IaUnidadesComponent', () => {
  let component: IaUnidadesComponent;
  let fixture: ComponentFixture<IaUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaUnidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
