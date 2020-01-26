import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import Client from 'src/app/client';

@Component({
  selector: 'app-allclients',
  templateUrl: './allclients.component.html',
  styleUrls: ['./allclients.component.scss']
})
export class AllclientsComponent implements OnInit {
  clientData: Client[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getList();
  }
  getList() {
    return this.http.get('api/v1/clients').subscribe((data: Client[]) => this.clientData = [...data]);
  }
  startUpdate(clientId: string) {
    return this.router.navigate(['/updateform', clientId]);
  }
  deleteById(clientId: string) {
    return this.http.delete('api/v1/clients/' + clientId).subscribe(() => this.getList());
  }
}
