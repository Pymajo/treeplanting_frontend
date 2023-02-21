import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreecoinsConsoleComponent } from './treecoins-console.component';

describe('TreecoinsConsoleComponent', () => {
  let component: TreecoinsConsoleComponent;
  let fixture: ComponentFixture<TreecoinsConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreecoinsConsoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreecoinsConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
