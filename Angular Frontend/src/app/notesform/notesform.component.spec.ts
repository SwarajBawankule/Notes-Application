import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesformComponent } from './notesform.component';

describe('NotesformComponent', () => {
  let component: NotesformComponent;
  let fixture: ComponentFixture<NotesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
