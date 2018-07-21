import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansibleMenuComponent } from './expansible-menu.component';

describe('ExpansibleMenuComponent', () => {
  let component: ExpansibleMenuComponent;
  let fixture: ComponentFixture<ExpansibleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansibleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansibleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
