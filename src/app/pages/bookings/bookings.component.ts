import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
// import { Timeslot } from './bookings.model'
import { Timeslot } from '../../shared/timeslot.model';
import { TimeslotDataService } from '../../shared/timeslot-data.component';
import { Subscription } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, MatFormField, MatInputModule],
  providers: [  
    MatDatepickerModule,  
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit, OnDestroy{


  constructor(private timeslotDataService: TimeslotDataService){}

  public pickedDate: any = null;

  public mock_ts: Timeslot[] = [
    {
      id: '1',
      date: '1/1/2024',
      startTime: '9:00 AM'
    },
    {
      id: '2',
      date: '1/1/2024',
      startTime: '12:00 PM'
    },
    {
      id: '3',
      date: '1/1/2024',
      startTime: '4:00 PM'
    }
  ]


  public selectedDateTimeslots: Timeslot[] = [];
  public bookedTimeslots: Timeslot[] = [];
  public availableTimeslots: Timeslot[] = [];
  public selectedDate: string = '';
  public isLoading = true;

  timeslotsSub = new Subscription();

  ngOnDestroy(): void {
    this.timeslotsSub.unsubscribe();
  }

  ngOnInit(): void {
    

    
  }

  OnDateChange(date: any){
    this.isLoading = true;
    console.log('date change ', date);

    this.selectedDate = this.getDateString(date)
    console.log('selectedDate ', this.selectedDate)

    this.selectedDateTimeslots = this.generateTimeslots(this.selectedDate);
    console.log('selectedDateTimeslots ', this.selectedDateTimeslots);

    this.timeslotDataService.getTimeslots(this.selectedDate);
    this.timeslotsSub = this.timeslotDataService.timeslotSubject.subscribe(timeslots => {
      this.bookedTimeslots = timeslots;
      console.log('bookedTimeslots ', this.bookedTimeslots);
      this.getAvailableTimeslots();
      console.log('availableTimeslots ', this.availableTimeslots)
      this.isLoading = false;
    })

  }

  getDateString(date: Date): string{
    let dateString = '';
    if(date){
      // dateString = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
      dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    }

    return dateString
  }

  // getUniqueId(): string {
  //   const dateString = Date.now().toString(36);
  //   const randomness = Math.random().toString(36).substr(2);
  //   return dateString + randomness;
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
        id: '',
        date: selectedDate,
        startTime: startTime
      })
    }

    return timeslots;
  }


  getAvailableTimeslots(): void{
    this.availableTimeslots = this.selectedDateTimeslots.filter(val => {
      return !this.bookedTimeslots.find((val2)=>{
         return val.startTime===val2.startTime
      }) 
     });
  }

  addTimeslot(timeslot: Timeslot): void {
    this.timeslotDataService.onAddTimeslot(timeslot);
  }

  onSubmit(timeslot: Timeslot):void {
    this.addTimeslot(timeslot)
  }



}
