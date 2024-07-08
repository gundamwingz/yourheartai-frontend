import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecoverpwdComponent } from './recoverpwd.component';

describe('RecoverpwdComponent', () => {
  let component: RecoverpwdComponent;
  let fixture: ComponentFixture<RecoverpwdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
