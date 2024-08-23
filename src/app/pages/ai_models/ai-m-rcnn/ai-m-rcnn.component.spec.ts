import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiMRcnnComponent } from './ai-m-rcnn.component';

describe('AiMRcnnComponent', () => {
  let component: AiMRcnnComponent;
  let fixture: ComponentFixture<AiMRcnnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiMRcnnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiMRcnnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
