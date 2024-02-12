import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddUpdateComponent } from './task-add-update.component';

describe('ContactAddUpdateComponent', () => {
  let component: TaskAddUpdateComponent;
  let fixture: ComponentFixture<TaskAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
