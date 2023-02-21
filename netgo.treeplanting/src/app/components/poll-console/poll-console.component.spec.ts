import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollConsoleComponent } from './poll-console.component';

describe('PollConsoleComponent', () => {
  let component: PollConsoleComponent;
  let fixture: ComponentFixture<PollConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
