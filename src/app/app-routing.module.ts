import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddformComponent } from './addform/addform.component';
import { AllclientsComponent } from './allclients/allclients.component';
import { UpdateFormComponent } from './update-form/update-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addform', component: AddformComponent },
  { path: 'updateform/:id', component: UpdateFormComponent },
  { path: 'allclients', component: AllclientsComponent },
  { path: '**', redirectTo: 'allclients' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
