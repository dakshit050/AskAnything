import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubGroupComponent } from './create-sub-group.component';

describe('CreateSubGroupComponent', () => {
  let component: CreateSubGroupComponent;
  let fixture: ComponentFixture<CreateSubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
