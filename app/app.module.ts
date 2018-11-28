import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SearchByNamePipe } from './pipes/searchbyname.pipe';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';;
import {AlertsModule} from 'angular-alert-module';


@NgModule({
  imports: [ BrowserModule, AppRoutingModule, HttpModule, FormsModule,AlertsModule.forRoot()],
  declarations: [ AppComponent ,SearchByNamePipe],
  exports: [SearchByNamePipe],
  providers : [SearchByNamePipe],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
