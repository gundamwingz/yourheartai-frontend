import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCnnComponent } from './ai-cnn.component';

describe('AiCnnComponent', () => {
  let component: AiCnnComponent;
  let fixture: ComponentFixture<AiCnnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AiCnnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiCnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
