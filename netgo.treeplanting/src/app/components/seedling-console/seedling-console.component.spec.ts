import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedlingConsoleComponent } from './seedling-console.component';

describe('SeedlingConsoleComponent', () => {
  let component: SeedlingConsoleComponent;
  let fixture: ComponentFixture<SeedlingConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedlingConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedlingConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
