import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as moment from 'moment';

/**
 * Generated class for the CalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cal',
  templateUrl: 'cal.html',
})
export class CalPage {

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  selectedDate: any;
  minDateAccepted: moment.Moment;
  minDateAcceptedDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams) {    
    this.minDateAccepted = moment().add(3,'d').startOf('day');    

    this.minDateAcceptedDate = this.minDateAccepted.toDate();
  }

  
/** User clicks new date.
 * Validate then assign newly selected date */
public dateClick(day): void {  
  let dateClicked = moment(day + " " + this.currentMonth + " " + this.currentYear, 'DD MMMM YYYY');
  if(!!this.minDateAccepted && dateClicked < this.minDateAccepted){
    return;
  }
  this.selectedDate = dateClicked;
}

/** Verify if the provided date is the currently selected date */
isSelectedDate(day :any){
  let dayPadded = ("00"+day).slice(-2)
  return !!this.selectedDate &&
  this.selectedDate.format('DD') === dayPadded && 
  this.selectedDate.format('MMMM') === this.currentMonth.toString() && 
  this.selectedDate.format('YYYY') === this.currentYear.toString();
}

/**
 * Verify if the currently selected day is the today's date
 * @param day the day number of the currently selected month/year
 */
public isCurrentDate(day: any):boolean {
  let dayPadded = ("00"+day).slice(-2)
  let now = moment();
  return !this.isSelectedDate(day) &&
  now.format('DD') === dayPadded && 
  now.format('MMMM') === this.currentMonth.toString() && 
  now.format('YYYY') === this.currentYear.toString();
}


/*Verify if the provided date is a date that can be selected */
isOtherDateEnabled(day: any){
  let dayDate = moment(day + " " + this.currentMonth + " " + this.currentYear, 'DD MMMM YYYY');
  return !this.isCurrentDate(day) 
    && !this.isSelectedDate(day) 
    && (!!this.minDateAccepted && dayDate >= this.minDateAccepted);
}

//todo: use conditional CSS class instead of two inverted methods
/* Verify if the provide date is a date that CANNOT be selected */
isOtherDateDisabled(day: any){
  let dayDate = moment(day + " " + this.currentMonth + " " + this.currentYear, 'DD MMMM YYYY');
  return !this.isCurrentDate(day) 
    && !this.isSelectedDate(day) 
    && (!!this.minDateAccepted && dayDate < this.minDateAccepted);
}

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalPage');
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    
    if(firstDayThisMonth === 0){
      firstDayThisMonth = 6;
    } else {
      firstDayThisMonth--;
    }
      
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
  
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i+1);
    }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();

    if(lastDayThisMonth === 0){
      lastDayThisMonth = 6;
    } else {
      lastDayThisMonth--;
    }

    //var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }

    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }

}
