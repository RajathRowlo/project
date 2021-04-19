import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedishComponent } from './createdish.component';

describe('CreatedishComponent', () => {
  let component: CreatedishComponent;
  let fixture: ComponentFixture<CreatedishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
