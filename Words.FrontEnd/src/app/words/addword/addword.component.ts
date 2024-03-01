import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addword',
  templateUrl: './addword.component.html',
  styleUrls: ['./addword.component.scss']
})
export class AddwordComponent implements OnInit {
  palavraForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: LocationStrategy) {
    this.palavraForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.palavraForm.valid) {
      const newWord = this.palavraForm.value;
    }

    this.location.back();
  }
}
