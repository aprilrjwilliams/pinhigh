import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  // providers: [provideHttpClient()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pinhigh';

  readonly APIUrl = 'http://localhost:5038/api/pinhighdb/'

  constructor(private http:HttpClient){
  }

}
