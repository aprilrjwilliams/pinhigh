import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
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

  bookings:any=[];

  refreshBookings(){
    this.http.get(this.APIUrl+'getBookings').subscribe(data=>{
      this.bookings=data;
    })
  };

  ngOnInit(){
    console.log('here ');
    console.log('bookings ', this.bookings);
    this.refreshBookings();
  }
}
