import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { Timeslot } from "./timeslot.model";

@Injectable({providedIn:"root"})
export class TimeslotDataService{

    public maxId: number = 0;

    constructor(private http: HttpClient){}

    updateTimeslot(id: string, timeslot: Timeslot) {
      this.http.put<{message: string}>('http://localhost:3000/update-timeslot/' + id, timeslot).subscribe((jsonData) => {
        console.log(jsonData.message);
        // this.getTimeslots();
      })
    }
    
    public timeslotSubject = new Subject<Timeslot[]>();
    private timeslots: Timeslot[] = [];

    onDeleteTimeslot(id: string){
        
        this.http.delete<{message: string}>('http://localhost:3000/remove-timeslot/' + id).subscribe((jsonData) => {
        console.log(jsonData.message);
        // this.getTimeslots();
        })
    }

    getTimeslots(date: string){
        this.http.get<{timeslots: any}>('http://localhost:3000/timeslots', {params: {date: date}})
        .pipe(map((responseData) => {
            console.log('responseData ', responseData)
            return responseData.timeslots.map((timeslot: {date: string; startTime: string; _id: string, user_id: string}) => {
                return {
                    date: timeslot.date,
                    startTime: timeslot.startTime,
                    id: timeslot._id,
                    user_id: timeslot.user_id
                }
            })
        }))
        .subscribe((updateResponse) => {
            this.timeslots = updateResponse;
            this.timeslotSubject.next(this.timeslots);
        })
    }

    getTimeslot(date: string){
        const index = this.timeslots.findIndex(el => {
            return el.date == date;
        })
        return this.timeslots[index];
    }

    onAddTimeslot(timeslot: Timeslot){
        console.log('in shared - onAddTimeslot ', timeslot)
        this.http.post<{message: string}>('http://localhost:3000/add-timeslot', timeslot).subscribe((jsonData) => {
            console.log(timeslot);
            // this.getTimeslots();
        })
    }




    
}