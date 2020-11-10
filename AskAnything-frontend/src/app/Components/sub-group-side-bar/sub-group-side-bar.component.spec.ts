import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupSideBarComponent } from './sub-group-side-bar.component';

describe('SubGroupSideBarComponent', () => {
  let component: SubGroupSideBarComponent;
  let fixture: ComponentFixture<SubGroupSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
