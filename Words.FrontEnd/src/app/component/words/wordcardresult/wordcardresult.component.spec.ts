/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WordcardresultComponent } from './wordcardresult.component';

describe('WordcardresultComponent', () => {
  let component: WordcardresultComponent;
  let fixture: ComponentFixture<WordcardresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordcardresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordcardresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
