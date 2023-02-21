import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingPlaceConsoleComponent } from './planting-place-console.component';

describe('PlantingPlaceConsoleComponent', () => {
  let component: PlantingPlaceConsoleComponent;
  let fixture: ComponentFixture<PlantingPlaceConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantingPlaceConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantingPlaceConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
