import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import Client from '../client';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})

export class UpdateFormComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  resourceUri = 'api/v1/clients/';

  get firstName() {
    return this.messageForm.get('firstname');
  }

  get surName() {
    return this.messageForm.get('surname');
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.resourceUri += this.route.snapshot.params['id'];
    this.http.get(this.resourceUri)
      .subscribe((data: Client) => {
        this.messageForm.get('firstname').setValue(data.firstname);
        this.messageForm.get('surname').setValue(data.surname);
      });

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
    return this.http.patch(this.resourceUri, {
      'firstname': this.messageForm.value.firstname,
      'surname': this.messageForm.value.surname
    }, httpOptions).subscribe((data) => this.router.navigate(['/allclients']));
  }

}
