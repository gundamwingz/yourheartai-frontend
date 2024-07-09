import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiFrontComponent } from './ai-front.component';

describe('AiFrontComponent', () => {
  let component: AiFrontComponent;
  let fixture: ComponentFixture<AiFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
