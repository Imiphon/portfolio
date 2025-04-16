import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingHomeComponent } from './coding-home.component';

describe('CodingHomeComponent', () => {
  let component: CodingHomeComponent;
  let fixture: ComponentFixture<CodingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
