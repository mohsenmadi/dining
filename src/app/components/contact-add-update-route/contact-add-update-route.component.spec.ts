import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddUpdateRouteComponent } from './contact-add-update-route.component';

describe('ContactAddUpdateComponent', () => {
  let component: ContactAddUpdateRouteComponent;
  let fixture: ComponentFixture<ContactAddUpdateRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactAddUpdateRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAddUpdateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
