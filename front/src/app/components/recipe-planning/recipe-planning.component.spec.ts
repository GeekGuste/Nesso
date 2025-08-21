import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePlanningComponent } from './recipe-planning.component';

describe('RecipePlanningComponent', () => {
  let component: RecipePlanningComponent;
  let fixture: ComponentFixture<RecipePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
