import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent }  from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';


@NgModule({
  providers: [
    provideHttpClient(
      withFetch(),
    )
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [  
    HomeComponent, 
    CartComponent
  ],
  bootstrap: [  
  ]
})
export class AppModule { }