import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
>>>>>>> main

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    HttpClientModule,
    FormsModule
=======
    HttpClientModule
>>>>>>> main
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
