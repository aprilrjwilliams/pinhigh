import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent }  from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BookComponent } from './pages/book/book.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { RegistrationComponent } from './pages/registration/registration.component';

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
    AboutComponent 
  ],
  bootstrap: [  
  ]
})
export class AppModule { }