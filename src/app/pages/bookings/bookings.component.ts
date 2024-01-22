import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Timeslot } from './bookings.model'

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit{


  public timeslots: Timeslot[] = [];


  constructor(){}

  ngOnInit(): void {
    this.timeslots = this.generateTimeslots('1/1/2024');
    console.log('timeslots ', this.timeslots);
  }

  getUniqueId(): string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }

  // addMinutes(time: string, minutes: any) {
  //   var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
  //   var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
  //     ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
  //     ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
  //   return tempTime;
  // }

  // formatTime(time: any): string{
  //   // Check correct time format and split into components
  //   time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  //   if (time.length > 1) { // If time format correct
  //     time = time.slice (1);  // Remove full string match value
  //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
  //     time[0] = +time[0] % 12 || 12; // Adjust hours
  //   }
  //   let newTime = time.join (''); // return adjusted time or original string
  //   console.log('newTime ', newTime)
  //   return newTime
  // }

  generateTimeslots(selectedDate: string): Timeslot[]{

    let timeslots: Timeslot[] = []

    for (let i = 8; i <= 17; i++) {

      let startTime = ''; //format: HH:MM AM/PM

      if (i < 12){
        startTime = i + ':00 AM';
      } else if (i == 12){
        startTime = i + ':00 PM';
      } else {
        let hour = i%12;
        startTime = hour + ':00 PM';
      }


      timeslots.push ({
        date: selectedDate,
        startTime: startTime
      })
    }
    


    return timeslots;
  }



}
