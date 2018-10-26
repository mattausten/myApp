import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  brightness: number = 20;
  saturation: number = 50;
  warmth: number = 1300;
  structure: any = {lower: 33, upper: 60};

  myDate: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.platform.ready().then(() => {

    });

  }

  onChange(ev: any) {
    console.log('Changed', ev);
  }

}
