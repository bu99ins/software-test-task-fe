import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})

export class UpdateFormComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;

  get firstName() {
    return this.messageForm.get('firstname');
  }

  get surName() {
    return this.messageForm.get('surname');
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength, Validators.pattern]],
      surname: ['', [Validators.required, Validators.maxLength, Validators.pattern]]
    });
  }

  updateOne() {
    if (this.messageForm.invalid) {
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('api/v1/clients', {
      'firstname': this.messageForm.value.firstname,
      'surname': this.messageForm.value.surname
    }, httpOptions).subscribe((data) => console.log(data));
  }

}
