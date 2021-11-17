import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FloorComponent } from './floor/floor.component';
import {HttpClientModule} from "@angular/common/http";
import { Floor1Component } from './floor1/floor1.component';
import { Floor2Component } from './floor2/floor2.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    FloorComponent,
    Floor1Component,
    Floor2Component,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
