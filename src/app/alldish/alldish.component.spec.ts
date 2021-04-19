import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldishComponent } from './alldish.component';

describe('AlldishComponent', () => {
  let component: AlldishComponent;
  let fixture: ComponentFixture<AlldishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
