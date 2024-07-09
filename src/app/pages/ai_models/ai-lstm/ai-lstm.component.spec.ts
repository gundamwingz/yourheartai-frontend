import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiLstmComponent } from './ai-lstm.component';

describe('AiLstmComponent', () => {
  let component: AiLstmComponent;
  let fixture: ComponentFixture<AiLstmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiLstmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiLstmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
