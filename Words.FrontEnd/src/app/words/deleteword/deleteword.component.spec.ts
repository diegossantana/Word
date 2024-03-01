/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeletewordComponent } from './deleteword.component';

describe('DeletewordComponent', () => {
  let component: DeletewordComponent;
  let fixture: ComponentFixture<DeletewordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletewordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
