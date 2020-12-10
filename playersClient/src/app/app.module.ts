import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import {MaterialModule} from '../app/modules/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './dropdown/dropdown.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    DropdownComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    Ng5SliderModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
