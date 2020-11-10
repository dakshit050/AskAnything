import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePostComponent } from './one-post.component';

describe('OnePostComponent', () => {
  let component: OnePostComponent;
  let fixture: ComponentFixture<OnePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
