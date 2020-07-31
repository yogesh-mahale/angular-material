import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialDesignModule } from './material-design/material-design.module';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIxC_K4li09JJRUzUwJmfi4JbnxCezX_I',
      libraries: ["places", "geometry"]
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
