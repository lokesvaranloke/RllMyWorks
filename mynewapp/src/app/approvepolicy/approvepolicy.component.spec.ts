import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovepolicyComponent } from './approvepolicy.component';

describe('ApprovepolicyComponent', () => {
  let component: ApprovepolicyComponent;
  let fixture: ComponentFixture<ApprovepolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovepolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
