import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Client from 'src/app/client';

@Component({
  selector: 'app-allclients',
  templateUrl: './allclients.component.html',
  styleUrls: ['./allclients.component.scss']
})
export class AllclientsComponent implements OnInit {
  clientData: Client[];

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.getList();
  }
  async getList() {
    return await this.http.get('api/v1/clients').subscribe((data: Client[]) => this.clientData = [ ...data]);
  }
  async deleteById(clientId) {
    return await this.http.delete('api/v1/clients/' + clientId).subscribe(() => this.getList());
  }
}
