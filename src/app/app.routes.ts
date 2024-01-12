import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BookComponent } from './pages/book/book.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    {
      path: "",
      component: HomeComponent
    },
    {
      path: 'about',
      component: AboutComponent
    }, 
    {
      path: 'book',
      component: BookComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'membership',
      component: MembershipComponent
    },
    {
      path: 'registration',
      component: RegistrationComponent
    },
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
