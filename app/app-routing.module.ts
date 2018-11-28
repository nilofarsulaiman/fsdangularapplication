import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {AlertsModule} from 'angular-alert-module';
import { AddTaskComponent } from './components/addTask/addTask.component';
import { ViewTaskComponent } from './components/viewTask/viewTask.component';
import {EditTaskComponent} from './components/editTask/editTask.component';
import {AddUserComponent} from './components/addUser/addUser.component';
import {EditUserComponent} from './components/editUser/editUser.component';
import {AddProjectComponent} from './components/addProject/addProject.component';
import {EditProjectComponent} from './components/editProject/editProject.component';
const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'addTask', component: AddTaskComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'tasks', component: ViewTaskComponent },
    { path: 'task/:id', component: EditTaskComponent },
    { path: 'user/:id', component: EditUserComponent },
    { path: 'addProject', component: AddProjectComponent },
    { path: 'projects/:id', component: EditProjectComponent }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    AlertsModule.forRoot()
  ],
  exports: [ RouterModule ],
  declarations: [AddTaskComponent, AddUserComponent,ViewTaskComponent,EditTaskComponent,EditUserComponent,AddProjectComponent,EditProjectComponent]
})
export class AppRoutingModule { }