import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatErrorDialogComponent } from './chat-error-dialog.component';

describe('ChatErrorDialogComponent', () => {
  let component: ChatErrorDialogComponent;
  let fixture: ComponentFixture<ChatErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
