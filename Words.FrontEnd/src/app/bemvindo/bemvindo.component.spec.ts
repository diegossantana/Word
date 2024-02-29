/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BemvindoComponent } from './bemvindo.component';

describe('BemvindoComponent', () => {
  let component: BemvindoComponent;
  let fixture: ComponentFixture<BemvindoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemvindoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemvindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
