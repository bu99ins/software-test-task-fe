import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})

export class AddformComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  get firstName() {
    return this.messageForm.get('firstname');
  }

  get surName() {
    return this.messageForm.get('surname');
  }

  get phoneNumber() {
    return this.messageForm.get('phonenumber');
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
     
  ngOnInit() {
    this.messageForm = this.formBuilder.group( {
      firstname: ['', [Validators.required, Validators.maxLength, Validators.pattern]],
      surname: ['', [Validators.required, Validators.maxLength, Validators.pattern]],
      phonenumber: ['', [Validators.required, Validators.minLength, Validators.maxLength, Validators.pattern]]    
    });
  }

  createOne() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     return this.http.post('api/v1/clients', {
      "firstname": this.messageForm.value.firstname,
      "surname": this.messageForm.value.surname,
      "phoneNumber": this.messageForm.value.phonenumber
    }, httpOptions).subscribe((data) => console.log(data));
  }

}
