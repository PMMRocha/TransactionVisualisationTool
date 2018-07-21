import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVisualisationComponent } from './chart-visualisation.component';

describe('ChartVisualisationComponent', () => {
  let component: ChartVisualisationComponent;
  let fixture: ComponentFixture<ChartVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVisualisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
