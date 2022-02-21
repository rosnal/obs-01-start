import { Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Subscription,Observable, Observer,of} from 'rxjs'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  obsInterval : Subscription;
  constructor() { }
  ngOnDestroy(): void {
    this.obsInterval.unsubscribe();
  }

  ngOnInit() {
    const customObservable = new Observable(observer =>{
      let count = 0;
      setInterval(()=>{
        observer.next(count);
        if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      },1000)
    });
    this.obsInterval = customObservable.subscribe(data=>{
      console.log(data);
    },error =>{
      console.log(error);
      alert(error.message);
    },()=>{
      console.log('Completed!');
    })

  }
}
