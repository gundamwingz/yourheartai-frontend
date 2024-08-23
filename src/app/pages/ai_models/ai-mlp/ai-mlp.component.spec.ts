import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMlpComponent } from './ai-mlp.component';

describe('AiMlpComponent', () => {
  let component: AiMlpComponent;
  let fixture: ComponentFixture<AiMlpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMlpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiMlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
