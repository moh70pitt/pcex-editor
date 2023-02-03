import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcexEditorComponent } from './pcex-editor.component';

describe('PcexEditorComponent', () => {
  let component: PcexEditorComponent;
  let fixture: ComponentFixture<PcexEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcexEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcexEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
