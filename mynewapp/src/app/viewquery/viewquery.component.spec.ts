import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewqueryComponent } from './viewquery.component';

describe('ViewqueryComponent', () => {
  let component: ViewqueryComponent;
  let fixture: ComponentFixture<ViewqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewqueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
